/**
 * Blog Posts Screen
 *
 * This component displays a list of blog posts from MDX files in the docs directory.
 * It uses mdx-bundler to extract frontmatter from MDX files and renders a grid of
 * blog post cards with images, titles, descriptions, and metadata.
 *
 * The blog implementation demonstrates:
 * 1. MDX content handling with frontmatter extraction
 * 2. File system operations for reading blog content
 * 3. Responsive grid layout for different screen sizes
 * 4. View transitions for smooth navigation between pages
 */
import type { Route } from "./+types/posts";

import { bundleMDX } from "mdx-bundler";

import { Link } from "react-router";

import { Badge } from "~/core/components/ui/badge";
import { useTranslation } from "react-i18next";
import i18next from "~/core/lib/i18next.server";

/**
 * Meta function for the blog posts page
 *
 * Sets the page title using the application name from environment variables
 * and adds a meta description for SEO purposes
 */
export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data?.title} | ${import.meta.env.VITE_APP_NAME}` },
    { name: "description", content: data?.description },
  ];
};

/**
 * Interface defining the structure of MDX frontmatter
 *
 * Each MDX blog post file must include these metadata fields in its frontmatter:
 * - title: The title of the blog post
 * - description: A brief summary of the post content
 * - date: Publication date (used for sorting)
 * - category: The post category for filtering/grouping
 * - author: The name of the post author
 * - slug: URL-friendly identifier for the post
 */
interface Frontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  slug: string;
}

/**
 * Loader function for the blog posts page
 *
 * This function reads all MDX files from the docs directory and extracts their frontmatter:
 * 1. Determines the path to the docs directory containing MDX blog posts
 * 2. Reads all files in the directory and filters for .mdx files
 * 3. Processes each MDX file to extract its frontmatter metadata
 * 4. Sorts the posts by date (newest first)
 * 5. Returns the frontmatter data to be used by the component
 *
 * @returns Object containing an array of blog post frontmatter data
 */
export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18next.getFixedT(request);
  
  // Use Vite's import.meta.glob to load MDX files
  // eager: true loads the content immediately (as string)
  // as: 'raw' ensures we get the raw string content
  const modules = import.meta.glob("../docs/*.mdx", { 
    eager: true, 
    query: "?raw",
    import: "default",
  });

  // Load component files for MDX imports
  const componentModules = import.meta.glob("../components/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  });

  // Prepare files object for mdx-bundler
  const files: Record<string, string> = {};
  for (const [path, content] of Object.entries(componentModules)) {
    if (typeof content === "string") {
      files[path] = content;
    }
  }

  // Process all modules
  const frontmatters = await Promise.all(
    Object.entries(modules).map(async ([filepath, content]) => {
      // content is the raw MDX string
      const { frontmatter } = await bundleMDX({ 
        source: content as string,
        files,
      });
      
      // Extract slug from filepath
      const slug = filepath.replace("../docs/", "").replace(".mdx", "");
      
      return {
        ...(frontmatter as Omit<Frontmatter, "slug">),
        slug,
      };
    })
  );

  // Sort posts by date, newest first
  frontmatters.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  // Return the frontmatter data
  return {
    frontmatters: frontmatters as Frontmatter[],
    title: t("blog.posts.title"),
    description: t("blog.posts.description"),
  };
}

/**
 * Blog Posts Component
 *
 * This component renders the blog posts page with a header and a grid of blog post cards.
 * Each card displays:
 * - Featured image (matching the post slug)
 * - Category badge
 * - Post title
 * - Post description
 * - Author and date information
 *
 * The component uses responsive design with different layouts for mobile and desktop:
 * - Single column on mobile devices
 * - Three-column grid on desktop devices
 *
 * It also implements view transitions for smooth navigation between the posts list
 * and individual post pages.
 *
 * @param loaderData - Data from the loader containing blog post frontmatter
 */
export default function Posts({
  loaderData: { frontmatters },
}: Route.ComponentProps) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-16">
      {/* Page header with title and subtitle */}
      <header className="flex flex-col items-center">
        <h1 className="text-center text-3xl font-semibold tracking-tight md:text-5xl">
          {t("blog.posts.title")}
        </h1>
        <p className="text-muted-foreground mt-2 text-center font-medium md:text-lg">
          {t("blog.posts.description")}
        </p>
      </header>

      {/* Responsive grid of blog post cards */}
      <div className="grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
        {frontmatters.map((frontmatter) => (
          <Link
            to={`/blog/${frontmatter.slug}`}
            key={frontmatter.slug}
            className="flex flex-col gap-4"
            viewTransition // Enable smooth transitions between pages
          >
            {/* Post featured image */}
            <img
              src={`/blog/${frontmatter.slug}.jpg`}
              alt={frontmatter.title}
              className="aspect-square w-full rounded-xl object-cover object-center"
            />
            {/* Category badge */}
            <Badge variant="secondary" className="text-sm">
              {frontmatter.category}
            </Badge>
            <div>
              {/* Post title */}
              <h2 className="text-lg font-bold md:text-2xl">
                {frontmatter.title}
              </h2>
              {/* Post description */}
              <p className="text-muted-foreground text-pretty md:text-lg">
                {frontmatter.description}
              </p>
              {/* Author and date information */}
              <span className="text-muted-foreground mt-2 block text-sm">
                {t("blog.posts.author_on", {
                  author: frontmatter.author,
                  date: new Date(frontmatter.date).toLocaleDateString("ko-KR"),
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
