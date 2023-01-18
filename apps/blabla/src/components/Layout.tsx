import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  BookmarkSquareIcon,
  ChevronUpIcon,
  HomeIcon,
  InboxStackIcon,
} from "@heroicons/react/20/solid";
import { api } from "../web-sqlite/sqlite";
import { proxy } from "comlink";
import { Button, LoadingSpinner } from "./common/common";

export const Layout = (props: { children: ReactNode }) => {
  const [mode, setMode] = useState("dark");
  const [isSqliteReady, setIsSqliteReady] = useState(false);
  const [showClearDBMessage, setShowClearDBMessage] = useState(false);

  function callback() {
    setIsSqliteReady(true);
  }

  useEffect(() => {
    // register the sqlite worker callback
    api.notifyWhenReady(proxy(callback));

    // theme detector
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme); // "dark" or "light"
        setMode(colorScheme);
      });

    // clear db message timeout start
    setTimeout(() => {
      setShowClearDBMessage(true);
    }, 5000);
  }, []);

  const clearDB = () => {
    const req = indexedDB.deleteDatabase("db.sqlite");
    req.onsuccess = function () {
      console.log("Deleted database successfully");
    };
    req.onerror = function () {
      console.log("Couldn't delete database");
    };
    req.onblocked = function () {
      console.log(
        "Couldn't delete database due to the operation being blocked"
      );
    };
  };

  return (
    <>
      <Head>
        <title>Blabla</title>
        <meta name="description" content="Blabla is nostr client app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex min-h-screen flex-col  items-center justify-center bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-600 via-slate-900 to-emerald-800 ${
          mode === "dark" ? "text-white" : "text-black"
        }`}
      >
        <div className={"w-screen md:max-w-prose"}>
          {isSqliteReady ? (
            props.children
          ) : (
            <div className={"grid justify-items-center"}>
              <LoadingSpinner />
              {showClearDBMessage && (
                <>
                  In case this message stays for a long time, your local data
                  got corrupted, nothing to worry about, the client will
                  repopulate it. Please clear the database by clicking the
                  button below.
                  <Button onClick={clearDB}>Clear database</Button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      <Navigation />
    </>
  );
};

export const Navigation = () => {
  return (
    <nav className="btm-nav">
      <Link href="/" shallow>
        <HomeIcon className={"h-5 w-5"} />{" "}
      </Link>
      <Link href="/relays" shallow>
        <InboxStackIcon className={"h-5 w-5"} />
      </Link>
      <Link href="/saved" shallow>
        <BookmarkSquareIcon className={"h-5 w-5"} />
      </Link>
      <Link href="/profile" shallow>
        <ChevronUpIcon className={"h-5 w-5"} />
      </Link>
    </nav>
  );
};
