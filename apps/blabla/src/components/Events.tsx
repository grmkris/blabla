import { useNostrEvents, useProfile } from "nostr-react";
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
import {
  eventToNoteMapper,
  insertOrUpdateEvent,
} from "../web-sqlite/client-functions";
import { api } from "../web-sqlite/sqlite";
import { useEffect, useState } from "react";
import type { NostrProfile } from "../web-sqlite/schema";
import { NewPost } from "./NewPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";

export const EventComponent = (props: { note: Note }) => {
  const [showInputCommentArea, setShowInputCommentArea] = useState(false);
  const { data: profileData } = useProfile({ pubkey: props.note.event.pubkey });
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
    isBookmarked()
      ? unbookmarkEvent.mutate(props.note.event.id)
      : bookmarkEvent.mutate(props.note.event.id);
  };

  const handleNewNostrProfile = async (profile: NostrProfile) => {
    await api.createOrUpdateNostrProfile({
      pubkey: props.note.event.pubkey,
      name: profile?.name,
      picture: profile?.picture,
      display_name: profile?.display_name,
      about: profile?.about,
      npub: profile?.npub,
      lud06: profile?.lud06,
      lud16: profile?.lud16,
      nip06: profile?.nip06,
      website: profile?.website,
    });
  };

  useEffect(() => {
    if (!profile.data) {
      handleNewNostrProfile(profileData);
    }
  });

  return (
    <div className="card min-w-0 max-w-full overflow-auto bg-slate-900/70 shadow-xl">
      <div className="card-body">
        <Link
          href={`/identity/${props.note.event.pubkey}`}
          shallow
          className="text-gray-500 decoration-blue-700 underline-offset-4 hover:text-blue-700 hover:underline"
        >
          <div className="card-title ">
            <div className="avatar">
              <div className="mask mask-squircle w-12">
                <img
                  src={profile?.data?.picture ?? "/images/placeholder.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="truncate text-sm font-medium ">
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
              <p className="cursc mt-0.5 text-sm text-gray-600 text-gray-500 decoration-blue-700 underline-offset-4 hover:text-blue-700 hover:underline">
                Commented{" "}
                {new Date(props.note.event.created_at * 1000).toLocaleString()}
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
              {props.note.event.content}
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
  const { data: profileData } = useProfile({ pubkey: props.pubkey });

  if (!profileData) {
    return null;
  }
  return (
    <Link href={"/identity/" + props.pubkey} shallow>
      <div className="avatar">
        <div className="w-8">
          <img
            src={
              profileData?.picture
                ? profileData?.picture
                : "/images/placeholder.png"
            }
          />
        </div>
      </div>
    </Link>
  );
};

const EventReferencedEventComponent = (props: { eventId: string }) => {
  const { event } = useEvents({ eventId: props.eventId });
  const { onEvent } = useNostrEvents({
    filter: {
      ids: [props.eventId],
    },
    enabled: !props.eventId,
  });

  onEvent(async (event) => {
    await insertOrUpdateEvent(event);
  });

  if (!event.data) {
    return null;
  }
  return (
    <EventComponent
      note={eventToNoteMapper({
        pubkey: event.data.pubkey,
        sig: event.data.sig,
        id: event.data.id,
        tags: JSON.parse(event.data.tags_full),
        created_at: event.data.created_at,
        content: event.data.content,
        kind: event.data.kind,
      })}
      key={props.eventId}
    />
  );
};

function matchAll(regExp, text) {
  const matches = [];

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = regExp.exec(text))) {
    matches.push(match);
  }

  return matches;
}

function attacher() {
  return (tree) => visit(tree, "paragraph", visitor);

  function visitor(node) {
    const { children } = node;
    node.children = [];

    children.forEach(function (child) {
      if (!is(child, "text")) {
        node.children.push(child);
        return;
      }

      const matches = matchAll(/(@[A-Z0-9]+)/gi, child.value);

      if (matches.length === 0) {
        node.children.push(child);
        return true;
      }

      if (matches[0].index > 0) {
        node.children.push({
          type: "text",
          value: child.value.substr(0, matches[0].index),
        });
      }

      matches.forEach((match, index) => {
        node.children.push({
          type: "strong",
          children: [{ type: "text", value: match[0] }],
        });

        if (matches.length > index + 1) {
          const startAt = match.index + match[0].length;
          node.children.push({
            type: "text",
            value: child.value.substr(
              startAt,
              matches[index + 1].index - startAt
            ),
          });
        }
      });

      const lastMatch = matches[matches.length - 1];

      if (lastMatch.index + lastMatch[0].length < child.value.length) {
        node.children.push({
          type: "text",
          value: child.value.substr(lastMatch.index + lastMatch[0].length),
        });
      }
    });
  }
}

/**
 * Attacher function that detects #[tag] and converts it to a link
 * It accepts an array of tags to link to
 */
function tagAttacher(note: Note) {
  return (tree) => visit(tree, "paragraph", visitor);

  function visitor(node) {
    const { children } = node;
    node.children = [];

    children.forEach(function (child) {
      if (!is(child, "text")) {
        node.children.push(child);
        return;
      }

      const matches = matchAll(/#\[[0-9]+\]/g, child.value);

      if (matches.length === 0) {
        node.children.push(child);
        return true;
      }

      if (matches[0].index > 0) {
        node.children.push({
          type: "text",
          value: child.value.substr(0, matches[0].index),
        });
      }

      matches.forEach((match, index) => {
        const tagIndex = match[0].replace("#[", "").replace("]", "");
        console.log("matchesTags", note, tagIndex);
        const text = note.event.tags[tagIndex]?.[1];
        const tagType = note.event.tags[tagIndex]?.[0];
        if (tagType === "p") {
          const userData = api.getNostrProfile(text);
          node.children.push({
            type: "link",
            url: "/search/" + text,
            children: [{ type: "text", value: text ?? match[0] }],
          });
        } else if (tagType === "e") {
          const event = api.getEvent(text);
          node.children.push({
            type: "link",
            url: "/search/" + text,
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
            value: child.value.substr(
              startAt,
              matches[index + 1].index - startAt
            ),
          });
        }
      });

      const lastMatch = matches[matches.length - 1];

      if (lastMatch.index + lastMatch[0].length < child.value.length) {
        node.children.push({
          type: "text",
          value: child.value.substr(lastMatch.index + lastMatch[0].length),
        });
      }
    });
  }
}

function hashTagAttacher() {
  return (tree) => visit(tree, "paragraph", visitor);

  function visitor(node) {
    const { children } = node;
    node.children = [];

    children.forEach(function (child) {
      if (!is(child, "text")) {
        node.children.push(child);
        return;
      }

      const matches = matchAll(/(#\w+)/gi, child.value);

      if (matches.length === 0) {
        node.children.push(child);
        return true;
      }

      if (matches[0].index > 0) {
        node.children.push({
          type: "text",
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
            value: child.value.substr(
              startAt,
              matches[index + 1].index - startAt
            ),
          });
        }
      });

      const lastMatch = matches[matches.length - 1];

      if (lastMatch.index + lastMatch[0].length < child.value.length) {
        node.children.push({
          type: "text",
          value: child.value.substr(lastMatch.index + lastMatch[0].length),
        });
      }
    });
  }
}
