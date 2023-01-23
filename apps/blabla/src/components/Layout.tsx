import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookmarkSquareIcon,
  ChevronUpIcon,
  HomeIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { api } from "../web-sqlite/sqlite";
import { proxy } from "comlink";
import { Button, LoadingSpinner } from "./common/common";
import { useRouter } from "next/router";
import DemoPage from "./DemoPage";
import { Popover } from "@headlessui/react";

export const Layout = (props: { children: ReactNode; title: string }) => {
  const [isSqliteReady, setIsSqliteReady] = useState(false);
  const [showClearDBMessage, setShowClearDBMessage] = useState(false);
  const router = useRouter();

  function callback() {
    setIsSqliteReady(true);
  }

  useEffect(() => {
    // register the sqlite worker callback
    api.notifyWhenReady(proxy(callback));

    // clear db message timeout start
    setTimeout(() => {
      setShowClearDBMessage(true);
    }, 5000);
  }, []);

  const clearDB = () => {
    const req = indexedDB.deleteDatabase("db.sqlite");
    req.onsuccess = function () {
      console.log("Deleted database successfully");
      alert("Deleted database successfully");
      router.reload();
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
      <main>
        <nav className="fixed top-0 z-50 w-full lg:block">
          <NavigationTop />
        </nav>

        <div>
          {isSqliteReady ? (
            <main className="mx-auto min-h-screen max-w-xl px-4 sm:px-0">
              <h3 className="mt-28 mb-4 text-4xl font-medium leading-6">
                {props.title}
              </h3>

              {props.children}
            </main>
          ) : (
            <div className={"grid h-screen items-center justify-items-center"}>
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
    <nav className="btm-nav lg:hidden">
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

  const [value, setValue] = useState("");
  return (
    <Popover
      as="header"
      className={
        "flex-none border-slate-50/[0.06] bg-slate-900/50 shadow-sm backdrop-blur transition-colors duration-500 lg:overflow-y-visible lg:border-b lg:border-slate-900/10"
      }
    >
      <>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between space-x-5 py-2">
            <Link href="/" className="btn-ghost btn text-xl normal-case">
              BlaBla
            </Link>

            <div className="hidden w-full max-w-lg sm:block">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/search/${value}`);
                  }}
                >
                  <input
                    type="text"
                    name="search"
                    className="block w-full rounded-md border bg-base-100 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-emerald-900 focus:text-gray-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-900 sm:text-sm"
                    placeholder="Search"
                    autoComplete="off"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div>
              <Link href="/new-post">
                <button className="w-32 rounded-md border border-transparent bg-emerald-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none ">
                  New Post
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    </Popover>
  );
};
