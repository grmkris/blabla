import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

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
        <meta name="viewport" content="viewport-fit=cover" />
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
      <Link href="/">Home </Link>
      <Link href="/relays">Relays</Link>
      <Link href="/saved">Saved</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};
