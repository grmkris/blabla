import Link from "next/link";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import type { Note } from "../types";
import { useSqlite } from "../hooks/useSqlite";
import { useEvents } from "../hooks/useEvents";
import { eventToNoteMapper } from "../web-sqlite/client-functions";
import { api } from "../web-sqlite/sqlite";
import { useEffect, useState } from "react";
import { NewPost } from "./NewPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { useEvent } from "../hooks/useEvent";
import { z } from "zod";

export const EventComponent = (props: { note: Note }) => {
  const [showInputCommentArea, setShowInputCommentArea] = useState(false);
  const { bookmarkEvent, isBookmarked, unbookmarkEvent } = useEvents({
    eventId: props.note.event.id,
  });
  const { profile } = useSqlite({
    pubkey: props.note.event.pubkey,
  });

  const handleCommentClick = () => {
    setShowInputCommentArea(!showInputCommentArea);
  };
  const handleBookmarkEventClicked = () => {
    if (!props.note.event.id) return;
    isBookmarked()
      ? unbookmarkEvent.mutate(props.note.event.id)
      : bookmarkEvent.mutate(props.note.event.id);
  };

  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <Link href={`/identity/${props.note.event.pubkey}`} shallow>
          <div className="card-title hover:bg-base-200">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={profile?.data?.picture ?? "/images/placeholder.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium text-gray-500">
              {profile?.data?.display_name}
              {profile?.data?.name}
              {profile?.data?.npub}
              {props.note.event.pubkey}
            </div>
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <div>
            <Link href={`/event/${props.note.event.id}`} shallow>
              <p className="cursc mt-0.5 text-sm text-gray-600 hover:bg-base-200">
                Commented{" "}
                {new Date(
                  (props.note.event.created_at ?? 0) * 1000
                ).toLocaleString()}
              </p>
            </Link>
          </div>
          <div className="prose mt-2 overflow-hidden text-ellipsis text-sm text-gray-400">
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
                remarkImages,
                hashTagAttacher,
                () => tagAttacher(props.note),
              ]}
              components={{
                a: ({ node, ...props }) => {
                  return (
                    <a
                      className={"text-blue-500"}
                      {...props}
                      href={props.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  );
                },
              }}
            >
              {props.note.event.content ?? ""}
            </ReactMarkdown>
          </div>
          <div className="card-actions mt-2 text-sm text-gray-400">
            <div className="avatar-group -space-x-6">
              {props.note.referencedProfiles.map((tag, index) => {
                return (
                  <EventReferencedAvatarComponent pubkey={tag} key={index} />
                );
              })}
            </div>
            <div className="btn-group">
              <button
                className="btn-sm btn"
                onClick={handleBookmarkEventClicked}
              >
                {isBookmarked() ? (
                  <BookmarkSlashIcon className="h-5 w-5" />
                ) : (
                  <BookmarkIcon className="h-5 w-5" />
                )}
              </button>
              <button className="btn-sm btn">
                <HeartIcon className={"h-5 w-5"} />
              </button>
              <button className="btn-sm btn" onClick={handleCommentClick}>
                <ChatBubbleLeftIcon className={"h-5 w-5"} />
              </button>
            </div>
            {showInputCommentArea && (
              <div className={"flex flex-col"}>
                <NewPost eventId={props.note.event.id} />
              </div>
            )}
            <div className={"flex max-w-full flex-col"}>
              {props.note.referencedNotes.map((tag, index) => {
                return (
                  <EventReferencedEventComponent eventId={tag} key={index} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventReferencedAvatarComponent = (props: { pubkey: string }) => {
  const { profile } = useSqlite({ pubkey: props.pubkey });

  if (!profile) {
    return null;
  }
  return (
    <Link href={"/identity/" + props.pubkey} shallow>
      <div className="avatar">
        <div className="w-8">
          <img src={profile?.data?.picture ?? "/images/placeholder.png"} />
        </div>
      </div>
    </Link>
  );
};

const EventReferencedEventComponent = (props: { eventId: string }) => {
  const { event } = useEvent({ eventId: props.eventId });

  if (!event.data) {
    return null;
  }
  return (
    <EventComponent note={eventToNoteMapper(event.data)} key={props.eventId} />
  );
};

function matchAll(regExp: RegExp, text: string) {
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
function tagAttacher(note: Note) {
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

function hashTagAttacher() {
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
