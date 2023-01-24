import { Html, Head, Main, NextScript } from "next/document";
import { useEffect, useState } from "react";

export default function Document() {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    // theme detector
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        console.log(colorScheme); // "dark" or "light"
        setMode(colorScheme);
      });
  }, []);

  return (
    <Html
      className={`min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-amber-600 via-slate-900 to-emerald-800 ${
        mode === "dark" ? "text-white" : "text-black"
      }`}
    >
      <Head>
        <meta name="description" content="Blabla is nostr client app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
