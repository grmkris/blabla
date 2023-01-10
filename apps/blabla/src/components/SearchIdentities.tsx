import { useState } from "react";
import { Button, classNames, Common } from "./common/common";
import Image from "next/image";
import { useAppStore } from "../store";
import { SearchResults } from "./search-profiles/SearchResults";

const Element = (props: { element: NostrElement }) => {
  console.log("element", props.element["data.nPubKey"]);
  return (
    <div className="flex items-center">
      <Image
        src={props.element["data.profileImageUrl"]}
        width={40}
        height={40}
        alt={"profile image"}
        className="h-6 w-6 flex-shrink-0 rounded-full"
      />
      <span className={classNames("font-normal", "ml-3 block truncate")}>
        {props.element["data.screenName"]}
      </span>
    </div>
  );
};
export const SearchIdentities = () => {
  const [selectedIdentity, setSelectedIdentity] = useState<NostrElement | null>(
    null
  );
  const [inputValue, setInputValue] = useState("");
  const following = useAppStore.use.following();
  const addFollowing = useAppStore.use.addFollowing();

  const handleSelect = (value: NostrElement) => {
    console.log("handleSelect", value);
    setSelectedIdentity(value);
    addFollowing({
      id: value["data.nPubKey"],
      publicKey: value["data.hexPubKey"],
      externalData: {
        name: value["data.screenName"],
        image: value["data.profileImageUrl"],
        description: value["data.user.description"],
      },
    });
  };

  return (
    <div className="flex flex-col space-y-4 text-white">
      <h1>Search Identities</h1>
      <SearchResults />
      <div className="flex flex-col space-y-4">
        <Common
          name={"name"}
          label={"Name"}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            addFollowing({
              id: inputValue,
              publicKey: inputValue,
              externalData: {
                name: inputValue,
                image: inputValue,
                description: inputValue,
              },
            });
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};
export interface NostrElement {
  path: string;
  "data.retweeted": boolean;
  "data.extended_tweet.full_text": string;
  "data.extended_tweet.display_text_range": number[];
  "data.extended_tweet.entities.urls": Url[];
  "data.extended_tweet.entities.user_mentions": UserMention[];
  "data.extended_tweet.entities.hashtags": Hashtag[];
  "data.extended_tweet.entities.symbols": any[];
  "data.is_quote_status": boolean;
  "data.pubkey": string;
  "data.source": string;
  "data.screenName": string;
  "data.text": string;
  "data.userName": string;
  "data.retweet_count": number;
  "data.lang": string;
  "data.filter_level": string;
  "data.lcScreenName": string;
  "data.verifyEvent"?: string;
  "data.quote_count": number;
  "data.nPubKey": string;
  "data.hexPubKey": string;
  "data.favorite_count": number;
  "data.createdAt._seconds": number;
  "data.createdAt._nanoseconds": number;
  "data.possibly_sensitive": boolean;
  "data.profileImageUrl": string;
  "data.created_at": string;
  "data.userId": string;
  "data.reply_count": number;
  "data.id": number;
  "data.id_str": string;
  "data.verifiedAt._seconds"?: number;
  "data.verifiedAt._nanoseconds"?: number;
  "data.entities.user_mentions": any[];
  "data.entities.hashtags": any[];
  "data.entities.symbols": any[];
  "data.entities.urls": Url2[];
  "data.truncated": boolean;
  "data.isValid": boolean;
  "data.verified"?: boolean;
  "data.user.profile_background_image_url": string;
  "data.user.id": number;
  "data.user.profile_use_background_image": boolean;
  "data.user.profile_background_image_url_https": string;
  "data.user.profile_banner_url"?: string;
  "data.user.favourites_count": number;
  "data.user.profile_sidebar_border_color": string;
  "data.user.profile_background_tile": boolean;
  "data.user.verified": boolean;
  "data.user.is_translator": boolean;
  "data.user.withheld_in_countries": any[];
  "data.user.profile_link_color": string;
  "data.user.profile_background_color": string;
  "data.user.created_at": string;
  "data.user.friends_count": number;
  "data.user.default_profile_image": boolean;
  "data.user.id_str": string;
  "data.user.followers_count": number;
  "data.user.name": string;
  "data.user.description"?: string;
  "data.user.profile_image_url": string;
  "data.user.listed_count": number;
  "data.user.profile_text_color": string;
  "data.user.profile_sidebar_fill_color": string;
  "data.user.default_profile": boolean;
  "data.user.geo_enabled": boolean;
  "data.user.protected": boolean;
  "data.user.translator_type": string;
  "data.user.screen_name": string;
  "data.user.statuses_count": number;
  "data.user.contributors_enabled": boolean;
  "data.user.profile_image_url_https": string;
  "data.favorited": boolean;
  "data.timestamp_ms": string;
  timestamps: string[];
  "data.user.location"?: string;
  "data.user.url"?: string;
}

export interface Url {
  url: string;
  indices: number[];
  expanded_url: string;
  display_url: string;
}

export interface UserMention {
  id: number;
  screen_name: string;
  id_str: string;
  indices: number[];
  name: string;
}

export interface Hashtag {
  text: string;
  indices: number[];
}

export interface Url2 {
  expanded_url: string;
  url: string;
  display_url: string;
  indices: number[];
}
