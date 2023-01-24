import { useBookmarksFeed, useGlobalFeed } from "../hooks/useGlobalFeed";
import { EventComponent } from "./event-view/EventComponent";
import { Button } from "./common/Button";

export const GlobalFeed = () => {
  const { globalFeed, numberOfNewItems, refresh } = useGlobalFeed();
  return (
    <div className="flex max-w-full flex-col items-start space-y-2">
      {numberOfNewItems?.data ? (
        <Button
          onClick={() => {
            refresh.mutate();
          }}
          loading={refresh.isLoading}
        >
          {numberOfNewItems.data} new items
        </Button>
      ) : null}
      {globalFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => globalFeed.fetchNextPage()}>Load more</Button>
    </div>
  );
};

export const BookmarkedFeed = () => {
  const { bookmarksFeed, numberOfNewItems, refresh } = useBookmarksFeed();

  return (
    <div className="flex max-w-full flex-col items-start space-y-2">
      {numberOfNewItems?.data && numberOfNewItems.data > 0 ? (
        <Button onClick={refresh}>{numberOfNewItems.data} new items</Button>
      ) : null}
      {bookmarksFeed.data?.pages?.map((notes) =>
        notes.map((note) => <EventComponent note={note} key={note.event.id} />)
      )}
      <Button onClick={() => bookmarksFeed.fetchNextPage()}>Load more</Button>
    </div>
  );
};
