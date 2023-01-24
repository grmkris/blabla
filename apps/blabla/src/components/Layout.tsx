import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  BookmarkIcon,
  BookmarkSquareIcon,
  ChatBubbleLeftEllipsisIcon,
  ChevronUpIcon,
  FireIcon,
  HomeIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { api } from "../web-sqlite/sqlite";
import { proxy } from "comlink";
import { Button } from "./common/Button";
import { LoadingSpinner } from "./common/LoadingSpinner";
import { useRouter } from "next/router";

import { Popover } from "@headlessui/react";
import Head from "next/head";

export const Layout = (props: { children: ReactNode; title?: string }) => {
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
      <Head>
        <Head>
          <title>Blabla</title>
        </Head>
      </Head>

      <nav className="fixed top-0 z-50 w-full lg:block">
        <NavigationTop />
      </nav>

      <NewLayout>
        {isSqliteReady ? (
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

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
];

const NewLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const navigation = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Relays", href: "/relays", icon: FireIcon },
    { name: "Saved", href: "/saved", icon: BookmarkIcon },
    {
      name: "Profile",
      href: "/profile",
      icon: UserIcon,
    },
  ];

  return (
    <div className="mt-20 py-10 px-4 sm:px-0">
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
                    Trending
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      {trendingPosts.map((post) => (
                        <li key={post.id} className="flex space-x-3 py-4">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src={post.user.imageUrl}
                              alt={post.user.name}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-slate-400">
                              {post.body}
                            </p>
                            <div className="mt-2 flex">
                              <span className="inline-flex items-center text-sm">
                                <button
                                  type="button"
                                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                >
                                  <ChatBubbleLeftEllipsisIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                  <span className="font-medium text-slate-400">
                                    {post.comments}
                                  </span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <button className="w-full rounded-md border border-transparent bg-emerald-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none ">
                      View all
                    </button>
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
