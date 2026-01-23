import type { LoaderFunctionArgs, ActionFunctionArgs } from "react-router";

import { Form, useActionData, useLoaderData, redirect, useNavigation } from "react-router";
import { eq, and } from "drizzle-orm";
import { useState } from "react";
import { z } from "zod";

import db from "~/core/db/drizzle-client.server";
import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { RichTextEditor } from "../components/rich-text-editor";
import { posts } from "~/features/blog/schema";
import { profiles } from "~/features/users/schema";
import { CATEGORIES as ALL_CATEGORIES } from "~/features/blog/data/topics-data";

// Extract categories for select menu
const CATEGORIES_OPTIONS = ALL_CATEGORIES.map((cat) => ({
  id: cat.id,
  title: cat.name,
}));

export async function loader({ request, params }: LoaderFunctionArgs) {
  const [client] = makeServerClient(request);
  const user = await requireAuthentication(client);

  // Verify Admin (Double check for safety)
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.profile_id, user.id),
  });

  if (!profile || profile.role !== "admin") {
    throw redirect("/");
  }

  const postId = params.id;
  if (postId && postId !== "new") {
    const post = await db.query.posts.findFirst({
      where: eq(posts.id, postId),
    });
    return { post, isNew: false };
  }

  return { post: null, isNew: true };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const [client] = makeServerClient(request);
  const user = await requireAuthentication(client);

  // Check Admin
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.profile_id, user.id),
  });
  if (!profile || profile.role !== "admin") {
    throw redirect("/");
  }

  const formData = await request.formData();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const category = formData.get("category") as string;
  const excerpt = formData.get("excerpt") as string;
  const imageUrl = formData.get("image_url") as string;
  const content = formData.get("content_json") as string; // JSON string
  const published = formData.get("published") === "on";

  // Simple validation
  if (!title || !slug || !category) {
    return { error: "Title, Slug, and Category are required." };
  }

  const postData = {
    title,
    slug,
    category,
    excerpt,
    image_url: imageUrl,
    content: content ? JSON.parse(content) : null,
    published,
    author_id: user.id,
  };

  const postId = params.id;

  if (postId && postId !== "new") {
    // Update
    await db.update(posts).set(postData).where(eq(posts.id, postId));
  } else {
    // Create
    await db.insert(posts).values(postData);
  }

  return redirect("/admin/posts");
}

export default function PostEditor() {
  const { post, isNew } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const [contentJson, setContentJson] = useState<object | null>((post?.content as unknown as object) || null);
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (isNew) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          {isNew ? "Create New Post" : "Edit Post"}
        </h1>
      </div>

      <Form method="post" className="space-y-6">
        {/* Hidden Content Field */}
        <input type="hidden" name="content_json" value={JSON.stringify(contentJson)} />

        {actionData?.error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {actionData.error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-stone-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium text-stone-700">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium text-stone-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              defaultValue={post?.category || ""}
              required
              className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            >
              <option value="" disabled>Select a category</option>
              {CATEGORIES_OPTIONS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label htmlFor="image_url" className="text-sm font-medium text-stone-700">
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              id="image_url"
              defaultValue={post?.image_url || ""}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label htmlFor="excerpt" className="text-sm font-medium text-stone-700">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            rows={2}
            defaultValue={post?.excerpt || ""}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">Content</label>
          <RichTextEditor
            content={contentJson}
            onChange={(html, json) => setContentJson(json)}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            id="published"
            defaultChecked={post?.published || false}
            className="h-4 w-4 rounded border-stone-300 text-stone-900 focus:ring-stone-500"
          />
          <label htmlFor="published" className="text-sm font-medium text-stone-700">
            Publish Immediately
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-stone-900 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Post"}
          </button>
        </div>
      </Form>
    </div>
  );
}
