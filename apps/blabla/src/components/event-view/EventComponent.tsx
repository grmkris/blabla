import Link from "next/link";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import type { Note } from "../../types";
import { useSqlite } from "../../hooks/useSqlite";
import { useEvents } from "../../hooks/useEvents";
import { eventToNoteMapper } from "../../web-sqlite/client-functions";
import { useState } from "react";
import { NewPost } from "../NewPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import { useEvent } from "../../hooks/useEvent";
import {
  CustomTwitterPreview,
  hashTagAttacher,
  tagAttacher,
} from "./event.utills";

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
    <div className="card w-full max-w-full overflow-auto bg-slate-900/70 shadow-xl">
      <div className="card-body">
        <Link
          href={`/identity?id=${props.note.event.pubkey}`}
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
            <div className="flex flex-col truncate">
              <p className="font-medium">
                {profile?.data?.display_name ??
                  profile?.data?.name ??
                  profile?.data?.npub ??
                  props.note.event.pubkey}
              </p>
              {(profile?.data?.display_name || profile?.data?.name) && (
                <p className="text-xs font-medium">
                  {profile?.data?.npub ?? props.note.event.pubkey}
                </p>
              )}
            </div>
          </div>
        </Link>
        <div className="min-w-0 flex-1">
          <div>
            <Link href={`/event/${props.note.event.id}`} shallow>
              <p className="cursc mt-0.5 text-sm text-gray-600 text-gray-500 decoration-blue-700 underline-offset-4 hover:text-blue-700 hover:underline">
                Commented{" "}
                {new Date(
                  (props.note.event.created_at ?? 0) * 1000
                ).toLocaleString()}
              </p>
            </Link>
          </div>
          <div className="prose mt-2 overflow-hidden text-ellipsis text-xl text-gray-400">
            <ReactMarkdown
              remarkPlugins={[
                remarkGfm,
                remarkImages,
                hashTagAttacher,
                () => tagAttacher(props.note),
              ]}
              components={{
                a: ({ node, ...props }) => {
                  // if node is twitter url, render a tweet
                  if (props.href?.startsWith("https://twitter.com")) {
                    return <CustomTwitterPreview value={props.href} />;
                  }
                  // find urls that end with .mp4 and render a video
                  if (props.href?.endsWith(".mp4")) {
                    return (
                      <>
                        <a {...props} />
                        <video src={props.href} controls />;
                      </>
                    );
                  }
                  return (
                    <a
                      className={
                        "text-blue-500 decoration-blue-700 underline-offset-4 hover:text-blue-700 hover:underline"
                      }
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
    <Link href={"/identity/?id=" + props.pubkey} shallow>
      <ProfileAvatar picture={profile.data?.picture} />
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

export const ProfileAvatar = (props: { picture?: string }) => {
  return (
    <div className="avatar">
      <div className="mask mask-squircle w-12">
        <img src={props.picture ?? "/images/placeholder.png"} />
      </div>
    </div>
  );
};
