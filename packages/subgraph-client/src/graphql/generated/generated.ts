import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type InitializedEvent = {
  __typename?: 'InitializedEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  transactionHash: Scalars['Bytes'];
  version: Scalars['Int'];
};

export type InitializedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  version?: InputMaybe<Scalars['Int']>;
  version_gt?: InputMaybe<Scalars['Int']>;
  version_gte?: InputMaybe<Scalars['Int']>;
  version_in?: InputMaybe<Array<Scalars['Int']>>;
  version_lt?: InputMaybe<Scalars['Int']>;
  version_lte?: InputMaybe<Scalars['Int']>;
  version_not?: InputMaybe<Scalars['Int']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']>>;
};

export enum InitializedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TransactionHash = 'transactionHash',
  Version = 'version'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type OwnershipTransferredEvent = {
  __typename?: 'OwnershipTransferredEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  newOwner: Scalars['Bytes'];
  previousOwner: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
};

export type OwnershipTransferredEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newOwner?: InputMaybe<Scalars['Bytes']>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_not?: InputMaybe<Scalars['Bytes']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner?: InputMaybe<Scalars['Bytes']>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum OwnershipTransferredEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  NewOwner = 'newOwner',
  PreviousOwner = 'previousOwner',
  TransactionHash = 'transactionHash'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  initializedEvent?: Maybe<InitializedEvent>;
  initializedEvents: Array<InitializedEvent>;
  ownershipTransferredEvent?: Maybe<OwnershipTransferredEvent>;
  ownershipTransferredEvents: Array<OwnershipTransferredEvent>;
  registeredTypeEvent?: Maybe<RegisteredTypeEvent>;
  registeredTypeEvents: Array<RegisteredTypeEvent>;
  rewrappedEvent?: Maybe<RewrappedEvent>;
  rewrappedEvents: Array<RewrappedEvent>;
  unwrappedEvent?: Maybe<UnwrappedEvent>;
  unwrappedEvents: Array<UnwrappedEvent>;
  unwrappedPartiallyEvent?: Maybe<UnwrappedPartiallyEvent>;
  unwrappedPartiallyEvents: Array<UnwrappedPartiallyEvent>;
  wrappedBalance?: Maybe<WrappedBalance>;
  wrappedBalances: Array<WrappedBalance>;
  wrappedEvent?: Maybe<WrappedEvent>;
  wrappedEvents: Array<WrappedEvent>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryInitializedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryInitializedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InitializedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InitializedEvent_Filter>;
};


export type QueryOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferredEvent_Filter>;
};


export type QueryRegisteredTypeEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRegisteredTypeEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisteredTypeEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegisteredTypeEvent_Filter>;
};


export type QueryRewrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRewrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewrappedEvent_Filter>;
};


export type QueryUnwrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnwrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnwrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnwrappedEvent_Filter>;
};


export type QueryUnwrappedPartiallyEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnwrappedPartiallyEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnwrappedPartiallyEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnwrappedPartiallyEvent_Filter>;
};


export type QueryWrappedBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWrappedBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedBalance_Filter>;
};


export type QueryWrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedEvent_Filter>;
};

export type RegisteredTypeEvent = {
  __typename?: 'RegisteredTypeEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  tokenType: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type RegisteredTypeEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum RegisteredTypeEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash'
}

export type RewrappedEvent = {
  __typename?: 'RewrappedEvent';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  metaNftId: Scalars['BigInt'];
  newRestrictionId: Scalars['BigInt'];
  oldRestrictionId: Scalars['BigInt'];
  token: Scalars['Bytes'];
  tokenType: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  unlockTimestamp: Scalars['BigInt'];
};

