import React from "react";
import Markdown from "react-markdown";
import type {Components} from "react-markdown";
import {A} from "@/components/ui/a.tsx";

const S = {
  h2: "text-xl font-semibold mt-10 mb-2",
  h3: "text-base font-semibold mt-6 mb-2",
  p: "flex gap-4 mb-2 text-sm leading-relaxed",
  num: "font-semibold shrink-0",
  sub: "flex gap-4 mb-1.5 text-sm leading-relaxed pl-9",
};

export const slug = (text: string) =>
  text.toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

export const extractSections = (md: string): { id: string; title: string }[] =>
    [...md.matchAll(/^##\s+(.+)$/gm)].map(m => {
      const title = (m[1] ?? "").trim();
      return { id: slug(title), title };
    });

function numbered(childNode: React.ReactNode, className: string) {
  const children = React.Children.toArray(childNode);
  const first = children[0];
  if (typeof first === "string") {
    const m = first.match(/^(?<number>(\d+\.?)+)\s+(?<clause>.*)$/);
    if (m) return (
      <p className={className}>
        <span className={S.num}>{m.groups?.number}</span>
        <span>{[m.groups?.clause, ...children.slice(1)]}</span>
      </p>
    );
  }
  return <p className={className}><span>{childNode}</span></p>;
}

export const MdDocument = ({ markdown, DecimalNumberedIndents = false }: { markdown: string; DecimalNumberedIndents?: boolean }) => {

  const components: Components = {
    h2: ({ children }) => <h2 className={S.h2} id={slug(String(children))}>{children}</h2>,
    h3: ({ children }) => <h3 className={S.h3}>{children}</h3>,
    a: ({ href, children }) => <A href={href ?? "#"}>{children}</A>,
    ...(DecimalNumberedIndents ? {
      p:  ({ children }) => numbered(children, S.p),
      li: ({ children }) => numbered(children, S.sub),
      ul: ({ children }) => <>{children}</>,
    } : {}),
  };

  return <Markdown components={components}>{markdown}</Markdown>;
};
