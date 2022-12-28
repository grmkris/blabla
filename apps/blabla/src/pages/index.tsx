import { type NextPage } from "next";
import NoSSR from "../components/NoSSR";
import { Events } from "../components/Events";
import { AddRelay } from "../components/AddRelay";
import { Identities } from "../components/Identities";
import { Layout } from "../components/Layout";
import { SearchIdentities } from "../components/SearchIdentities";
import { useAppStore } from "../store";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-white">
        Welcome to <a>Blabla</a>!
      </h1>
      <NoSSR>
        <div className="flex max-w-prose flex-wrap items-center justify-center gap-4">
          <SearchIdentities />
          <AddRelay />
          <Identities />
          <Events />
        </div>
      </NoSSR>
    </Layout>
  );
};

export default Home;
