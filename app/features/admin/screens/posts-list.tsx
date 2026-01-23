import type { LoaderFunctionArgs } from "react-router";

import { useLoaderData, Link, redirect } from "react-router";
import { eq, desc } from "drizzle-orm";
import { Plus, Edit, ExternalLink } from "lucide-react";

import db from "~/core/db/drizzle-client.server";
import { requireAuthentication } from "~/core/lib/guards.server";
import makeServerClient from "~/core/lib/supa-client.server";
import { posts } from "~/features/blog/schema";
import { profiles } from "~/features/users/schema";

export async function loader({ request }: LoaderFunctionArgs) {
  const [client] = makeServerClient(request);
  const user = await requireAuthentication(client);

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.profile_id, user.id),
  });

  if (!profile || profile.role !== "admin") {
    throw redirect("/");
  }

  const allPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.created_at)],
  });

  return { posts: allPosts };
}

export default function PostsList() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Posts
        </h1>
        <Link
          to="/admin/posts/new"
          className="flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-stone-200 bg-white">
        <table className="min-w-full divide-y divide-stone-200">
          <thead className="bg-stone-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200 bg-white">
            {posts.map((post) => (
              <tr key={post.id} className="transition-colors hover:bg-stone-50">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt=""
                        className="mr-3 h-8 w-12 rounded object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-stone-900">
                        {post.title}
                      </div>
                      <div className="text-xs text-stone-500">/{post.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex rounded-full bg-stone-100 px-2 text-xs font-semibold leading-5 text-stone-800">
                    {post.category}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    {post.published && (
                      <Link
                        to={`/topics/${post.category}/${post.slug}`}
                        target="_blank"
                        className="text-stone-400 hover:text-stone-600"
                        title="View Public"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    )}
                    <Link
                      to={`/admin/posts/${post.id}`}
                      className="text-stone-600 hover:text-stone-900"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-sm text-stone-500">
                  No posts yet. Create your first one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
