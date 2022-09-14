import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSession } from "next-auth/react";
import { useDisconnect } from "wagmi";
import { SignTypedMessage } from "../components/SignTypedMessage";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const { disconnect } = useDisconnect();

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (status === "authenticated") {
    return (
      <div>
        Authenticated <button onClick={() => disconnect()}>Disconnect</button>
        <SignTypedMessage />
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/apps/demo-app/public/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Get started by editing{" "}
          <code className="rounded-md bg-gray-100 p-3 font-mono text-lg">
            pages/index.tsx
          </code>
        </p>
        <ConnectButton />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