export type RewrappedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metaNftId?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaNftId_lt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_lte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newRestrictionId?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newRestrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_not?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  unlockTimestamp?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unlockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum RewrappedEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  MetaNftId = 'metaNftId',
  NewRestrictionId = 'newRestrictionId',
  OldRestrictionId = 'oldRestrictionId',
  Token = 'token',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash',
  UnlockTimestamp = 'unlockTimestamp'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  initializedEvent?: Maybe<InitializedEvent>;
  initializedEvents: Array<InitializedEvent>;
  ownershipTransferredEvent?: Maybe<OwnershipTransferredEvent>;
  ownershipTransferredEvents: Array<OwnershipTransferredEvent>;
  registeredTypeEvent?: Maybe<RegisteredTypeEvent>;
  registeredTypeEvents: Array<RegisteredTypeEvent>;
  rewrappedEvent?: Maybe<RewrappedEvent>;
  rewrappedEvents: Array<RewrappedEvent>;
  unwrappedEvent?: Maybe<UnwrappedEvent>;
  unwrappedEvents: Array<UnwrappedEvent>;
  unwrappedPartiallyEvent?: Maybe<UnwrappedPartiallyEvent>;
  unwrappedPartiallyEvents: Array<UnwrappedPartiallyEvent>;
  wrappedBalance?: Maybe<WrappedBalance>;
  wrappedBalances: Array<WrappedBalance>;
  wrappedEvent?: Maybe<WrappedEvent>;
  wrappedEvents: Array<WrappedEvent>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionInitializedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionInitializedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<InitializedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<InitializedEvent_Filter>;
};


export type SubscriptionOwnershipTransferredEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionOwnershipTransferredEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferredEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<OwnershipTransferredEvent_Filter>;
};


export type SubscriptionRegisteredTypeEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRegisteredTypeEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RegisteredTypeEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RegisteredTypeEvent_Filter>;
};


export type SubscriptionRewrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRewrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RewrappedEvent_Filter>;
};


export type SubscriptionUnwrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnwrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnwrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnwrappedEvent_Filter>;
};


export type SubscriptionUnwrappedPartiallyEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnwrappedPartiallyEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnwrappedPartiallyEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnwrappedPartiallyEvent_Filter>;
};


export type SubscriptionWrappedBalanceArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWrappedBalancesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedBalance_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedBalance_Filter>;
};


export type SubscriptionWrappedEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWrappedEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WrappedEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WrappedEvent_Filter>;
};

