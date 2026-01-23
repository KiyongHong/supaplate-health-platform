import type { LoaderFunctionArgs, MetaFunction } from "react-router";

import { useLoaderData, Link } from "react-router";
import { eq, and } from "drizzle-orm";
import { format } from "date-fns";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link"; // Renamed to avoid collision with Link component

import db from "~/core/db/drizzle-client.server";
import { posts } from "~/features/blog/schema";
import { getTopicBySlug } from "~/features/blog/data/topics-data";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.post) {
    return [{ title: "Topic Not Found" }];
  }
  return [
    { title: `${data.post.title} | Supaplate` },
    { name: "description", content: data.post.excerpt || "" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { category, slug } = params;

  if (!category || !slug) {
    throw new Response("Not Found", { status: 404 });
  }

  // 1. Try fetching from DB
  const dbPost = await db.query.posts.findFirst({
    where: and(eq(posts.slug, slug), eq(posts.published, true)),
  });

  if (dbPost) {
    // Generate HTML from JSON content
    const htmlContent = dbPost.content
      ? generateHTML(dbPost.content as any, [
          StarterKit,
          Image,
          LinkExtension,
        ])
      : "<p>No content.</p>";

    return { post: { ...dbPost, htmlContent }, source: "db" };
  }

  // 2. Fallback: Check static topic data
  // Note: We don't have MDX content linked here yet, this is just metadata
  const topicData = getTopicBySlug(category as any, slug);
  if (topicData) {
     // If we had MDX, we would load it here. 
     // For now, we return minimal data or just redirect to category if strictly no content.
     // But let's show a placeholder page for the valid topic.
     return { 
       post: {
         id: "static",
         title: topicData.topic.title,
         image_url: topicData.topic.image,
         excerpt: topicData.topic.description,
         created_at: new Date(),
         htmlContent: `<p>${topicData.topic.description}</p><p><em>Full content coming soon.</em></p>`,
         category: category,
         slug: slug,
       }, 
       source: "static" 
     };
  }

  throw new Response("Not Found", { status: 404 });
}

export default function TopicPost() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Header Image */}
      {post.image_url && (
        <div className="h-64 w-full md:h-96 relative">
          <img
            src={post.image_url}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      <article className="mx-auto max-w-3xl px-6 pt-12 md:pt-16">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-stone-500 font-medium">
            <Link to="/topics" className="hover:text-stone-900 transition-colors">
                Topics
            </Link>
            <span>/</span>
            <Link to={`/topics/${post.category}`} className="hover:text-stone-900 transition-colors capitalize">
                {post.category?.replace("-", " ")}
            </Link>
        </div>

        <header className="mb-10 text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
            {post.title}
          </h1>
          {post.created_at && (
             <time className="mt-4 block text-stone-500">
                {format(new Date(post.created_at), "MMMM d, yyyy")}
             </time>
          )}
        </header>

        {post.excerpt && (
            <p className="mb-10 text-xl leading-relaxed text-stone-600 font-serif border-l-4 border-stone-900 pl-6 italic">
                {post.excerpt}
            </p>
        )}

        {/* Render HTML Content */}
        <div 
            className="prose prose-stone prose-lg max-w-none prose-headings:font-serif prose-a:text-blue-700 hover:prose-a:text-blue-900 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>
    </div>
  );
}
