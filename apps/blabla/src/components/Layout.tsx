import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./common/Button";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  MagnifyingGlassIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
  ChevronUpIcon,
  FireIcon,
  HomeIcon,
  InboxStackIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { NostrSocketContext } from "../NostrSocketContext";
import { useGetGlobalFilterSinceTime } from "../hooks/useGetGlobalFilterSinceTime";
import {
  IdentityViewSchema,
} from "./pubkey/IdentityView";
import { useSearchParams } from "@jokullsolberg/next-use-search-params";
import { z } from "zod";
import { RelaysView } from "../pages/relays";

export const Layout = (props: { children: ReactNode; title?: string }) => {
  const { isSqliteReady, subscribed } = useContext(NostrSocketContext);
  const [showClearDBMessage, setShowClearDBMessage] = useState(false);
  const globalFilterSinceTime = useGetGlobalFilterSinceTime();
  const router = useRouter();

  useEffect(() => {
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
      <Head>
        <title>Blabla</title>
      </Head>

      <nav className="fixed top-0 z-50 w-full lg:block">
        <NavigationTop />
      </nav>

      <NewLayout>
        {isSqliteReady && (globalFilterSinceTime.data || subscribed) ? (
          <>
            {props.title ? (
              <h3 className="mb-6 mt-1 text-4xl font-medium leading-6">
                {props.title}
              </h3>
            ) : null}

            {props.children}
          </>
        ) : (
          <div className={"grid h-screen items-center justify-items-center"}>
            <LoadingSpinner />
            {showClearDBMessage && (
              <>
                In case this message stays for a long time, your local data got
                corrupted, nothing to worry about, the client will repopulate
                it. Please clear the database by clicking the button below.
                <Button onClick={clearDB}>Clear database</Button>
              </>
            )}
          </div>
        )}
      </NewLayout>

      <NavigationBottom />
    </>
  );
};

const NavigationBottom = () => {
  return (
    <>
      <nav className="btm-nav lg:hidden">
        <Link href="/">
          <HomeIcon className={"h-5 w-5"} />{" "}
        </Link>
        <Link href="/relays">
          <InboxStackIcon className={"h-5 w-5"} />
        </Link>
        <Link href="/saved">
          <BookmarkSquareIcon className={"h-5 w-5"} />
        </Link>
        <label htmlFor="my-modal-6">
          <ChevronUpIcon className={"h-5 w-5"} />
        </label>
      </nav>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <Button>
            <Link href="/settings">Settings</Link>
          </Button>
          <RelaysView />
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              🚀
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

const NavigationTop = () => {
  const router = useRouter();

  const [value, setValue] = useState("");
  return (
    <nav
      className={
        "flex-none border-slate-50/[0.06] bg-slate-900/50 shadow-sm backdrop-blur transition-colors duration-500 lg:overflow-y-visible lg:border-b lg:border-slate-900/10"
      }
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex md:inset-y-0 md:left-0 lg:static xl:col-span-2">
            <div className="flex  items-center">
              <Link href="/" className="btn-ghost btn text-xl normal-case">
                BlaBla
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="sm:w-max-w-lg flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <form
                    className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                      router.push(`/search/${value}`);
                    }}
                  >
                    <MagnifyingGlassIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </form>
                  <input
                    name="search"
                    className="block w-full rounded-md border bg-base-100 py-2 pl-10 pr-3 text-sm text-white placeholder-gray-500 focus:border-emerald-900 focus:text-gray-900 focus:placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-900 sm:text-sm"
                    placeholder="Search"
                    type="search"
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
            <Link href="/new-post">
              <button className="w-32 rounded-md border border-transparent bg-emerald-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none ">
                New Post
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NewLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [{ id }] = useSearchParams({
    id: z.string(),
    selected: IdentityViewSchema.default("events"),
  });

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Relays", href: "/relays", icon: FireIcon },
    { name: "Saved", href: "/saved", icon: BookmarkIcon },
    {
      name: "Settings",
      href: "/settings",
      icon: UserIcon,
    },
  ];

  return (
    <div className="mt-10 mb-10 py-10 px-2 sm:px-0">
      <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
          <nav
            aria-label="Sidebar"
            className="sticky top-24 divide-y divide-gray-300"
          >
            <div className="space-y-1 pb-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href === router.asPath
                      ? "bg-slate-900 text-emerald-700"
                      : "text-white hover:bg-slate-900 hover:text-slate-500",
                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium"
                  )}
                  aria-current={
                    item.href === router.asPath ? "page" : undefined
                  }
                >
                  <item.icon
                    className={classNames(
                      item.href === router.asPath
                        ? "text-emerald-700"
                        : "text-white hover:bg-slate-900 group-hover:text-slate-500",
                      "-ml-1 mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <main className="lg:col-span-9 xl:col-span-6">{children}</main>

        <aside className="hidden xl:col-span-4 xl:block">
          <div className="sticky top-24 space-y-4">
            <section aria-labelledby="trending-heading">
              <div className="rounded-lg bg-slate-900 shadow">
                <div className="p-6">
                  <h2
                    id="trending-heading"
                    className="text-base font-medium text-white"
                  >
                    Recommended follows
                  </h2>
                  <div className="mt-6 flow-root">
                    {/*<RecommendedList identity={id} />*/}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
};
