import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";


export const Layout = (props: { children: ReactNode }) => {
  const router = useRouter();
  const [mode, setMode] = useState("dark");
  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', event => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme); // "dark" or "light"
        setMode(colorScheme);
      });
  }, []);

  return (
    <>
      <Head>
        <title>BlaBla 3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] ${mode==="dark"?'text-white':'text-black'}`}>
        <div>{props.children}</div>
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
      <Link href="/identities">Identities</Link>
      <Link href="/profile">Profile</Link>
    </nav>
  );
};
