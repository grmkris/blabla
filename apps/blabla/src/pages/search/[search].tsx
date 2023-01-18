import { useRouter } from "next/router";
import { api } from "../../web-sqlite/sqlite";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "../../components/Layout";
import { EventComponent } from "../../components/Events";
import { eventToNoteMapper } from "../../web-sqlite/client-functions";
import { IdentityInformationCard } from "../identity/[identity]";
import { LoadingSpinner } from "../../components/common/common";

export const SearchPage = () => {
  const { search } = useRouter().query;
  const { profiles, events } = useSqliteSearch({
    search: search as string,
  });

  return (
    <Layout>
      <h1>Search for {search}</h1>
      <h2>Profiles</h2>
      {profiles.isLoading && <LoadingSpinner />}
      {profiles.data?.map((x) => (
        <IdentityInformationCard identity={x.pubkey} key={x.pubkey} />
      ))}
      <h2>Events</h2>
      {profiles.isLoading && <LoadingSpinner />}
      {events.data
        ?.map((event) =>
          eventToNoteMapper({
            pubkey: event.pubkey,
            tags: JSON.parse(event.tags_full),
            sig: event.sig,
            content: event.content,
            created_at: event.created_at,
            kind: event.kind,
            id: event.id,
          })
        )
        ?.map((x) => (
          <EventComponent note={x} key={x.event.id} />
        ))}
    </Layout>
  );
};

export const useSqliteSearch = (props: { search: string }) => {
  const events = useQuery(["events", props.search], async () => {
    return await api.fullTextSearchEvents(props.search);
  });
  const profiles = useQuery(["profiles", props.search], async () => {
    return await api.fullTextSearchProfiles(props.search);
  });

  return {
    events,
    profiles,
  };
};

export default SearchPage;
