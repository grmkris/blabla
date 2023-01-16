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

export const Layout = (props: { children: ReactNode }) => {
  const [mode, setMode] = useState("dark");
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme); // "dark" or "light"
        setMode(colorScheme);
      });
  }, []);

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
        <div className={"w-screen md:max-w-prose"}>{props.children}</div>
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
