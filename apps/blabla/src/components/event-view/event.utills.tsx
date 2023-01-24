import type { Note } from "../../types";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { z } from "zod";
import { api } from "../../web-sqlite/sqlite";
import { Tweet } from "react-twitter-widgets";

export function matchAll(regExp: RegExp, text: string) {
  const matches = [];

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regExp.exec(text))) {
    matches.push(match);
  }

  return matches;
}

/**
 * Attacher function that detects #[tag] and converts it to a link
 * It accepts an array of tags to link to
 */
export function tagAttacher(note: Note) {
  return (tree: any) => visit(tree, "paragraph", visitor);

  function visitor(node: { children: any }) {
    const { children } = node;
    node.children = [];

    children.forEach(function (child: unknown) {
      if (!is(child, "text")) {
        node.children.push(child);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const matches = matchAll(/#\[[0-9]+\]/g, child.value);

      if (matches.length === 0) {
        node.children.push(child);
        return true;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (matches[0].index > 0) {
        node.children.push({
          type: "text",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: child.value.substr(0, matches[0].index),
        });
      }

      matches.forEach((match, index) => {
        const tagIndex = z
          .number()
          .safeParse(match[0].replace("#[", "").replace("]", ""));
        console.log("matchesTags", note, tagIndex);
        if (!tagIndex.success) return;
        const text = note.event?.tags?.[tagIndex.data]?.value ?? "";
        const tagType = note.event?.tags?.[tagIndex.data]?.tag;
        if (tagType === "p") {
          const userData = api.getNostrProfile(text);
          node.children.push({
            type: "link",
            url: "/identity/" + text,
            children: [{ type: "text", value: text ?? match[0] }],
          });
        } else if (tagType === "e") {
          const event = api.getEvent(text);
          node.children.push({
            type: "link",
            url: "/event/" + text,
            children: [{ type: "text", value: text ?? match[0] }],
          });
        } else {
          node.children.push({
            type: "link",
            url: "/search/" + text,
            children: [{ type: "text", value: text ?? match[0] }],
          });
        }

        if (matches.length > index + 1) {
          const startAt = match.index + match[0].length;
          node.children.push({
            type: "text",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: child.value.substr(
              startAt,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              matches[index + 1].index - startAt
            ),
          });
        }
      });

      const lastMatch = matches[matches.length - 1];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (lastMatch.index + lastMatch[0].length < child.value.length) {
        node.children.push({
          type: "text",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: child.value.substr(lastMatch.index + lastMatch[0].length),
        });
      }
    });
  }
}

export function hashTagAttacher() {
  return (tree: any) => visit(tree, "paragraph", visitor);

  function visitor(node: { children: any }) {
    const { children } = node;
    node.children = [];

    children.forEach(function (child: unknown) {
      if (!is(child, "text")) {
        node.children.push(child);
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const matches = matchAll(/(#\w+)/gi, child.value);

      if (matches.length === 0) {
        node.children.push(child);
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (matches[0].index > 0) {
        node.children.push({
          type: "text",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: child.value.substr(0, matches[0].index),
        });
      }

      matches.forEach((match, index) => {
        node.children.push({
          type: "link",
          url: "/search/" + match[0].substr(1),
          children: [{ type: "text", value: match[0] }],
        });

        if (matches.length > index + 1) {
          const startAt = match.index + match[0].length;
          node.children.push({
            type: "search",
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            value: child.value.substr(
              startAt,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              matches[index + 1].index - startAt
            ),
          });
        }
      });

      const lastMatch = matches[matches.length - 1];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (lastMatch.index + lastMatch[0].length < child.value.length) {
        node.children.push({
          type: "text",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value: child.value.substr(lastMatch.index + lastMatch[0].length),
        });
      }
    });
  }
}

export const CustomTwitterPreview = ({ value }: { value: string }) => {
  // get tweetID from value -> last part of url
  const tweetID = value.split("/").pop();
  if (!tweetID) return <a href={value}>{value}</a>;
  console.log("tweetID", tweetID);
  return <Tweet tweetId={tweetID} />;
};
