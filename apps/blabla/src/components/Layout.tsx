import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowUturnLeftIcon,
  BackwardIcon,
  BookmarkSquareIcon,
  ChevronUpIcon,
  HomeIcon,
  InboxStackIcon,
} from "@heroicons/react/20/solid";
import { api } from "../web-sqlite/sqlite";
import { proxy } from "comlink";
import { Button, LoadingSpinner } from "./common/common";
import { useRouter } from "next/router";

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
        <nav className="fixed top-0 z-50 w-full">
          <NavigationTop />
        </nav>
        <div className={"mt-16 w-screen md:max-w-prose"}>
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
      <NavigationBottom />
    </>
  );
};

const NavigationBottom = () => {
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

const NavigationTop = () => {
  const router = useRouter();
  const { pathname } = router;
  const isHome = pathname === "/";
  const isRelays = pathname === "/relays";
  const isSaved = pathname === "/saved";
  const isProfile = pathname === "/profile";
  const [value, setValue] = useState("");
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {!isHome && (
          <button
            className="btn-outline btn btn-circle mr-1 "
            onClick={router.back}
          >
            <ArrowUturnLeftIcon className={"h-3 w-3"} />
          </button>
        )}
        <a className="btn btn-ghost text-xl normal-case">BlaBla</a>
      </div>
      <div className="navbar-center">
        <div className="form-control">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/search/${value}`);
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
};