export type UnwrappedEvent = {
  __typename?: 'UnwrappedEvent';
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  metaNftId: Scalars['BigInt'];
  oldRestrictionId: Scalars['BigInt'];
  token: Scalars['Bytes'];
  tokenType: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UnwrappedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metaNftId?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaNftId_lt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_lte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum UnwrappedEvent_OrderBy {
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  MetaNftId = 'metaNftId',
  OldRestrictionId = 'oldRestrictionId',
  Token = 'token',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash'
}

export type UnwrappedPartiallyEvent = {
  __typename?: 'UnwrappedPartiallyEvent';
  account: Scalars['Bytes'];
  amountPercentage: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  metaNftId: Scalars['BigInt'];
  newRestrictionId: Scalars['BigInt'];
  nftTokenID: Scalars['BigInt'];
  oldRestrictionId: Scalars['BigInt'];
  token: Scalars['Bytes'];
  tokenType: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type UnwrappedPartiallyEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  amountPercentage?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_not?: InputMaybe<Scalars['BigInt']>;
  amountPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metaNftId?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaNftId_lt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_lte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newRestrictionId?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newRestrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_not?: InputMaybe<Scalars['BigInt']>;
  newRestrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID_lt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_lte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  oldRestrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not?: InputMaybe<Scalars['BigInt']>;
  oldRestrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum UnwrappedPartiallyEvent_OrderBy {
  Account = 'account',
  AmountPercentage = 'amountPercentage',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  MetaNftId = 'metaNftId',
  NewRestrictionId = 'newRestrictionId',
  NftTokenId = 'nftTokenID',
  OldRestrictionId = 'oldRestrictionId',
  Token = 'token',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash'
}

export type WrappedBalance = {
  __typename?: 'WrappedBalance';
  amount: Scalars['BigInt'];
  id: Scalars['ID'];
  metaNftId: Scalars['BigInt'];
  nftTokenID: Scalars['BigInt'];
  restrictionId: Scalars['BigInt'];
  token: Scalars['Bytes'];
  tokenType: Scalars['BigInt'];
  unlockTimestamp: Scalars['BigInt'];
};

export type WrappedBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metaNftId?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaNftId_lt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_lte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID_lt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_lte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  restrictionId?: InputMaybe<Scalars['BigInt']>;
  restrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  restrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  restrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  restrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  restrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  restrictionId_not?: InputMaybe<Scalars['BigInt']>;
  restrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  unlockTimestamp?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unlockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum WrappedBalance_OrderBy {
  Amount = 'amount',
  Id = 'id',
  MetaNftId = 'metaNftId',
  NftTokenId = 'nftTokenID',
  RestrictionId = 'restrictionId',
  Token = 'token',
  TokenType = 'tokenType',
  UnlockTimestamp = 'unlockTimestamp'
}

export type WrappedEvent = {
  __typename?: 'WrappedEvent';
  amount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  metaNftId: Scalars['BigInt'];
  nftTokenID: Scalars['BigInt'];
  restrictionId: Scalars['BigInt'];
  token: Scalars['Bytes'];
  tokenType: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  unlockTimestamp: Scalars['BigInt'];
};

export type WrappedEvent_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metaNftId?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_gte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  metaNftId_lt?: InputMaybe<Scalars['BigInt']>;
  metaNftId_lte?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not?: InputMaybe<Scalars['BigInt']>;
  metaNftId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_gte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nftTokenID_lt?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_lte?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not?: InputMaybe<Scalars['BigInt']>;
  nftTokenID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  restrictionId?: InputMaybe<Scalars['BigInt']>;
  restrictionId_gt?: InputMaybe<Scalars['BigInt']>;
  restrictionId_gte?: InputMaybe<Scalars['BigInt']>;
  restrictionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  restrictionId_lt?: InputMaybe<Scalars['BigInt']>;
  restrictionId_lte?: InputMaybe<Scalars['BigInt']>;
  restrictionId_not?: InputMaybe<Scalars['BigInt']>;
  restrictionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  tokenType?: InputMaybe<Scalars['BigInt']>;
  tokenType_gt?: InputMaybe<Scalars['BigInt']>;
  tokenType_gte?: InputMaybe<Scalars['BigInt']>;
  tokenType_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenType_lt?: InputMaybe<Scalars['BigInt']>;
  tokenType_lte?: InputMaybe<Scalars['BigInt']>;
  tokenType_not?: InputMaybe<Scalars['BigInt']>;
  tokenType_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  unlockTimestamp?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unlockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  unlockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum WrappedEvent_OrderBy {
  Amount = 'amount',
  BlockNumber = 'blockNumber',
  BlockTimestamp = 'blockTimestamp',
  Id = 'id',
  MetaNftId = 'metaNftId',
  NftTokenId = 'nftTokenID',
  RestrictionId = 'restrictionId',
  Token = 'token',
  TokenType = 'tokenType',
  TransactionHash = 'transactionHash',
  UnlockTimestamp = 'unlockTimestamp'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type SubgraphMetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type SubgraphMetadataQuery = { __typename?: 'Query', _meta?: { __typename?: '_Meta_', block: { __typename?: '_Block_', timestamp?: number | null, number: number, hash?: any | null } } | null };


export const SubgraphMetadataDocument = gql`
    query SubgraphMetadata {
  _meta {
    block {
      timestamp
      number
      hash
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    SubgraphMetadata(variables?: SubgraphMetadataQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SubgraphMetadataQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SubgraphMetadataQuery>(SubgraphMetadataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SubgraphMetadata', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;