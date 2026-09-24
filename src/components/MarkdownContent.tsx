import Link from "next/link";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/docs";

function textContent(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(textContent).join("");
  }

  return "";
}

function Heading({
  level,
  children,
}: {
  level: 2 | 3;
  children?: ReactNode;
}) {
  const id = slugify(textContent(children));
  const Tag = `h${level}` as "h2" | "h3";

  return (
    <Tag id={id}>
      <a href={`#${id}`}>{children}</a>
    </Tag>
  );
}

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: () => null,
          h2: ({ children }) => <Heading level={2}>{children}</Heading>,
          h3: ({ children }) => <Heading level={3}>{children}</Heading>,
          a: ({ href = "", children, ...props }) => {
            const guideLink = href.match(/^\.\.\/([^/]+)\/README\.md(.*)$/);
            if (guideLink) {
              return (
                <Link href={`/docs/${guideLink[1]}${guideLink[2]}`} {...props}>
                  {children}
                </Link>
              );
            }

            if (href.startsWith("/")) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );
            }

            return (
              <a href={href} target="_blank" rel="noreferrer" {...props}>
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
