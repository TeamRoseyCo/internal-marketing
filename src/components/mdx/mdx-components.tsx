import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

// MDX components object for server components (non-hook export)
export const mdxComponents: MDXComponents = {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight mb-6 mt-12 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold tracking-tight mb-4 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mb-3 mt-8">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mb-2 mt-6">{children}</h4>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-6">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,

    // Links
    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href || "#"} className="text-primary hover:underline">
          {children}
        </Link>
      );
    },

    // Images
    img: ({ src, alt }) => {
      // Generate fallback alt from filename if not provided
      const fallbackAlt = src
        ? src.split("/").pop()?.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "") || "Blog image"
        : "Blog image";
      return (
        <span className="block my-8">
          <Image
            src={src || ""}
            alt={alt || fallbackAlt}
            width={800}
            height={450}
            className="rounded-lg w-full"
          />
        </span>
      );
    },

    // Code blocks
    pre: ({ children }) => (
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto mb-6 text-sm">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 py-2 my-6 italic text-muted-foreground">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => <hr className="border-border my-12" />,

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border border-border bg-muted/50 px-4 py-2 text-left font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-muted-foreground">
        {children}
      </td>
    ),
};

// Hook version for client components (keeps existing functionality)
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
