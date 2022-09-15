// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import GraphqlHandler from "@graphql-mesh/graphql"
import { parse } from 'graphql';
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import type { TidvContext } from './sources/tidv/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type Query = {
  protocol?: Maybe<Protocol>;
  protocols: Array<Protocol>;
  transcoder?: Maybe<Transcoder>;
  transcoders: Array<Transcoder>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  delegator?: Maybe<Delegator>;
  delegators: Array<Delegator>;
  broadcaster?: Maybe<Broadcaster>;
  broadcasters: Array<Broadcaster>;
  unbondingLock?: Maybe<UnbondingLock>;
  unbondingLocks: Array<UnbondingLock>;
  poll?: Maybe<Poll>;
  polls: Array<Poll>;
  pollTally?: Maybe<PollTally>;
  pollTallies: Array<PollTally>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  day?: Maybe<Day>;
  days: Array<Day>;
  transcoderDay?: Maybe<TranscoderDay>;
  transcoderDays: Array<TranscoderDay>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  bondEvent?: Maybe<BondEvent>;
  bondEvents: Array<BondEvent>;
  unbondEvent?: Maybe<UnbondEvent>;
  unbondEvents: Array<UnbondEvent>;
  rebondEvent?: Maybe<RebondEvent>;
  rebondEvents: Array<RebondEvent>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  transcoderActivatedEvent?: Maybe<TranscoderActivatedEvent>;
  transcoderActivatedEvents: Array<TranscoderActivatedEvent>;
  transcoderDeactivatedEvent?: Maybe<TranscoderDeactivatedEvent>;
  transcoderDeactivatedEvents: Array<TranscoderDeactivatedEvent>;
  earningsClaimedEvent?: Maybe<EarningsClaimedEvent>;
  earningsClaimedEvents: Array<EarningsClaimedEvent>;
  transcoderUpdateEvent?: Maybe<TranscoderUpdateEvent>;
  transcoderUpdateEvents: Array<TranscoderUpdateEvent>;
  transcoderSlashedEvent?: Maybe<TranscoderSlashedEvent>;
  transcoderSlashedEvents: Array<TranscoderSlashedEvent>;
  transcoderResignedEvent?: Maybe<TranscoderResignedEvent>;
  transcoderResignedEvents: Array<TranscoderResignedEvent>;
  transcoderEvictedEvent?: Maybe<TranscoderEvictedEvent>;
  transcoderEvictedEvents: Array<TranscoderEvictedEvent>;
  withdrawStakeEvent?: Maybe<WithdrawStakeEvent>;
  withdrawStakeEvents: Array<WithdrawStakeEvent>;
  withdrawFeesEvent?: Maybe<WithdrawFeesEvent>;
  withdrawFeesEvents: Array<WithdrawFeesEvent>;
  newRoundEvent?: Maybe<NewRoundEvent>;
  newRoundEvents: Array<NewRoundEvent>;
  winningTicketRedeemedEvent?: Maybe<WinningTicketRedeemedEvent>;
  winningTicketRedeemedEvents: Array<WinningTicketRedeemedEvent>;
  depositFundedEvent?: Maybe<DepositFundedEvent>;
  depositFundedEvents: Array<DepositFundedEvent>;
  reserveFundedEvent?: Maybe<ReserveFundedEvent>;
  reserveFundedEvents: Array<ReserveFundedEvent>;
  reserveClaimedEvent?: Maybe<ReserveClaimedEvent>;
  reserveClaimedEvents: Array<ReserveClaimedEvent>;
  withdrawalEvent?: Maybe<WithdrawalEvent>;
  withdrawalEvents: Array<WithdrawalEvent>;
  setCurrentRewardTokensEvent?: Maybe<SetCurrentRewardTokensEvent>;
  setCurrentRewardTokensEvents: Array<SetCurrentRewardTokensEvent>;
  pauseEvent?: Maybe<PauseEvent>;
  pauseEvents: Array<PauseEvent>;
  unpauseEvent?: Maybe<UnpauseEvent>;
  unpauseEvents: Array<UnpauseEvent>;
  parameterUpdateEvent?: Maybe<ParameterUpdateEvent>;
  parameterUpdateEvents: Array<ParameterUpdateEvent>;
  voteEvent?: Maybe<VoteEvent>;
  voteEvents: Array<VoteEvent>;
  pollCreatedEvent?: Maybe<PollCreatedEvent>;
  pollCreatedEvents: Array<PollCreatedEvent>;
  serviceURIUpdateEvent?: Maybe<ServiceURIUpdateEvent>;
  serviceURIUpdateEvents: Array<ServiceURIUpdateEvent>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  burnEvent?: Maybe<BurnEvent>;
  burnEvents: Array<BurnEvent>;
  event?: Maybe<Event>;
  events: Array<Event>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryprotocolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprotocolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Protocol_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Protocol_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscodersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transcoder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transcoder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroundArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryroundsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Round_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Round_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybroadcasterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybroadcastersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Broadcaster_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Broadcaster_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunbondingLockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunbondingLocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnbondingLock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnbondingLock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Poll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Poll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollTallyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollTalliesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PollTally_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PollTally_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Day_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Day_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunbondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunbondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnbondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnbondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrebondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrebondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RebondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RebondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrewardEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RewardEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderActivatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderActivatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderActivatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderActivatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderDeactivatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderDeactivatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderDeactivatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderDeactivatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryearningsClaimedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryearningsClaimedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EarningsClaimedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EarningsClaimedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderSlashedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderSlashedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderSlashedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderSlashedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderResignedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderResignedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderResignedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderResignedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderEvictedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytranscoderEvictedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderEvictedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderEvictedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawStakeEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawStakeEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawStakeEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawStakeEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawFeesEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawFeesEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawFeesEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawFeesEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewRoundEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerynewRoundEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewRoundEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewRoundEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywinningTicketRedeemedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywinningTicketRedeemedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WinningTicketRedeemedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WinningTicketRedeemedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositFundedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydepositFundedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DepositFundedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DepositFundedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreserveFundedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreserveFundedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveFundedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReserveFundedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreserveClaimedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryreserveClaimedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveClaimedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReserveClaimedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawalEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawalEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawalEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetCurrentRewardTokensEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetCurrentRewardTokensEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetCurrentRewardTokensEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetCurrentRewardTokensEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypauseEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypauseEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PauseEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PauseEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunpauseEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunpauseEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnpauseEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnpauseEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparameterUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryparameterUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ParameterUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ParameterUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollCreatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypollCreatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PollCreatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PollCreatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryserviceURIUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryserviceURIUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ServiceURIUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ServiceURIUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerymintEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryburnEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BurnEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BurnEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryeventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryeventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  protocol?: Maybe<Protocol>;
  protocols: Array<Protocol>;
  transcoder?: Maybe<Transcoder>;
  transcoders: Array<Transcoder>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  round?: Maybe<Round>;
  rounds: Array<Round>;
  delegator?: Maybe<Delegator>;
  delegators: Array<Delegator>;
  broadcaster?: Maybe<Broadcaster>;
  broadcasters: Array<Broadcaster>;
  unbondingLock?: Maybe<UnbondingLock>;
  unbondingLocks: Array<UnbondingLock>;
  poll?: Maybe<Poll>;
  polls: Array<Poll>;
  pollTally?: Maybe<PollTally>;
  pollTallies: Array<PollTally>;
  vote?: Maybe<Vote>;
  votes: Array<Vote>;
  day?: Maybe<Day>;
  days: Array<Day>;
  transcoderDay?: Maybe<TranscoderDay>;
  transcoderDays: Array<TranscoderDay>;
  transaction?: Maybe<Transaction>;
  transactions: Array<Transaction>;
  bondEvent?: Maybe<BondEvent>;
  bondEvents: Array<BondEvent>;
  unbondEvent?: Maybe<UnbondEvent>;
  unbondEvents: Array<UnbondEvent>;
  rebondEvent?: Maybe<RebondEvent>;
  rebondEvents: Array<RebondEvent>;
  rewardEvent?: Maybe<RewardEvent>;
  rewardEvents: Array<RewardEvent>;
  transcoderActivatedEvent?: Maybe<TranscoderActivatedEvent>;
  transcoderActivatedEvents: Array<TranscoderActivatedEvent>;
  transcoderDeactivatedEvent?: Maybe<TranscoderDeactivatedEvent>;
  transcoderDeactivatedEvents: Array<TranscoderDeactivatedEvent>;
  earningsClaimedEvent?: Maybe<EarningsClaimedEvent>;
  earningsClaimedEvents: Array<EarningsClaimedEvent>;
  transcoderUpdateEvent?: Maybe<TranscoderUpdateEvent>;
  transcoderUpdateEvents: Array<TranscoderUpdateEvent>;
  transcoderSlashedEvent?: Maybe<TranscoderSlashedEvent>;
  transcoderSlashedEvents: Array<TranscoderSlashedEvent>;
  transcoderResignedEvent?: Maybe<TranscoderResignedEvent>;
  transcoderResignedEvents: Array<TranscoderResignedEvent>;
  transcoderEvictedEvent?: Maybe<TranscoderEvictedEvent>;
  transcoderEvictedEvents: Array<TranscoderEvictedEvent>;
  withdrawStakeEvent?: Maybe<WithdrawStakeEvent>;
  withdrawStakeEvents: Array<WithdrawStakeEvent>;
  withdrawFeesEvent?: Maybe<WithdrawFeesEvent>;
  withdrawFeesEvents: Array<WithdrawFeesEvent>;
  newRoundEvent?: Maybe<NewRoundEvent>;
  newRoundEvents: Array<NewRoundEvent>;
  winningTicketRedeemedEvent?: Maybe<WinningTicketRedeemedEvent>;
  winningTicketRedeemedEvents: Array<WinningTicketRedeemedEvent>;
  depositFundedEvent?: Maybe<DepositFundedEvent>;
  depositFundedEvents: Array<DepositFundedEvent>;
  reserveFundedEvent?: Maybe<ReserveFundedEvent>;
  reserveFundedEvents: Array<ReserveFundedEvent>;
  reserveClaimedEvent?: Maybe<ReserveClaimedEvent>;
  reserveClaimedEvents: Array<ReserveClaimedEvent>;
  withdrawalEvent?: Maybe<WithdrawalEvent>;
  withdrawalEvents: Array<WithdrawalEvent>;
  setCurrentRewardTokensEvent?: Maybe<SetCurrentRewardTokensEvent>;
  setCurrentRewardTokensEvents: Array<SetCurrentRewardTokensEvent>;
  pauseEvent?: Maybe<PauseEvent>;
  pauseEvents: Array<PauseEvent>;
  unpauseEvent?: Maybe<UnpauseEvent>;
  unpauseEvents: Array<UnpauseEvent>;
  parameterUpdateEvent?: Maybe<ParameterUpdateEvent>;
  parameterUpdateEvents: Array<ParameterUpdateEvent>;
  voteEvent?: Maybe<VoteEvent>;
  voteEvents: Array<VoteEvent>;
  pollCreatedEvent?: Maybe<PollCreatedEvent>;
  pollCreatedEvents: Array<PollCreatedEvent>;
  serviceURIUpdateEvent?: Maybe<ServiceURIUpdateEvent>;
  serviceURIUpdateEvents: Array<ServiceURIUpdateEvent>;
  mintEvent?: Maybe<MintEvent>;
  mintEvents: Array<MintEvent>;
  burnEvent?: Maybe<BurnEvent>;
  burnEvents: Array<BurnEvent>;
  event?: Maybe<Event>;
  events: Array<Event>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionprotocolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprotocolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Protocol_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Protocol_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscodersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transcoder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transcoder_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroundArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionroundsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Round_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Round_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbroadcasterArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbroadcastersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Broadcaster_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Broadcaster_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunbondingLockArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunbondingLocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnbondingLock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnbondingLock_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Poll_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Poll_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollTallyArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollTalliesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PollTally_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PollTally_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Day_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Day_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontransactionsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transaction_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transaction_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunbondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunbondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnbondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnbondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrebondEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrebondEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RebondEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RebondEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrewardEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RewardEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<RewardEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderActivatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderActivatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderActivatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderActivatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderDeactivatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderDeactivatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderDeactivatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderDeactivatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionearningsClaimedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionearningsClaimedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EarningsClaimedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EarningsClaimedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderSlashedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderSlashedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderSlashedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderSlashedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderResignedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderResignedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderResignedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderResignedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderEvictedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontranscoderEvictedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TranscoderEvictedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<TranscoderEvictedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawStakeEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawStakeEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawStakeEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawStakeEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawFeesEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawFeesEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawFeesEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawFeesEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewRoundEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionnewRoundEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<NewRoundEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<NewRoundEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwinningTicketRedeemedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwinningTicketRedeemedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WinningTicketRedeemedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WinningTicketRedeemedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositFundedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondepositFundedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DepositFundedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DepositFundedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreserveFundedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreserveFundedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveFundedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReserveFundedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreserveClaimedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionreserveClaimedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ReserveClaimedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ReserveClaimedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawalEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawalEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawalEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetCurrentRewardTokensEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetCurrentRewardTokensEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetCurrentRewardTokensEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetCurrentRewardTokensEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpauseEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpauseEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PauseEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PauseEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunpauseEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunpauseEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnpauseEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnpauseEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparameterUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionparameterUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ParameterUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ParameterUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollCreatedEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpollCreatedEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PollCreatedEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PollCreatedEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionserviceURIUpdateEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionserviceURIUpdateEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ServiceURIUpdateEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ServiceURIUpdateEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionmintEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<MintEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<MintEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionburnEventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionburnEventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<BurnEvent_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<BurnEvent_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioneventArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/**
 * BondEvent entities are created for every emitted Bond event.
 *
 */
export type BondEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in, used to sort */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Delegator's current total bonded amount */
  bondedAmount: Scalars['BigDecimal'];
  /** Additional amount added to bonded amount */
  additionalAmount: Scalars['BigDecimal'];
  /** Reference to the Delegator's new delegate */
  newDelegate: Transcoder;
  /** Reference to the Delegator's old delegate */
  oldDelegate: Transcoder;
  /** Reference to the Delegator that bonded */
  delegator: Delegator;
};

export type BondEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  bondedAmount?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  bondedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  additionalAmount?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  additionalAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  additionalAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  newDelegate?: InputMaybe<Scalars['String']>;
  newDelegate_not?: InputMaybe<Scalars['String']>;
  newDelegate_gt?: InputMaybe<Scalars['String']>;
  newDelegate_lt?: InputMaybe<Scalars['String']>;
  newDelegate_gte?: InputMaybe<Scalars['String']>;
  newDelegate_lte?: InputMaybe<Scalars['String']>;
  newDelegate_in?: InputMaybe<Array<Scalars['String']>>;
  newDelegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  newDelegate_contains?: InputMaybe<Scalars['String']>;
  newDelegate_contains_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_contains?: InputMaybe<Scalars['String']>;
  newDelegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_starts_with?: InputMaybe<Scalars['String']>;
  newDelegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_starts_with?: InputMaybe<Scalars['String']>;
  newDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_ends_with?: InputMaybe<Scalars['String']>;
  newDelegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_not_ends_with?: InputMaybe<Scalars['String']>;
  newDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  newDelegate_?: InputMaybe<Transcoder_filter>;
  oldDelegate?: InputMaybe<Scalars['String']>;
  oldDelegate_not?: InputMaybe<Scalars['String']>;
  oldDelegate_gt?: InputMaybe<Scalars['String']>;
  oldDelegate_lt?: InputMaybe<Scalars['String']>;
  oldDelegate_gte?: InputMaybe<Scalars['String']>;
  oldDelegate_lte?: InputMaybe<Scalars['String']>;
  oldDelegate_in?: InputMaybe<Array<Scalars['String']>>;
  oldDelegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  oldDelegate_contains?: InputMaybe<Scalars['String']>;
  oldDelegate_contains_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_not_contains?: InputMaybe<Scalars['String']>;
  oldDelegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_starts_with?: InputMaybe<Scalars['String']>;
  oldDelegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_not_starts_with?: InputMaybe<Scalars['String']>;
  oldDelegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_ends_with?: InputMaybe<Scalars['String']>;
  oldDelegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_not_ends_with?: InputMaybe<Scalars['String']>;
  oldDelegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  oldDelegate_?: InputMaybe<Transcoder_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type BondEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'bondedAmount'
  | 'additionalAmount'
  | 'newDelegate'
  | 'oldDelegate'
  | 'delegator';

/**
 * Broadcasters pay transcoders to do the work of transcoding in exchange for fees
 *
 */
export type Broadcaster = {
  /** ETH address of a broadcaster */
  id: Scalars['ID'];
  /** Amount of funds deposited */
  deposit: Scalars['BigDecimal'];
  /** Amount of funds in reserve */
  reserve: Scalars['BigDecimal'];
};

export type Broadcaster_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  deposit?: InputMaybe<Scalars['BigDecimal']>;
  deposit_not?: InputMaybe<Scalars['BigDecimal']>;
  deposit_gt?: InputMaybe<Scalars['BigDecimal']>;
  deposit_lt?: InputMaybe<Scalars['BigDecimal']>;
  deposit_gte?: InputMaybe<Scalars['BigDecimal']>;
  deposit_lte?: InputMaybe<Scalars['BigDecimal']>;
  deposit_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  deposit_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve?: InputMaybe<Scalars['BigDecimal']>;
  reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Broadcaster_orderBy =
  | 'id'
  | 'deposit'
  | 'reserve';

/**
 * BurnEvent entities are created for every emitted Burn event.
 *
 */
export type BurnEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Amount of tokens burned */
  value: Scalars['BigDecimal'];
};

export type BurnEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type BurnEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'value';

/**
 * Protocol data accumulated and condensed into day stats
 *
 */
export type Day = {
  /** Timestamp rounded to current day by dividing by 86400 */
  id: Scalars['ID'];
  /** The date beginning at 12:00am UTC */
  date: Scalars['Int'];
  /** Fees generated this day in ETH */
  volumeETH: Scalars['BigDecimal'];
  /** Fees generated this day in USD */
  volumeUSD: Scalars['BigDecimal'];
  /** Total active stake during the day */
  totalActiveStake: Scalars['BigDecimal'];
  /** Total Livepeer token supply during the day */
  totalSupply: Scalars['BigDecimal'];
  /** Participation rate during the day (totalActiveStake/totalSupply) */
  participationRate: Scalars['BigDecimal'];
};

export type Day_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalActiveStake?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_not?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalActiveStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_not?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Day_orderBy =
  | 'id'
  | 'date'
  | 'volumeETH'
  | 'volumeUSD'
  | 'totalActiveStake'
  | 'totalSupply'
  | 'participationRate';

/**
 * Bonded accounts who have delegated their stake towards a transcoder candidate
 *
 */
export type Delegator = {
  /** ETH address of a delegator */
  id: Scalars['ID'];
  /** ETH address of the delegate (the one whom the delegator has bonded to) */
  delegate?: Maybe<Transcoder>;
  /** Round the delegator becomes bonded and delegated to its delegate */
  startRound: Scalars['BigInt'];
  /** Last round that the delegator claimed reward and fee pool shares */
  lastClaimRound?: Maybe<Round>;
  /** Amount of Livepeer Token a delegator currently has bonded */
  bondedAmount: Scalars['BigDecimal'];
  /** Amount of Livepeer Token a delegator has bonded over its lifetime separate from rewards */
  principal: Scalars['BigDecimal'];
  /** Amount of Livepeer Token a delegator has unbonded over its lifetime */
  unbonded: Scalars['BigDecimal'];
  /** Amount of fees a delegator has collected */
  fees: Scalars['BigDecimal'];
  /** Amount of fees withdrawn */
  withdrawnFees: Scalars['BigDecimal'];
  /** Amount of Livepeer Token the delegator has delegated */
  delegatedAmount: Scalars['BigDecimal'];
  /** Unbonding locks associated with the delegator */
  unbondingLocks?: Maybe<Array<UnbondingLock>>;
};


/**
 * Bonded accounts who have delegated their stake towards a transcoder candidate
 *
 */
export type DelegatorunbondingLocksArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnbondingLock_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<UnbondingLock_filter>;
};

export type Delegator_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  startRound?: InputMaybe<Scalars['BigInt']>;
  startRound_not?: InputMaybe<Scalars['BigInt']>;
  startRound_gt?: InputMaybe<Scalars['BigInt']>;
  startRound_lt?: InputMaybe<Scalars['BigInt']>;
  startRound_gte?: InputMaybe<Scalars['BigInt']>;
  startRound_lte?: InputMaybe<Scalars['BigInt']>;
  startRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastClaimRound?: InputMaybe<Scalars['String']>;
  lastClaimRound_not?: InputMaybe<Scalars['String']>;
  lastClaimRound_gt?: InputMaybe<Scalars['String']>;
  lastClaimRound_lt?: InputMaybe<Scalars['String']>;
  lastClaimRound_gte?: InputMaybe<Scalars['String']>;
  lastClaimRound_lte?: InputMaybe<Scalars['String']>;
  lastClaimRound_in?: InputMaybe<Array<Scalars['String']>>;
  lastClaimRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastClaimRound_contains?: InputMaybe<Scalars['String']>;
  lastClaimRound_contains_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_contains?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_starts_with?: InputMaybe<Scalars['String']>;
  lastClaimRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_starts_with?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_ends_with?: InputMaybe<Scalars['String']>;
  lastClaimRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_ends_with?: InputMaybe<Scalars['String']>;
  lastClaimRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastClaimRound_?: InputMaybe<Round_filter>;
  bondedAmount?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  bondedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  bondedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal?: InputMaybe<Scalars['BigDecimal']>;
  principal_not?: InputMaybe<Scalars['BigDecimal']>;
  principal_gt?: InputMaybe<Scalars['BigDecimal']>;
  principal_lt?: InputMaybe<Scalars['BigDecimal']>;
  principal_gte?: InputMaybe<Scalars['BigDecimal']>;
  principal_lte?: InputMaybe<Scalars['BigDecimal']>;
  principal_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  principal_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  unbonded?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_not?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_gt?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_lt?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_gte?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_lte?: InputMaybe<Scalars['BigDecimal']>;
  unbonded_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  unbonded_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fees?: InputMaybe<Scalars['BigDecimal']>;
  fees_not?: InputMaybe<Scalars['BigDecimal']>;
  fees_gt?: InputMaybe<Scalars['BigDecimal']>;
  fees_lt?: InputMaybe<Scalars['BigDecimal']>;
  fees_gte?: InputMaybe<Scalars['BigDecimal']>;
  fees_lte?: InputMaybe<Scalars['BigDecimal']>;
  fees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  withdrawnFees?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_not?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_gt?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_lt?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_gte?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_lte?: InputMaybe<Scalars['BigDecimal']>;
  withdrawnFees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  withdrawnFees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  delegatedAmount?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_not?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_gt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_lt?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_gte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_lte?: InputMaybe<Scalars['BigDecimal']>;
  delegatedAmount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  delegatedAmount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  unbondingLocks_?: InputMaybe<UnbondingLock_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Delegator_orderBy =
  | 'id'
  | 'delegate'
  | 'startRound'
  | 'lastClaimRound'
  | 'bondedAmount'
  | 'principal'
  | 'unbonded'
  | 'fees'
  | 'withdrawnFees'
  | 'delegatedAmount'
  | 'unbondingLocks';

/**
 * DepositFundedEvent entities are created for every emitted DepositFunded event.
 *
 */
export type DepositFundedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the broadcaster that deposited the broadcasting fees */
  sender: Broadcaster;
  /** Amount of broadcasting fees deposited */
  amount: Scalars['BigDecimal'];
};

export type DepositFundedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  sender?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_?: InputMaybe<Broadcaster_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type DepositFundedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'sender'
  | 'amount';

/**
 * EarningsClaimedEvent entities are created for every emitted EarningsClaimed event.
 *
 */
export type EarningsClaimedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegator that claimed its earnings */
  delegator: Delegator;
  /** Reference to the delegator's delegate */
  delegate: Transcoder;
  /** First round that the delegator's pending stake was computed from */
  startRound: Scalars['BigInt'];
  /** Last round that the delegator's pending stake was computed from */
  endRound: Round;
  /** Reward tokens claimed by the delegator */
  rewardTokens: Scalars['BigDecimal'];
  /** Fees claimed by the delegator */
  fees: Scalars['BigDecimal'];
};

export type EarningsClaimedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  startRound?: InputMaybe<Scalars['BigInt']>;
  startRound_not?: InputMaybe<Scalars['BigInt']>;
  startRound_gt?: InputMaybe<Scalars['BigInt']>;
  startRound_lt?: InputMaybe<Scalars['BigInt']>;
  startRound_gte?: InputMaybe<Scalars['BigInt']>;
  startRound_lte?: InputMaybe<Scalars['BigInt']>;
  startRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endRound?: InputMaybe<Scalars['String']>;
  endRound_not?: InputMaybe<Scalars['String']>;
  endRound_gt?: InputMaybe<Scalars['String']>;
  endRound_lt?: InputMaybe<Scalars['String']>;
  endRound_gte?: InputMaybe<Scalars['String']>;
  endRound_lte?: InputMaybe<Scalars['String']>;
  endRound_in?: InputMaybe<Array<Scalars['String']>>;
  endRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  endRound_contains?: InputMaybe<Scalars['String']>;
  endRound_contains_nocase?: InputMaybe<Scalars['String']>;
  endRound_not_contains?: InputMaybe<Scalars['String']>;
  endRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  endRound_starts_with?: InputMaybe<Scalars['String']>;
  endRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  endRound_not_starts_with?: InputMaybe<Scalars['String']>;
  endRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  endRound_ends_with?: InputMaybe<Scalars['String']>;
  endRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  endRound_not_ends_with?: InputMaybe<Scalars['String']>;
  endRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  endRound_?: InputMaybe<Round_filter>;
  rewardTokens?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardTokens_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fees?: InputMaybe<Scalars['BigDecimal']>;
  fees_not?: InputMaybe<Scalars['BigDecimal']>;
  fees_gt?: InputMaybe<Scalars['BigDecimal']>;
  fees_lt?: InputMaybe<Scalars['BigDecimal']>;
  fees_gte?: InputMaybe<Scalars['BigDecimal']>;
  fees_lte?: InputMaybe<Scalars['BigDecimal']>;
  fees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type EarningsClaimedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegator'
  | 'delegate'
  | 'startRound'
  | 'endRound'
  | 'rewardTokens'
  | 'fees';

export type Event = {
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  transaction: Transaction;
  round: Round;
};

export type Event_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Event_orderBy =
  | 'id'
  | 'timestamp'
  | 'transaction'
  | 'round';

/**
 * MintEvent entities are created for every emitted Mint event.
 *
 */
export type MintEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Token smart contract address */
  to: Scalars['String'];
  /** Amount of tokens minted */
  amount: Scalars['BigDecimal'];
};

export type MintEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type MintEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'to'
  | 'amount';

/**
 * NewRoundEvent entities are created for every emitted NewRound event.
 *
 */
export type NewRoundEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Block hash for the round */
  blockHash: Scalars['String'];
};

export type NewRoundEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  blockHash?: InputMaybe<Scalars['String']>;
  blockHash_not?: InputMaybe<Scalars['String']>;
  blockHash_gt?: InputMaybe<Scalars['String']>;
  blockHash_lt?: InputMaybe<Scalars['String']>;
  blockHash_gte?: InputMaybe<Scalars['String']>;
  blockHash_lte?: InputMaybe<Scalars['String']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']>>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']>>;
  blockHash_contains?: InputMaybe<Scalars['String']>;
  blockHash_contains_nocase?: InputMaybe<Scalars['String']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']>;
  blockHash_not_contains_nocase?: InputMaybe<Scalars['String']>;
  blockHash_starts_with?: InputMaybe<Scalars['String']>;
  blockHash_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockHash_not_starts_with?: InputMaybe<Scalars['String']>;
  blockHash_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockHash_ends_with?: InputMaybe<Scalars['String']>;
  blockHash_ends_with_nocase?: InputMaybe<Scalars['String']>;
  blockHash_not_ends_with?: InputMaybe<Scalars['String']>;
  blockHash_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type NewRoundEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'blockHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

/**
 * ParameterUpdateEvent entities are created for every emitted ParameterUpdate event.
 *
 */
export type ParameterUpdateEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Parameter that was updated */
  param: Scalars['String'];
};

export type ParameterUpdateEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  param?: InputMaybe<Scalars['String']>;
  param_not?: InputMaybe<Scalars['String']>;
  param_gt?: InputMaybe<Scalars['String']>;
  param_lt?: InputMaybe<Scalars['String']>;
  param_gte?: InputMaybe<Scalars['String']>;
  param_lte?: InputMaybe<Scalars['String']>;
  param_in?: InputMaybe<Array<Scalars['String']>>;
  param_not_in?: InputMaybe<Array<Scalars['String']>>;
  param_contains?: InputMaybe<Scalars['String']>;
  param_contains_nocase?: InputMaybe<Scalars['String']>;
  param_not_contains?: InputMaybe<Scalars['String']>;
  param_not_contains_nocase?: InputMaybe<Scalars['String']>;
  param_starts_with?: InputMaybe<Scalars['String']>;
  param_starts_with_nocase?: InputMaybe<Scalars['String']>;
  param_not_starts_with?: InputMaybe<Scalars['String']>;
  param_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  param_ends_with?: InputMaybe<Scalars['String']>;
  param_ends_with_nocase?: InputMaybe<Scalars['String']>;
  param_not_ends_with?: InputMaybe<Scalars['String']>;
  param_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ParameterUpdateEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'param';

/**
 * PauseEvent entities are created for every emitted Pause event.
 *
 */
export type PauseEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
};

export type PauseEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PauseEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round';

/**
 * Stake weighted poll
 *
 */
export type Poll = {
  /** Poll address */
  id: Scalars['ID'];
  /** IPFS multihash for the proposal */
  proposal: Scalars['String'];
  /** Block at which the poll ends and votes can no longer be submitted */
  endBlock: Scalars['BigInt'];
  /** Minimum amount of participation (total stake including inactive stake) required for a poll to pass */
  quorum: Scalars['BigInt'];
  /** Minimum amount of yes votes required for a poll to pass */
  quota: Scalars['BigInt'];
  /** Poll tally */
  tally?: Maybe<PollTally>;
  /** Votes belonging to a poll */
  votes?: Maybe<Array<Vote>>;
};


/**
 * Stake weighted poll
 *
 */
export type PollvotesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vote_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vote_filter>;
};

export type PollChoice =
  | 'Yes'
  | 'No';

/**
 * PollCreatedEvent entities are created for every emitted PollCreated event.
 *
 */
export type PollCreatedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the poll that was created */
  poll: Poll;
  /** IPFS content hash representing proposal */
  proposal: Scalars['Bytes'];
  /** Ethereum block in which this poll ends */
  endBlock: Scalars['BigInt'];
  /** The minimum amount of stake-weighted votes for this poll's outcome to be considered valid */
  quorum: Scalars['BigInt'];
  /** The minimum amount of stake-weighted 'yes' votes needed for the poll to pass */
  quota: Scalars['BigInt'];
};

export type PollCreatedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  poll?: InputMaybe<Scalars['String']>;
  poll_not?: InputMaybe<Scalars['String']>;
  poll_gt?: InputMaybe<Scalars['String']>;
  poll_lt?: InputMaybe<Scalars['String']>;
  poll_gte?: InputMaybe<Scalars['String']>;
  poll_lte?: InputMaybe<Scalars['String']>;
  poll_in?: InputMaybe<Array<Scalars['String']>>;
  poll_not_in?: InputMaybe<Array<Scalars['String']>>;
  poll_contains?: InputMaybe<Scalars['String']>;
  poll_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_not_contains?: InputMaybe<Scalars['String']>;
  poll_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_starts_with?: InputMaybe<Scalars['String']>;
  poll_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_starts_with?: InputMaybe<Scalars['String']>;
  poll_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_ends_with?: InputMaybe<Scalars['String']>;
  poll_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_ends_with?: InputMaybe<Scalars['String']>;
  poll_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_?: InputMaybe<Poll_filter>;
  proposal?: InputMaybe<Scalars['Bytes']>;
  proposal_not?: InputMaybe<Scalars['Bytes']>;
  proposal_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposal_contains?: InputMaybe<Scalars['Bytes']>;
  proposal_not_contains?: InputMaybe<Scalars['Bytes']>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorum?: InputMaybe<Scalars['BigInt']>;
  quorum_not?: InputMaybe<Scalars['BigInt']>;
  quorum_gt?: InputMaybe<Scalars['BigInt']>;
  quorum_lt?: InputMaybe<Scalars['BigInt']>;
  quorum_gte?: InputMaybe<Scalars['BigInt']>;
  quorum_lte?: InputMaybe<Scalars['BigInt']>;
  quorum_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorum_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quota?: InputMaybe<Scalars['BigInt']>;
  quota_not?: InputMaybe<Scalars['BigInt']>;
  quota_gt?: InputMaybe<Scalars['BigInt']>;
  quota_lt?: InputMaybe<Scalars['BigInt']>;
  quota_gte?: InputMaybe<Scalars['BigInt']>;
  quota_lte?: InputMaybe<Scalars['BigInt']>;
  quota_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quota_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PollCreatedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'poll'
  | 'proposal'
  | 'endBlock'
  | 'quorum'
  | 'quota';

/**
 * Stake weighted tally associated with a poll
 *
 */
export type PollTally = {
  /** Poll address */
  id: Scalars['ID'];
  /** Stake voted yes */
  yes?: Maybe<Scalars['BigDecimal']>;
  /** Stake voted no */
  no?: Maybe<Scalars['BigDecimal']>;
};

export type PollTally_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  yes?: InputMaybe<Scalars['BigDecimal']>;
  yes_not?: InputMaybe<Scalars['BigDecimal']>;
  yes_gt?: InputMaybe<Scalars['BigDecimal']>;
  yes_lt?: InputMaybe<Scalars['BigDecimal']>;
  yes_gte?: InputMaybe<Scalars['BigDecimal']>;
  yes_lte?: InputMaybe<Scalars['BigDecimal']>;
  yes_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  yes_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  no?: InputMaybe<Scalars['BigDecimal']>;
  no_not?: InputMaybe<Scalars['BigDecimal']>;
  no_gt?: InputMaybe<Scalars['BigDecimal']>;
  no_lt?: InputMaybe<Scalars['BigDecimal']>;
  no_gte?: InputMaybe<Scalars['BigDecimal']>;
  no_lte?: InputMaybe<Scalars['BigDecimal']>;
  no_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  no_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PollTally_orderBy =
  | 'id'
  | 'yes'
  | 'no';

export type Poll_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorum?: InputMaybe<Scalars['BigInt']>;
  quorum_not?: InputMaybe<Scalars['BigInt']>;
  quorum_gt?: InputMaybe<Scalars['BigInt']>;
  quorum_lt?: InputMaybe<Scalars['BigInt']>;
  quorum_gte?: InputMaybe<Scalars['BigInt']>;
  quorum_lte?: InputMaybe<Scalars['BigInt']>;
  quorum_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quorum_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quota?: InputMaybe<Scalars['BigInt']>;
  quota_not?: InputMaybe<Scalars['BigInt']>;
  quota_gt?: InputMaybe<Scalars['BigInt']>;
  quota_lt?: InputMaybe<Scalars['BigInt']>;
  quota_gte?: InputMaybe<Scalars['BigInt']>;
  quota_lte?: InputMaybe<Scalars['BigInt']>;
  quota_in?: InputMaybe<Array<Scalars['BigInt']>>;
  quota_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tally?: InputMaybe<Scalars['String']>;
  tally_not?: InputMaybe<Scalars['String']>;
  tally_gt?: InputMaybe<Scalars['String']>;
  tally_lt?: InputMaybe<Scalars['String']>;
  tally_gte?: InputMaybe<Scalars['String']>;
  tally_lte?: InputMaybe<Scalars['String']>;
  tally_in?: InputMaybe<Array<Scalars['String']>>;
  tally_not_in?: InputMaybe<Array<Scalars['String']>>;
  tally_contains?: InputMaybe<Scalars['String']>;
  tally_contains_nocase?: InputMaybe<Scalars['String']>;
  tally_not_contains?: InputMaybe<Scalars['String']>;
  tally_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tally_starts_with?: InputMaybe<Scalars['String']>;
  tally_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tally_not_starts_with?: InputMaybe<Scalars['String']>;
  tally_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tally_ends_with?: InputMaybe<Scalars['String']>;
  tally_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tally_not_ends_with?: InputMaybe<Scalars['String']>;
  tally_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tally_?: InputMaybe<PollTally_filter>;
  votes?: InputMaybe<Array<Scalars['String']>>;
  votes_not?: InputMaybe<Array<Scalars['String']>>;
  votes_contains?: InputMaybe<Array<Scalars['String']>>;
  votes_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  votes_not_contains?: InputMaybe<Array<Scalars['String']>>;
  votes_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  votes_?: InputMaybe<Vote_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Poll_orderBy =
  | 'id'
  | 'proposal'
  | 'endBlock'
  | 'quorum'
  | 'quota'
  | 'tally'
  | 'votes';

/**
 * Represents a transcoder's rewards and fees to be distributed to delegators
 *
 */
export type Pool = {
  /** Unique identifer for the pool (formed using the transcoder's address and round number) */
  id: Scalars['ID'];
  /** Round associated with the pool */
  round: Round;
  /** Transcoder associated with the pool */
  delegate: Transcoder;
  /** Fees collected in the pool */
  fees?: Maybe<Scalars['BigDecimal']>;
  /** Total reward tokens collected in the pool */
  rewardTokens?: Maybe<Scalars['BigDecimal']>;
  /** Transcoder's total stake during the earnings pool's round */
  totalStake: Scalars['BigDecimal'];
  /** Transcoder's reward cut during the earnings pool's round */
  rewardCut: Scalars['BigInt'];
  /** Transcoder's fee share during the earnings pool's round */
  feeShare: Scalars['BigInt'];
};

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  fees?: InputMaybe<Scalars['BigDecimal']>;
  fees_not?: InputMaybe<Scalars['BigDecimal']>;
  fees_gt?: InputMaybe<Scalars['BigDecimal']>;
  fees_lt?: InputMaybe<Scalars['BigDecimal']>;
  fees_gte?: InputMaybe<Scalars['BigDecimal']>;
  fees_lte?: InputMaybe<Scalars['BigDecimal']>;
  fees_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fees_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardTokens?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardTokens_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalStake?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_not?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardCut?: InputMaybe<Scalars['BigInt']>;
  rewardCut_not?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare?: InputMaybe<Scalars['BigInt']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']>;
  feeShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Pool_orderBy =
  | 'id'
  | 'round'
  | 'delegate'
  | 'fees'
  | 'rewardTokens'
  | 'totalStake'
  | 'rewardCut'
  | 'feeShare';

/**
 * Livepeer protocol global parameters
 *
 */
export type Protocol = {
  /** ID is set to 0 */
  id: Scalars['ID'];
  /** Per round inflation rate */
  inflation: Scalars['BigInt'];
  /** Change in inflation rate per round until the target bonding rate is achieved */
  inflationChange: Scalars['BigInt'];
  /** Max number of rounds that a caller can claim earnings for at once */
  maxEarningsClaimsRounds: Scalars['Int'];
  /** Total active transcoders */
  numActiveTranscoders: Scalars['Int'];
  /** True if the protocol is paused */
  paused: Scalars['Boolean'];
  /** Target bonding rate (participation) that determines whether inflation should increase or decrease */
  targetBondingRate: Scalars['BigInt'];
  /** Time in blocks needed to wait to unstake */
  unbondingPeriod: Scalars['BigInt'];
  /** Time in blocks delegators have to review transcoder information without changes */
  lockPeriod: Scalars['BigInt'];
  /** Lock period of a round as a % of round length */
  roundLockAmount: Scalars['BigInt'];
  /** The total amount of active LPT staked */
  totalActiveStake: Scalars['BigDecimal'];
  /** Total broadcaster fees transcoders have accumulated in ETH */
  totalVolumeETH: Scalars['BigDecimal'];
  /** Total broadcaster fees transcoders have accumulated in USD */
  totalVolumeUSD: Scalars['BigDecimal'];
  /** Ratio of total active stake to total supply */
  participationRate: Scalars['BigDecimal'];
  /** Current round the protocol is in */
  currentRound?: Maybe<Round>;
  /** Round that was last initialized */
  lastInitializedRound?: Maybe<Round>;
  /** Round when round length was last updated */
  lastRoundLengthUpdateRound?: Maybe<Round>;
  /** Round length in blocks */
  roundLength: Scalars['BigInt'];
  /** Block when round length was last updated */
  lastRoundLengthUpdateStartBlock: Scalars['BigInt'];
  /** Livepeer Token supply */
  totalSupply: Scalars['BigDecimal'];
  /** Total winning tickets */
  winningTicketCount: Scalars['Int'];
  /** Total rounds */
  roundCount: Scalars['Int'];
  /** Transcoders pending activation */
  pendingActivation: Array<Transcoder>;
  /** Transcoders pending deactivation */
  pendingDeactivation: Array<Transcoder>;
};


/**
 * Livepeer protocol global parameters
 *
 */
export type ProtocolpendingActivationArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transcoder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transcoder_filter>;
};


/**
 * Livepeer protocol global parameters
 *
 */
export type ProtocolpendingDeactivationArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transcoder_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Transcoder_filter>;
};

export type Protocol_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  inflation?: InputMaybe<Scalars['BigInt']>;
  inflation_not?: InputMaybe<Scalars['BigInt']>;
  inflation_gt?: InputMaybe<Scalars['BigInt']>;
  inflation_lt?: InputMaybe<Scalars['BigInt']>;
  inflation_gte?: InputMaybe<Scalars['BigInt']>;
  inflation_lte?: InputMaybe<Scalars['BigInt']>;
  inflation_in?: InputMaybe<Array<Scalars['BigInt']>>;
  inflation_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  inflationChange?: InputMaybe<Scalars['BigInt']>;
  inflationChange_not?: InputMaybe<Scalars['BigInt']>;
  inflationChange_gt?: InputMaybe<Scalars['BigInt']>;
  inflationChange_lt?: InputMaybe<Scalars['BigInt']>;
  inflationChange_gte?: InputMaybe<Scalars['BigInt']>;
  inflationChange_lte?: InputMaybe<Scalars['BigInt']>;
  inflationChange_in?: InputMaybe<Array<Scalars['BigInt']>>;
  inflationChange_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxEarningsClaimsRounds?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_not?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_gt?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_lt?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_gte?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_lte?: InputMaybe<Scalars['Int']>;
  maxEarningsClaimsRounds_in?: InputMaybe<Array<Scalars['Int']>>;
  maxEarningsClaimsRounds_not_in?: InputMaybe<Array<Scalars['Int']>>;
  numActiveTranscoders?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_not?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_gt?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_lt?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_gte?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_lte?: InputMaybe<Scalars['Int']>;
  numActiveTranscoders_in?: InputMaybe<Array<Scalars['Int']>>;
  numActiveTranscoders_not_in?: InputMaybe<Array<Scalars['Int']>>;
  paused?: InputMaybe<Scalars['Boolean']>;
  paused_not?: InputMaybe<Scalars['Boolean']>;
  paused_in?: InputMaybe<Array<Scalars['Boolean']>>;
  paused_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  targetBondingRate?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_not?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_gt?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_lt?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_gte?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_lte?: InputMaybe<Scalars['BigInt']>;
  targetBondingRate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  targetBondingRate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unbondingPeriod?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_not?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  unbondingPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unbondingPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockPeriod?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_not?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_gt?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_lt?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_gte?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_lte?: InputMaybe<Scalars['BigInt']>;
  lockPeriod_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lockPeriod_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundLockAmount?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_not?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_gt?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_lt?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_gte?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_lte?: InputMaybe<Scalars['BigInt']>;
  roundLockAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundLockAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalActiveStake?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_not?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalActiveStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_not?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentRound?: InputMaybe<Scalars['String']>;
  currentRound_not?: InputMaybe<Scalars['String']>;
  currentRound_gt?: InputMaybe<Scalars['String']>;
  currentRound_lt?: InputMaybe<Scalars['String']>;
  currentRound_gte?: InputMaybe<Scalars['String']>;
  currentRound_lte?: InputMaybe<Scalars['String']>;
  currentRound_in?: InputMaybe<Array<Scalars['String']>>;
  currentRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  currentRound_contains?: InputMaybe<Scalars['String']>;
  currentRound_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_contains?: InputMaybe<Scalars['String']>;
  currentRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  currentRound_starts_with?: InputMaybe<Scalars['String']>;
  currentRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_starts_with?: InputMaybe<Scalars['String']>;
  currentRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_ends_with?: InputMaybe<Scalars['String']>;
  currentRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_not_ends_with?: InputMaybe<Scalars['String']>;
  currentRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  currentRound_?: InputMaybe<Round_filter>;
  lastInitializedRound?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not?: InputMaybe<Scalars['String']>;
  lastInitializedRound_gt?: InputMaybe<Scalars['String']>;
  lastInitializedRound_lt?: InputMaybe<Scalars['String']>;
  lastInitializedRound_gte?: InputMaybe<Scalars['String']>;
  lastInitializedRound_lte?: InputMaybe<Scalars['String']>;
  lastInitializedRound_in?: InputMaybe<Array<Scalars['String']>>;
  lastInitializedRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastInitializedRound_contains?: InputMaybe<Scalars['String']>;
  lastInitializedRound_contains_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_contains?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_starts_with?: InputMaybe<Scalars['String']>;
  lastInitializedRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_starts_with?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_ends_with?: InputMaybe<Scalars['String']>;
  lastInitializedRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_ends_with?: InputMaybe<Scalars['String']>;
  lastInitializedRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastInitializedRound_?: InputMaybe<Round_filter>;
  lastRoundLengthUpdateRound?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_gt?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_lt?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_gte?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_lte?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_in?: InputMaybe<Array<Scalars['String']>>;
  lastRoundLengthUpdateRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastRoundLengthUpdateRound_contains?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_contains_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_contains?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_starts_with?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_starts_with?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_ends_with?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_ends_with?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastRoundLengthUpdateRound_?: InputMaybe<Round_filter>;
  roundLength?: InputMaybe<Scalars['BigInt']>;
  roundLength_not?: InputMaybe<Scalars['BigInt']>;
  roundLength_gt?: InputMaybe<Scalars['BigInt']>;
  roundLength_lt?: InputMaybe<Scalars['BigInt']>;
  roundLength_gte?: InputMaybe<Scalars['BigInt']>;
  roundLength_lte?: InputMaybe<Scalars['BigInt']>;
  roundLength_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roundLength_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRoundLengthUpdateStartBlock?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_not?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_gt?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_lt?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_gte?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_lte?: InputMaybe<Scalars['BigInt']>;
  lastRoundLengthUpdateStartBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastRoundLengthUpdateStartBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  winningTicketCount?: InputMaybe<Scalars['Int']>;
  winningTicketCount_not?: InputMaybe<Scalars['Int']>;
  winningTicketCount_gt?: InputMaybe<Scalars['Int']>;
  winningTicketCount_lt?: InputMaybe<Scalars['Int']>;
  winningTicketCount_gte?: InputMaybe<Scalars['Int']>;
  winningTicketCount_lte?: InputMaybe<Scalars['Int']>;
  winningTicketCount_in?: InputMaybe<Array<Scalars['Int']>>;
  winningTicketCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  roundCount?: InputMaybe<Scalars['Int']>;
  roundCount_not?: InputMaybe<Scalars['Int']>;
  roundCount_gt?: InputMaybe<Scalars['Int']>;
  roundCount_lt?: InputMaybe<Scalars['Int']>;
  roundCount_gte?: InputMaybe<Scalars['Int']>;
  roundCount_lte?: InputMaybe<Scalars['Int']>;
  roundCount_in?: InputMaybe<Array<Scalars['Int']>>;
  roundCount_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pendingActivation?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_not?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_contains?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_not_contains?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pendingActivation_?: InputMaybe<Transcoder_filter>;
  pendingDeactivation?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_not?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_contains?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_not_contains?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  pendingDeactivation_?: InputMaybe<Transcoder_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Protocol_orderBy =
  | 'id'
  | 'inflation'
  | 'inflationChange'
  | 'maxEarningsClaimsRounds'
  | 'numActiveTranscoders'
  | 'paused'
  | 'targetBondingRate'
  | 'unbondingPeriod'
  | 'lockPeriod'
  | 'roundLockAmount'
  | 'totalActiveStake'
  | 'totalVolumeETH'
  | 'totalVolumeUSD'
  | 'participationRate'
  | 'currentRound'
  | 'lastInitializedRound'
  | 'lastRoundLengthUpdateRound'
  | 'roundLength'
  | 'lastRoundLengthUpdateStartBlock'
  | 'totalSupply'
  | 'winningTicketCount'
  | 'roundCount'
  | 'pendingActivation'
  | 'pendingDeactivation';

/**
 * RebondEvent entities are created for every emitted Rebond event.
 *
 */
export type RebondEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegator that rebonded */
  delegator: Delegator;
  delegate: Transcoder;
  amount: Scalars['BigDecimal'];
  unbondingLockId: Scalars['Int'];
};

export type RebondEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  unbondingLockId?: InputMaybe<Scalars['Int']>;
  unbondingLockId_not?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_in?: InputMaybe<Array<Scalars['Int']>>;
  unbondingLockId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type RebondEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegator'
  | 'delegate'
  | 'amount'
  | 'unbondingLockId';

/**
 * ReserveClaimedEvent entities are created for every emitted ReserveClaimed event.
 *
 */
export type ReserveClaimedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the reserve holder */
  reserveHolder: Broadcaster;
  /** Reference to the claimant */
  claimant: Transcoder;
  /** Amount of funds claimed by claimant from the reserve for the reserve holder */
  amount: Scalars['BigDecimal'];
};

export type ReserveClaimedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  reserveHolder?: InputMaybe<Scalars['String']>;
  reserveHolder_not?: InputMaybe<Scalars['String']>;
  reserveHolder_gt?: InputMaybe<Scalars['String']>;
  reserveHolder_lt?: InputMaybe<Scalars['String']>;
  reserveHolder_gte?: InputMaybe<Scalars['String']>;
  reserveHolder_lte?: InputMaybe<Scalars['String']>;
  reserveHolder_in?: InputMaybe<Array<Scalars['String']>>;
  reserveHolder_not_in?: InputMaybe<Array<Scalars['String']>>;
  reserveHolder_contains?: InputMaybe<Scalars['String']>;
  reserveHolder_contains_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_contains?: InputMaybe<Scalars['String']>;
  reserveHolder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_starts_with?: InputMaybe<Scalars['String']>;
  reserveHolder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_starts_with?: InputMaybe<Scalars['String']>;
  reserveHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_ends_with?: InputMaybe<Scalars['String']>;
  reserveHolder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_ends_with?: InputMaybe<Scalars['String']>;
  reserveHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_?: InputMaybe<Broadcaster_filter>;
  claimant?: InputMaybe<Scalars['String']>;
  claimant_not?: InputMaybe<Scalars['String']>;
  claimant_gt?: InputMaybe<Scalars['String']>;
  claimant_lt?: InputMaybe<Scalars['String']>;
  claimant_gte?: InputMaybe<Scalars['String']>;
  claimant_lte?: InputMaybe<Scalars['String']>;
  claimant_in?: InputMaybe<Array<Scalars['String']>>;
  claimant_not_in?: InputMaybe<Array<Scalars['String']>>;
  claimant_contains?: InputMaybe<Scalars['String']>;
  claimant_contains_nocase?: InputMaybe<Scalars['String']>;
  claimant_not_contains?: InputMaybe<Scalars['String']>;
  claimant_not_contains_nocase?: InputMaybe<Scalars['String']>;
  claimant_starts_with?: InputMaybe<Scalars['String']>;
  claimant_starts_with_nocase?: InputMaybe<Scalars['String']>;
  claimant_not_starts_with?: InputMaybe<Scalars['String']>;
  claimant_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  claimant_ends_with?: InputMaybe<Scalars['String']>;
  claimant_ends_with_nocase?: InputMaybe<Scalars['String']>;
  claimant_not_ends_with?: InputMaybe<Scalars['String']>;
  claimant_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  claimant_?: InputMaybe<Transcoder_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ReserveClaimedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'reserveHolder'
  | 'claimant'
  | 'amount';

/**
 * ReserveFundedEvent entities are created for every emitted ReserveFunded event.
 *
 */
export type ReserveFundedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to reserve holder */
  reserveHolder: Broadcaster;
  /** Amount of funds added to reserve */
  amount: Scalars['BigDecimal'];
};

export type ReserveFundedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  reserveHolder?: InputMaybe<Scalars['String']>;
  reserveHolder_not?: InputMaybe<Scalars['String']>;
  reserveHolder_gt?: InputMaybe<Scalars['String']>;
  reserveHolder_lt?: InputMaybe<Scalars['String']>;
  reserveHolder_gte?: InputMaybe<Scalars['String']>;
  reserveHolder_lte?: InputMaybe<Scalars['String']>;
  reserveHolder_in?: InputMaybe<Array<Scalars['String']>>;
  reserveHolder_not_in?: InputMaybe<Array<Scalars['String']>>;
  reserveHolder_contains?: InputMaybe<Scalars['String']>;
  reserveHolder_contains_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_contains?: InputMaybe<Scalars['String']>;
  reserveHolder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_starts_with?: InputMaybe<Scalars['String']>;
  reserveHolder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_starts_with?: InputMaybe<Scalars['String']>;
  reserveHolder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_ends_with?: InputMaybe<Scalars['String']>;
  reserveHolder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_not_ends_with?: InputMaybe<Scalars['String']>;
  reserveHolder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  reserveHolder_?: InputMaybe<Broadcaster_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ReserveFundedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'reserveHolder'
  | 'amount';

/**
 * RewardEvent entities are created for every emitted Reward event.
 *
 */
export type RewardEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Amount of inflationary token rewards claimed */
  rewardTokens: Scalars['BigDecimal'];
  /** Reference to the delegate that claimed its inflationary token reward */
  delegate: Transcoder;
};

export type RewardEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  rewardTokens?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_not?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lt?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_gte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_lte?: InputMaybe<Scalars['BigDecimal']>;
  rewardTokens_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rewardTokens_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type RewardEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'rewardTokens'
  | 'delegate';

/**
 * The Livepeer protocol is round based and each round is represented by some number of Ethereum blocks.
 *
 */
export type Round = {
  /** Round number */
  id: Scalars['ID'];
  /** Whether the round was initialized */
  initialized: Scalars['Boolean'];
  /** Number of blocks this round lasts for */
  length: Scalars['BigInt'];
  /** Start block for the round */
  startBlock: Scalars['BigInt'];
  /** End block for the round */
  endBlock: Scalars['BigInt'];
  /** Pools associated with the round */
  pools?: Maybe<Array<Pool>>;
  /** Mintable tokens for the round */
  mintableTokens: Scalars['BigDecimal'];
  /** Fees generated this round in ETH */
  volumeETH: Scalars['BigDecimal'];
  /** Fees generated this round in USD */
  volumeUSD: Scalars['BigDecimal'];
  /** Total active stake during the round */
  totalActiveStake: Scalars['BigDecimal'];
  /** Total Livepeer token supply during the round */
  totalSupply: Scalars['BigDecimal'];
  /** Participation rate during the round (totalActiveStake/totalSupply) */
  participationRate: Scalars['BigDecimal'];
  /** Total stake moved from one delegate to another during the round */
  movedStake: Scalars['BigDecimal'];
  /** Total amount of new stake introduced during the round */
  newStake: Scalars['BigDecimal'];
};


/**
 * The Livepeer protocol is round based and each round is represented by some number of Ethereum blocks.
 *
 */
export type RoundpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
};

export type Round_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  initialized?: InputMaybe<Scalars['Boolean']>;
  initialized_not?: InputMaybe<Scalars['Boolean']>;
  initialized_in?: InputMaybe<Array<Scalars['Boolean']>>;
  initialized_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  length?: InputMaybe<Scalars['BigInt']>;
  length_not?: InputMaybe<Scalars['BigInt']>;
  length_gt?: InputMaybe<Scalars['BigInt']>;
  length_lt?: InputMaybe<Scalars['BigInt']>;
  length_gte?: InputMaybe<Scalars['BigInt']>;
  length_lte?: InputMaybe<Scalars['BigInt']>;
  length_in?: InputMaybe<Array<Scalars['BigInt']>>;
  length_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock?: InputMaybe<Scalars['BigInt']>;
  startBlock_not?: InputMaybe<Scalars['BigInt']>;
  startBlock_gt?: InputMaybe<Scalars['BigInt']>;
  startBlock_lt?: InputMaybe<Scalars['BigInt']>;
  startBlock_gte?: InputMaybe<Scalars['BigInt']>;
  startBlock_lte?: InputMaybe<Scalars['BigInt']>;
  startBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  startBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock?: InputMaybe<Scalars['BigInt']>;
  endBlock_not?: InputMaybe<Scalars['BigInt']>;
  endBlock_gt?: InputMaybe<Scalars['BigInt']>;
  endBlock_lt?: InputMaybe<Scalars['BigInt']>;
  endBlock_gte?: InputMaybe<Scalars['BigInt']>;
  endBlock_lte?: InputMaybe<Scalars['BigInt']>;
  endBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  endBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pools_?: InputMaybe<Pool_filter>;
  mintableTokens?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_not?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_gt?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_lt?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_gte?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_lte?: InputMaybe<Scalars['BigDecimal']>;
  mintableTokens_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  mintableTokens_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalActiveStake?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_not?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalActiveStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalActiveStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_not?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lt?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_gte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_lte?: InputMaybe<Scalars['BigDecimal']>;
  participationRate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  participationRate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  movedStake?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_not?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  movedStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  movedStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  newStake?: InputMaybe<Scalars['BigDecimal']>;
  newStake_not?: InputMaybe<Scalars['BigDecimal']>;
  newStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  newStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  newStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  newStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  newStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  newStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Round_orderBy =
  | 'id'
  | 'initialized'
  | 'length'
  | 'startBlock'
  | 'endBlock'
  | 'pools'
  | 'mintableTokens'
  | 'volumeETH'
  | 'volumeUSD'
  | 'totalActiveStake'
  | 'totalSupply'
  | 'participationRate'
  | 'movedStake'
  | 'newStake';

/**
 * ServiceURIUpdateEvent entities are created for every emitted ServiceURIUpdate event.
 *
 */
export type ServiceURIUpdateEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Address of sender */
  addr: Scalars['String'];
  /** Service URI endpoint for the caller */
  serviceURI: Scalars['String'];
};

export type ServiceURIUpdateEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  addr?: InputMaybe<Scalars['String']>;
  addr_not?: InputMaybe<Scalars['String']>;
  addr_gt?: InputMaybe<Scalars['String']>;
  addr_lt?: InputMaybe<Scalars['String']>;
  addr_gte?: InputMaybe<Scalars['String']>;
  addr_lte?: InputMaybe<Scalars['String']>;
  addr_in?: InputMaybe<Array<Scalars['String']>>;
  addr_not_in?: InputMaybe<Array<Scalars['String']>>;
  addr_contains?: InputMaybe<Scalars['String']>;
  addr_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_not_contains?: InputMaybe<Scalars['String']>;
  addr_not_contains_nocase?: InputMaybe<Scalars['String']>;
  addr_starts_with?: InputMaybe<Scalars['String']>;
  addr_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addr_not_starts_with?: InputMaybe<Scalars['String']>;
  addr_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addr_ends_with?: InputMaybe<Scalars['String']>;
  addr_ends_with_nocase?: InputMaybe<Scalars['String']>;
  addr_not_ends_with?: InputMaybe<Scalars['String']>;
  addr_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI?: InputMaybe<Scalars['String']>;
  serviceURI_not?: InputMaybe<Scalars['String']>;
  serviceURI_gt?: InputMaybe<Scalars['String']>;
  serviceURI_lt?: InputMaybe<Scalars['String']>;
  serviceURI_gte?: InputMaybe<Scalars['String']>;
  serviceURI_lte?: InputMaybe<Scalars['String']>;
  serviceURI_in?: InputMaybe<Array<Scalars['String']>>;
  serviceURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  serviceURI_contains?: InputMaybe<Scalars['String']>;
  serviceURI_contains_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_contains?: InputMaybe<Scalars['String']>;
  serviceURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_starts_with?: InputMaybe<Scalars['String']>;
  serviceURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_starts_with?: InputMaybe<Scalars['String']>;
  serviceURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_ends_with?: InputMaybe<Scalars['String']>;
  serviceURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_ends_with?: InputMaybe<Scalars['String']>;
  serviceURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type ServiceURIUpdateEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'addr'
  | 'serviceURI';

/**
 * SetCurrentRewardTokensEvent entities are created for every emitted SetCurrentRewardTokens event.
 *
 */
export type SetCurrentRewardTokensEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Number of mintable tokens for the round */
  currentMintableTokens: Scalars['BigDecimal'];
  /** Current inflation during the round */
  currentInflation: Scalars['BigInt'];
};

export type SetCurrentRewardTokensEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  currentMintableTokens?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_not?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_gt?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_lt?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_gte?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_lte?: InputMaybe<Scalars['BigDecimal']>;
  currentMintableTokens_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentMintableTokens_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentInflation?: InputMaybe<Scalars['BigInt']>;
  currentInflation_not?: InputMaybe<Scalars['BigInt']>;
  currentInflation_gt?: InputMaybe<Scalars['BigInt']>;
  currentInflation_lt?: InputMaybe<Scalars['BigInt']>;
  currentInflation_gte?: InputMaybe<Scalars['BigInt']>;
  currentInflation_lte?: InputMaybe<Scalars['BigInt']>;
  currentInflation_in?: InputMaybe<Array<Scalars['BigInt']>>;
  currentInflation_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SetCurrentRewardTokensEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'currentMintableTokens'
  | 'currentInflation';

/**
 * Transaction entities are created for each Ethereum transaction that contains an interaction within Livepeer contracts.
 *
 */
export type Transaction = {
  /** Ethereum transaction hash */
  id: Scalars['ID'];
  /** Block transaction was mined in */
  blockNumber: Scalars['BigInt'];
  /** Timestamp for transaction */
  timestamp: Scalars['Int'];
  /** Amount of gas used in the transaction */
  gasUsed: Scalars['BigInt'];
  /** Cost per unit of gas specified for the transaction */
  gasPrice: Scalars['BigInt'];
  /** The sending party of the transaction */
  from: Scalars['String'];
  /** The receiving party of the transaction */
  to: Scalars['String'];
  /** The events emitted within this transaction */
  events?: Maybe<Array<Event>>;
};


/**
 * Transaction entities are created for each Ethereum transaction that contains an interaction within Livepeer contracts.
 *
 */
export type TransactioneventsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Event_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Event_filter>;
};

export type Transaction_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  gasUsed?: InputMaybe<Scalars['BigInt']>;
  gasUsed_not?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lt?: InputMaybe<Scalars['BigInt']>;
  gasUsed_gte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_lte?: InputMaybe<Scalars['BigInt']>;
  gasUsed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasUsed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice?: InputMaybe<Scalars['BigInt']>;
  gasPrice_not?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lt?: InputMaybe<Scalars['BigInt']>;
  gasPrice_gte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_lte?: InputMaybe<Scalars['BigInt']>;
  gasPrice_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasPrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['String']>;
  from_not?: InputMaybe<Scalars['String']>;
  from_gt?: InputMaybe<Scalars['String']>;
  from_lt?: InputMaybe<Scalars['String']>;
  from_gte?: InputMaybe<Scalars['String']>;
  from_lte?: InputMaybe<Scalars['String']>;
  from_in?: InputMaybe<Array<Scalars['String']>>;
  from_not_in?: InputMaybe<Array<Scalars['String']>>;
  from_contains?: InputMaybe<Scalars['String']>;
  from_contains_nocase?: InputMaybe<Scalars['String']>;
  from_not_contains?: InputMaybe<Scalars['String']>;
  from_not_contains_nocase?: InputMaybe<Scalars['String']>;
  from_starts_with?: InputMaybe<Scalars['String']>;
  from_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_starts_with?: InputMaybe<Scalars['String']>;
  from_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  from_ends_with?: InputMaybe<Scalars['String']>;
  from_ends_with_nocase?: InputMaybe<Scalars['String']>;
  from_not_ends_with?: InputMaybe<Scalars['String']>;
  from_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
  to_not?: InputMaybe<Scalars['String']>;
  to_gt?: InputMaybe<Scalars['String']>;
  to_lt?: InputMaybe<Scalars['String']>;
  to_gte?: InputMaybe<Scalars['String']>;
  to_lte?: InputMaybe<Scalars['String']>;
  to_in?: InputMaybe<Array<Scalars['String']>>;
  to_not_in?: InputMaybe<Array<Scalars['String']>>;
  to_contains?: InputMaybe<Scalars['String']>;
  to_contains_nocase?: InputMaybe<Scalars['String']>;
  to_not_contains?: InputMaybe<Scalars['String']>;
  to_not_contains_nocase?: InputMaybe<Scalars['String']>;
  to_starts_with?: InputMaybe<Scalars['String']>;
  to_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_starts_with?: InputMaybe<Scalars['String']>;
  to_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  to_ends_with?: InputMaybe<Scalars['String']>;
  to_ends_with_nocase?: InputMaybe<Scalars['String']>;
  to_not_ends_with?: InputMaybe<Scalars['String']>;
  to_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Transaction_orderBy =
  | 'id'
  | 'blockNumber'
  | 'timestamp'
  | 'gasUsed'
  | 'gasPrice'
  | 'from'
  | 'to'
  | 'events';

/**
 * Perform transcoding work for the network. The transcoders with the most delegated stake are elected as active transcoders that process transcode jobs for the network.
 *
 */
export type Transcoder = {
  /** Transcoder's ETH address */
  id: Scalars['ID'];
  /** Round in which the transcoder became active - 0 if inactive */
  activationRound: Scalars['BigInt'];
  /** Round in which the transcoder will become inactive */
  deactivationRound: Scalars['BigInt'];
  /** Round for which the stake was last updated while the transcoder is active */
  lastActiveStakeUpdateRound: Scalars['BigInt'];
  /** Whether or not the transcoder is active */
  active: Scalars['Boolean'];
  /** Status of the transcoder */
  status: TranscoderStatus;
  /** Last round that the transcoder called reward */
  lastRewardRound?: Maybe<Round>;
  /** % of block reward cut paid to transcoder by a delegator */
  rewardCut: Scalars['BigInt'];
  /** % of fees paid to delegators by transcoder */
  feeShare: Scalars['BigInt'];
  /** Price per segment for a stream */
  pricePerSegment?: Maybe<Scalars['BigInt']>;
  /** Pending price per segment for next round if the transcoder is active */
  pendingPricePerSegment?: Maybe<Scalars['BigInt']>;
  /** Pending block reward cut for next round if the transcoder is active */
  pendingRewardCut?: Maybe<Scalars['BigInt']>;
  /** Pending fee share for next round if the transcoder is active */
  pendingFeeShare?: Maybe<Scalars['BigInt']>;
  /** Total tokens delegated toward a transcoder (including their own) */
  totalStake: Scalars['BigDecimal'];
  /** Total fees generated by the transcoder in ETH (before distribution to delegators) */
  totalVolumeETH: Scalars['BigDecimal'];
  /** Total fees generated by the transcoder in USD (before distribution to delegators) */
  totalVolumeUSD: Scalars['BigDecimal'];
  /** Pools associated with the transcoder */
  pools?: Maybe<Array<Pool>>;
  /** Delegators bonded to the transcoder */
  delegators?: Maybe<Array<Delegator>>;
  /** Delegator that registered this transcoder */
  delegator?: Maybe<Delegator>;
  /** Service URI endpoint that can be used to send off-chain requests */
  serviceURI?: Maybe<Scalars['String']>;
};


/**
 * Perform transcoding work for the network. The transcoders with the most delegated stake are elected as active transcoders that process transcode jobs for the network.
 *
 */
export type TranscoderpoolsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Pool_filter>;
};


/**
 * Perform transcoding work for the network. The transcoders with the most delegated stake are elected as active transcoders that process transcode jobs for the network.
 *
 */
export type TranscoderdelegatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegator_filter>;
};

/**
 * TranscoderActivatedEvent entities are created for every emitted TranscoderActivated event.
 *
 */
export type TranscoderActivatedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that will be active */
  delegate: Transcoder;
  /** Future round in which the delegate will become active */
  activationRound: Scalars['BigInt'];
};

export type TranscoderActivatedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  activationRound?: InputMaybe<Scalars['BigInt']>;
  activationRound_not?: InputMaybe<Scalars['BigInt']>;
  activationRound_gt?: InputMaybe<Scalars['BigInt']>;
  activationRound_lt?: InputMaybe<Scalars['BigInt']>;
  activationRound_gte?: InputMaybe<Scalars['BigInt']>;
  activationRound_lte?: InputMaybe<Scalars['BigInt']>;
  activationRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activationRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderActivatedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate'
  | 'activationRound';

/**
 * Transcoder data accumulated and condensed into day stats
 *
 */
export type TranscoderDay = {
  /** Combination of the transcoder address and the timestamp rounded to current day by dividing by 86400 */
  id: Scalars['ID'];
  /** The date beginning at 12:00am UTC */
  date: Scalars['Int'];
  /** Fees generated this day in ETH */
  volumeETH: Scalars['BigDecimal'];
  /** Fees generated this day in USD */
  volumeUSD: Scalars['BigDecimal'];
  /** Transcoder associated with the day */
  transcoder: Transcoder;
};

export type TranscoderDay_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  date?: InputMaybe<Scalars['Int']>;
  date_not?: InputMaybe<Scalars['Int']>;
  date_gt?: InputMaybe<Scalars['Int']>;
  date_lt?: InputMaybe<Scalars['Int']>;
  date_gte?: InputMaybe<Scalars['Int']>;
  date_lte?: InputMaybe<Scalars['Int']>;
  date_in?: InputMaybe<Array<Scalars['Int']>>;
  date_not_in?: InputMaybe<Array<Scalars['Int']>>;
  volumeETH?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  volumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  transcoder?: InputMaybe<Scalars['String']>;
  transcoder_not?: InputMaybe<Scalars['String']>;
  transcoder_gt?: InputMaybe<Scalars['String']>;
  transcoder_lt?: InputMaybe<Scalars['String']>;
  transcoder_gte?: InputMaybe<Scalars['String']>;
  transcoder_lte?: InputMaybe<Scalars['String']>;
  transcoder_in?: InputMaybe<Array<Scalars['String']>>;
  transcoder_not_in?: InputMaybe<Array<Scalars['String']>>;
  transcoder_contains?: InputMaybe<Scalars['String']>;
  transcoder_contains_nocase?: InputMaybe<Scalars['String']>;
  transcoder_not_contains?: InputMaybe<Scalars['String']>;
  transcoder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transcoder_starts_with?: InputMaybe<Scalars['String']>;
  transcoder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transcoder_not_starts_with?: InputMaybe<Scalars['String']>;
  transcoder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transcoder_ends_with?: InputMaybe<Scalars['String']>;
  transcoder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transcoder_not_ends_with?: InputMaybe<Scalars['String']>;
  transcoder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transcoder_?: InputMaybe<Transcoder_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderDay_orderBy =
  | 'id'
  | 'date'
  | 'volumeETH'
  | 'volumeUSD'
  | 'transcoder';

/**
 * TranscoderDeactivatedEvent entities are created for every emitted TranscoderDeactivated event.
 *
 */
export type TranscoderDeactivatedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that will become deactive */
  delegate: Transcoder;
  /** Future round in which the delegate will become deactive */
  deactivationRound: Scalars['BigInt'];
};

export type TranscoderDeactivatedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  deactivationRound?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_not?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_gt?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_lt?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_gte?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_lte?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deactivationRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderDeactivatedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate'
  | 'deactivationRound';

/**
 * TranscoderEvictedEvent entities are created for every emitted TranscoderEvicted event.
 *
 */
export type TranscoderEvictedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that was evicted */
  delegate: Transcoder;
};

export type TranscoderEvictedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderEvictedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate';

/**
 * TranscoderResignedEvent entities are created for every emitted TranscoderResigned event.
 *
 */
export type TranscoderResignedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that resigned */
  delegate: Transcoder;
};

export type TranscoderResignedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderResignedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate';

/**
 * TranscoderSlashedEvent entities are created for every emitted TranscoderSlashed event.
 *
 */
export type TranscoderSlashedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that was slashed */
  delegate: Transcoder;
  /** Finder that proved a transcoder violated a slashing condition. Null address if there is no finder */
  finder: Scalars['Bytes'];
  /** Percentage of transcoder bond to be slashed */
  penalty: Scalars['BigDecimal'];
  /** Percentage of penalty awarded to finder. Zero if there is no finder */
  finderReward: Scalars['BigInt'];
};

export type TranscoderSlashedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  finder?: InputMaybe<Scalars['Bytes']>;
  finder_not?: InputMaybe<Scalars['Bytes']>;
  finder_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finder_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  finder_contains?: InputMaybe<Scalars['Bytes']>;
  finder_not_contains?: InputMaybe<Scalars['Bytes']>;
  penalty?: InputMaybe<Scalars['BigDecimal']>;
  penalty_not?: InputMaybe<Scalars['BigDecimal']>;
  penalty_gt?: InputMaybe<Scalars['BigDecimal']>;
  penalty_lt?: InputMaybe<Scalars['BigDecimal']>;
  penalty_gte?: InputMaybe<Scalars['BigDecimal']>;
  penalty_lte?: InputMaybe<Scalars['BigDecimal']>;
  penalty_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  penalty_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  finderReward?: InputMaybe<Scalars['BigInt']>;
  finderReward_not?: InputMaybe<Scalars['BigInt']>;
  finderReward_gt?: InputMaybe<Scalars['BigInt']>;
  finderReward_lt?: InputMaybe<Scalars['BigInt']>;
  finderReward_gte?: InputMaybe<Scalars['BigInt']>;
  finderReward_lte?: InputMaybe<Scalars['BigInt']>;
  finderReward_in?: InputMaybe<Array<Scalars['BigInt']>>;
  finderReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderSlashedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate'
  | 'finder'
  | 'penalty'
  | 'finderReward';

export type TranscoderStatus =
  | 'NotRegistered'
  | 'Registered';

/**
 * TranscoderUpdateEvent entities are created for every emitted TranscoderUpdate event.
 *
 */
export type TranscoderUpdateEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegate that was updated */
  delegate: Transcoder;
  /** Delegate's updated reward cut */
  rewardCut: Scalars['BigInt'];
  /** Delegate's updated fee share */
  feeShare: Scalars['BigInt'];
};

export type TranscoderUpdateEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  rewardCut?: InputMaybe<Scalars['BigInt']>;
  rewardCut_not?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare?: InputMaybe<Scalars['BigInt']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']>;
  feeShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type TranscoderUpdateEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegate'
  | 'rewardCut'
  | 'feeShare';

export type Transcoder_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  activationRound?: InputMaybe<Scalars['BigInt']>;
  activationRound_not?: InputMaybe<Scalars['BigInt']>;
  activationRound_gt?: InputMaybe<Scalars['BigInt']>;
  activationRound_lt?: InputMaybe<Scalars['BigInt']>;
  activationRound_gte?: InputMaybe<Scalars['BigInt']>;
  activationRound_lte?: InputMaybe<Scalars['BigInt']>;
  activationRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  activationRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deactivationRound?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_not?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_gt?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_lt?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_gte?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_lte?: InputMaybe<Scalars['BigInt']>;
  deactivationRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deactivationRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastActiveStakeUpdateRound?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_not?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_gt?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_lt?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_gte?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_lte?: InputMaybe<Scalars['BigInt']>;
  lastActiveStakeUpdateRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  lastActiveStakeUpdateRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  active?: InputMaybe<Scalars['Boolean']>;
  active_not?: InputMaybe<Scalars['Boolean']>;
  active_in?: InputMaybe<Array<Scalars['Boolean']>>;
  active_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  status?: InputMaybe<TranscoderStatus>;
  status_not?: InputMaybe<TranscoderStatus>;
  status_in?: InputMaybe<Array<TranscoderStatus>>;
  status_not_in?: InputMaybe<Array<TranscoderStatus>>;
  lastRewardRound?: InputMaybe<Scalars['String']>;
  lastRewardRound_not?: InputMaybe<Scalars['String']>;
  lastRewardRound_gt?: InputMaybe<Scalars['String']>;
  lastRewardRound_lt?: InputMaybe<Scalars['String']>;
  lastRewardRound_gte?: InputMaybe<Scalars['String']>;
  lastRewardRound_lte?: InputMaybe<Scalars['String']>;
  lastRewardRound_in?: InputMaybe<Array<Scalars['String']>>;
  lastRewardRound_not_in?: InputMaybe<Array<Scalars['String']>>;
  lastRewardRound_contains?: InputMaybe<Scalars['String']>;
  lastRewardRound_contains_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_contains?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_contains_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_starts_with?: InputMaybe<Scalars['String']>;
  lastRewardRound_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_starts_with?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_ends_with?: InputMaybe<Scalars['String']>;
  lastRewardRound_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_ends_with?: InputMaybe<Scalars['String']>;
  lastRewardRound_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  lastRewardRound_?: InputMaybe<Round_filter>;
  rewardCut?: InputMaybe<Scalars['BigInt']>;
  rewardCut_not?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lt?: InputMaybe<Scalars['BigInt']>;
  rewardCut_gte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_lte?: InputMaybe<Scalars['BigInt']>;
  rewardCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  rewardCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare?: InputMaybe<Scalars['BigInt']>;
  feeShare_not?: InputMaybe<Scalars['BigInt']>;
  feeShare_gt?: InputMaybe<Scalars['BigInt']>;
  feeShare_lt?: InputMaybe<Scalars['BigInt']>;
  feeShare_gte?: InputMaybe<Scalars['BigInt']>;
  feeShare_lte?: InputMaybe<Scalars['BigInt']>;
  feeShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pricePerSegment?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_not?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_gt?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_lt?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_gte?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_lte?: InputMaybe<Scalars['BigInt']>;
  pricePerSegment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pricePerSegment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingPricePerSegment?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_not?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_gt?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_lt?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_gte?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_lte?: InputMaybe<Scalars['BigInt']>;
  pendingPricePerSegment_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingPricePerSegment_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRewardCut?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_not?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_gt?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_lt?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_gte?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_lte?: InputMaybe<Scalars['BigInt']>;
  pendingRewardCut_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingRewardCut_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingFeeShare?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_not?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_gt?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_lt?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_gte?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_lte?: InputMaybe<Scalars['BigInt']>;
  pendingFeeShare_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pendingFeeShare_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalStake?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_not?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeETH_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeETH_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  pools_?: InputMaybe<Pool_filter>;
  delegators_?: InputMaybe<Delegator_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  serviceURI?: InputMaybe<Scalars['String']>;
  serviceURI_not?: InputMaybe<Scalars['String']>;
  serviceURI_gt?: InputMaybe<Scalars['String']>;
  serviceURI_lt?: InputMaybe<Scalars['String']>;
  serviceURI_gte?: InputMaybe<Scalars['String']>;
  serviceURI_lte?: InputMaybe<Scalars['String']>;
  serviceURI_in?: InputMaybe<Array<Scalars['String']>>;
  serviceURI_not_in?: InputMaybe<Array<Scalars['String']>>;
  serviceURI_contains?: InputMaybe<Scalars['String']>;
  serviceURI_contains_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_contains?: InputMaybe<Scalars['String']>;
  serviceURI_not_contains_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_starts_with?: InputMaybe<Scalars['String']>;
  serviceURI_starts_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_starts_with?: InputMaybe<Scalars['String']>;
  serviceURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_ends_with?: InputMaybe<Scalars['String']>;
  serviceURI_ends_with_nocase?: InputMaybe<Scalars['String']>;
  serviceURI_not_ends_with?: InputMaybe<Scalars['String']>;
  serviceURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Transcoder_orderBy =
  | 'id'
  | 'activationRound'
  | 'deactivationRound'
  | 'lastActiveStakeUpdateRound'
  | 'active'
  | 'status'
  | 'lastRewardRound'
  | 'rewardCut'
  | 'feeShare'
  | 'pricePerSegment'
  | 'pendingPricePerSegment'
  | 'pendingRewardCut'
  | 'pendingFeeShare'
  | 'totalStake'
  | 'totalVolumeETH'
  | 'totalVolumeUSD'
  | 'pools'
  | 'delegators'
  | 'delegator'
  | 'serviceURI';

/**
 * UnbondEvent entities are created for every emitted Unbond event.
 *
 */
export type UnbondEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Amount unbonded in the transaction */
  amount: Scalars['BigDecimal'];
  /** The future round in which the Delegator may withdraw its unbonded stake */
  withdrawRound: Scalars['BigInt'];
  /** The unbonding lock ID associated with this transaction, used to optionally rebond the amount */
  unbondingLockId?: Maybe<Scalars['Int']>;
  /** Reference to the delegate unbonded from */
  delegate: Transcoder;
  /** Reference to the Delegator that unbonded */
  delegator: Delegator;
};

export type UnbondEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  withdrawRound?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_not?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_gt?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_lt?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_gte?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_lte?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  unbondingLockId?: InputMaybe<Scalars['Int']>;
  unbondingLockId_not?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_in?: InputMaybe<Array<Scalars['Int']>>;
  unbondingLockId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type UnbondEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'amount'
  | 'withdrawRound'
  | 'unbondingLockId'
  | 'delegate'
  | 'delegator';

/**
 * Get an unbonding lock for a delegator
 *
 */
export type UnbondingLock = {
  /** Unique unlock identifer */
  id: Scalars['ID'];
  /** unbonding lock id */
  unbondingLockId: Scalars['Int'];
  /** Delegator address this lock belongs to */
  delegator: Delegator;
  /** Address of delegate unbonding from */
  delegate: Transcoder;
  /** Amount being unbonded */
  amount: Scalars['BigDecimal'];
  /** Round number when the unbonding amount will be available for withdrawal */
  withdrawRound: Scalars['BigInt'];
};

export type UnbondingLock_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  unbondingLockId?: InputMaybe<Scalars['Int']>;
  unbondingLockId_not?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_in?: InputMaybe<Array<Scalars['Int']>>;
  unbondingLockId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  delegate?: InputMaybe<Scalars['String']>;
  delegate_not?: InputMaybe<Scalars['String']>;
  delegate_gt?: InputMaybe<Scalars['String']>;
  delegate_lt?: InputMaybe<Scalars['String']>;
  delegate_gte?: InputMaybe<Scalars['String']>;
  delegate_lte?: InputMaybe<Scalars['String']>;
  delegate_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegate_contains?: InputMaybe<Scalars['String']>;
  delegate_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_contains?: InputMaybe<Scalars['String']>;
  delegate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegate_starts_with?: InputMaybe<Scalars['String']>;
  delegate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with?: InputMaybe<Scalars['String']>;
  delegate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_ends_with?: InputMaybe<Scalars['String']>;
  delegate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with?: InputMaybe<Scalars['String']>;
  delegate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegate_?: InputMaybe<Transcoder_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  withdrawRound?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_not?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_gt?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_lt?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_gte?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_lte?: InputMaybe<Scalars['BigInt']>;
  withdrawRound_in?: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawRound_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type UnbondingLock_orderBy =
  | 'id'
  | 'unbondingLockId'
  | 'delegator'
  | 'delegate'
  | 'amount'
  | 'withdrawRound';

/**
 * UnpauseEvent entities are created for every emitted Unpause event.
 *
 */
export type UnpauseEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
};

export type UnpauseEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type UnpauseEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round';

/**
 * Vote data
 *
 */
export type Vote = {
  /** Voter address + poll address */
  id: Scalars['ID'];
  /** Vote caster */
  voter: Scalars['String'];
  /** Stake weighted vote */
  voteStake?: Maybe<Scalars['BigDecimal']>;
  /** This will be non-zero if voter is an transcoder and any of the its delegators voted */
  nonVoteStake?: Maybe<Scalars['BigDecimal']>;
  /** Vote choice */
  choiceID?: Maybe<PollChoice>;
  /** Poll associated with this vote */
  poll?: Maybe<Poll>;
  /** True if the voter was a registered transcoder during the poll period */
  registeredTranscoder?: Maybe<Scalars['Boolean']>;
};

/**
 * VoteEvent entities are created for every emitted Vote event.
 *
 */
export type VoteEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Address belonging to the voter */
  voter: Scalars['String'];
  /** Voter choice. Zero means yes and one means no */
  choiceID: Scalars['BigInt'];
  /** Reference to the poll this vote was casted in */
  poll: Poll;
};

export type VoteEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  voter?: InputMaybe<Scalars['String']>;
  voter_not?: InputMaybe<Scalars['String']>;
  voter_gt?: InputMaybe<Scalars['String']>;
  voter_lt?: InputMaybe<Scalars['String']>;
  voter_gte?: InputMaybe<Scalars['String']>;
  voter_lte?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<Scalars['String']>>;
  voter_not_in?: InputMaybe<Array<Scalars['String']>>;
  voter_contains?: InputMaybe<Scalars['String']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_not_contains?: InputMaybe<Scalars['String']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_starts_with?: InputMaybe<Scalars['String']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_starts_with?: InputMaybe<Scalars['String']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_ends_with?: InputMaybe<Scalars['String']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  choiceID?: InputMaybe<Scalars['BigInt']>;
  choiceID_not?: InputMaybe<Scalars['BigInt']>;
  choiceID_gt?: InputMaybe<Scalars['BigInt']>;
  choiceID_lt?: InputMaybe<Scalars['BigInt']>;
  choiceID_gte?: InputMaybe<Scalars['BigInt']>;
  choiceID_lte?: InputMaybe<Scalars['BigInt']>;
  choiceID_in?: InputMaybe<Array<Scalars['BigInt']>>;
  choiceID_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poll?: InputMaybe<Scalars['String']>;
  poll_not?: InputMaybe<Scalars['String']>;
  poll_gt?: InputMaybe<Scalars['String']>;
  poll_lt?: InputMaybe<Scalars['String']>;
  poll_gte?: InputMaybe<Scalars['String']>;
  poll_lte?: InputMaybe<Scalars['String']>;
  poll_in?: InputMaybe<Array<Scalars['String']>>;
  poll_not_in?: InputMaybe<Array<Scalars['String']>>;
  poll_contains?: InputMaybe<Scalars['String']>;
  poll_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_not_contains?: InputMaybe<Scalars['String']>;
  poll_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_starts_with?: InputMaybe<Scalars['String']>;
  poll_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_starts_with?: InputMaybe<Scalars['String']>;
  poll_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_ends_with?: InputMaybe<Scalars['String']>;
  poll_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_ends_with?: InputMaybe<Scalars['String']>;
  poll_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_?: InputMaybe<Poll_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type VoteEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'voter'
  | 'choiceID'
  | 'poll';

export type Vote_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  voter?: InputMaybe<Scalars['String']>;
  voter_not?: InputMaybe<Scalars['String']>;
  voter_gt?: InputMaybe<Scalars['String']>;
  voter_lt?: InputMaybe<Scalars['String']>;
  voter_gte?: InputMaybe<Scalars['String']>;
  voter_lte?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<Scalars['String']>>;
  voter_not_in?: InputMaybe<Array<Scalars['String']>>;
  voter_contains?: InputMaybe<Scalars['String']>;
  voter_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_not_contains?: InputMaybe<Scalars['String']>;
  voter_not_contains_nocase?: InputMaybe<Scalars['String']>;
  voter_starts_with?: InputMaybe<Scalars['String']>;
  voter_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_starts_with?: InputMaybe<Scalars['String']>;
  voter_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  voter_ends_with?: InputMaybe<Scalars['String']>;
  voter_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']>;
  voter_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  voteStake?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_not?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  voteStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  voteStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  nonVoteStake?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_not?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_gt?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_lt?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_gte?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_lte?: InputMaybe<Scalars['BigDecimal']>;
  nonVoteStake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  nonVoteStake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  choiceID?: InputMaybe<PollChoice>;
  choiceID_not?: InputMaybe<PollChoice>;
  choiceID_in?: InputMaybe<Array<PollChoice>>;
  choiceID_not_in?: InputMaybe<Array<PollChoice>>;
  poll?: InputMaybe<Scalars['String']>;
  poll_not?: InputMaybe<Scalars['String']>;
  poll_gt?: InputMaybe<Scalars['String']>;
  poll_lt?: InputMaybe<Scalars['String']>;
  poll_gte?: InputMaybe<Scalars['String']>;
  poll_lte?: InputMaybe<Scalars['String']>;
  poll_in?: InputMaybe<Array<Scalars['String']>>;
  poll_not_in?: InputMaybe<Array<Scalars['String']>>;
  poll_contains?: InputMaybe<Scalars['String']>;
  poll_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_not_contains?: InputMaybe<Scalars['String']>;
  poll_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poll_starts_with?: InputMaybe<Scalars['String']>;
  poll_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_starts_with?: InputMaybe<Scalars['String']>;
  poll_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poll_ends_with?: InputMaybe<Scalars['String']>;
  poll_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_not_ends_with?: InputMaybe<Scalars['String']>;
  poll_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poll_?: InputMaybe<Poll_filter>;
  registeredTranscoder?: InputMaybe<Scalars['Boolean']>;
  registeredTranscoder_not?: InputMaybe<Scalars['Boolean']>;
  registeredTranscoder_in?: InputMaybe<Array<Scalars['Boolean']>>;
  registeredTranscoder_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Vote_orderBy =
  | 'id'
  | 'voter'
  | 'voteStake'
  | 'nonVoteStake'
  | 'choiceID'
  | 'poll'
  | 'registeredTranscoder';

/**
 * WinningTicketRedeemedEvent entities are created for every emitted WinningTicketRedeemed event.
 *
 */
export type WinningTicketRedeemedEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the broadcaster who sent the fees */
  sender: Broadcaster;
  /** Reference to the recipient of the broadcaster fees */
  recipient: Transcoder;
  /** Face value of ticket paid to recipient */
  faceValue: Scalars['BigDecimal'];
  /** Amount of fees the winning ticket was redeemed for in in USD */
  faceValueUSD: Scalars['BigDecimal'];
  /** The winning probability of the ticket */
  winProb: Scalars['BigInt'];
  /** Sender's monotonically increasing counter for each ticket */
  senderNonce: Scalars['BigInt'];
  /** keccak256 hash commitment to recipient's random value */
  recipientRand: Scalars['BigInt'];
  /** Auxilary data included in ticket used for additional validation */
  auxData: Scalars['Bytes'];
};

export type WinningTicketRedeemedEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  sender?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_?: InputMaybe<Broadcaster_filter>;
  recipient?: InputMaybe<Scalars['String']>;
  recipient_not?: InputMaybe<Scalars['String']>;
  recipient_gt?: InputMaybe<Scalars['String']>;
  recipient_lt?: InputMaybe<Scalars['String']>;
  recipient_gte?: InputMaybe<Scalars['String']>;
  recipient_lte?: InputMaybe<Scalars['String']>;
  recipient_in?: InputMaybe<Array<Scalars['String']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']>>;
  recipient_contains?: InputMaybe<Scalars['String']>;
  recipient_contains_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_contains?: InputMaybe<Scalars['String']>;
  recipient_not_contains_nocase?: InputMaybe<Scalars['String']>;
  recipient_starts_with?: InputMaybe<Scalars['String']>;
  recipient_starts_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_starts_with?: InputMaybe<Scalars['String']>;
  recipient_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_ends_with?: InputMaybe<Scalars['String']>;
  recipient_ends_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_not_ends_with?: InputMaybe<Scalars['String']>;
  recipient_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  recipient_?: InputMaybe<Transcoder_filter>;
  faceValue?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_not?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_gt?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_lt?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_gte?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_lte?: InputMaybe<Scalars['BigDecimal']>;
  faceValue_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  faceValue_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  faceValueUSD?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_not?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_gt?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_lt?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_gte?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_lte?: InputMaybe<Scalars['BigDecimal']>;
  faceValueUSD_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  faceValueUSD_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  winProb?: InputMaybe<Scalars['BigInt']>;
  winProb_not?: InputMaybe<Scalars['BigInt']>;
  winProb_gt?: InputMaybe<Scalars['BigInt']>;
  winProb_lt?: InputMaybe<Scalars['BigInt']>;
  winProb_gte?: InputMaybe<Scalars['BigInt']>;
  winProb_lte?: InputMaybe<Scalars['BigInt']>;
  winProb_in?: InputMaybe<Array<Scalars['BigInt']>>;
  winProb_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderNonce?: InputMaybe<Scalars['BigInt']>;
  senderNonce_not?: InputMaybe<Scalars['BigInt']>;
  senderNonce_gt?: InputMaybe<Scalars['BigInt']>;
  senderNonce_lt?: InputMaybe<Scalars['BigInt']>;
  senderNonce_gte?: InputMaybe<Scalars['BigInt']>;
  senderNonce_lte?: InputMaybe<Scalars['BigInt']>;
  senderNonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderNonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipientRand?: InputMaybe<Scalars['BigInt']>;
  recipientRand_not?: InputMaybe<Scalars['BigInt']>;
  recipientRand_gt?: InputMaybe<Scalars['BigInt']>;
  recipientRand_lt?: InputMaybe<Scalars['BigInt']>;
  recipientRand_gte?: InputMaybe<Scalars['BigInt']>;
  recipientRand_lte?: InputMaybe<Scalars['BigInt']>;
  recipientRand_in?: InputMaybe<Array<Scalars['BigInt']>>;
  recipientRand_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  auxData?: InputMaybe<Scalars['Bytes']>;
  auxData_not?: InputMaybe<Scalars['Bytes']>;
  auxData_in?: InputMaybe<Array<Scalars['Bytes']>>;
  auxData_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  auxData_contains?: InputMaybe<Scalars['Bytes']>;
  auxData_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type WinningTicketRedeemedEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'sender'
  | 'recipient'
  | 'faceValue'
  | 'faceValueUSD'
  | 'winProb'
  | 'senderNonce'
  | 'recipientRand'
  | 'auxData';

/**
 * WithdrawFeesEvent entities are created for every emitted WithdrawFees event.
 *
 */
export type WithdrawFeesEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegator that withdraw its fees */
  delegator: Delegator;
  /** Amount of fees withdrawn */
  amount: Scalars['BigDecimal'];
};

export type WithdrawFeesEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type WithdrawFeesEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegator'
  | 'amount';

/**
 * WithdrawStakeEvent entities are created for every emitted WithdrawStake event.
 *
 */
export type WithdrawStakeEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the delegator that withdraw its stake */
  delegator: Delegator;
  /** Unbonding lock ID that was deleted upon withdrawal */
  unbondingLockId?: Maybe<Scalars['Int']>;
  /** Amount of stake withdrawn */
  amount: Scalars['BigDecimal'];
};

export type WithdrawStakeEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  delegator?: InputMaybe<Scalars['String']>;
  delegator_not?: InputMaybe<Scalars['String']>;
  delegator_gt?: InputMaybe<Scalars['String']>;
  delegator_lt?: InputMaybe<Scalars['String']>;
  delegator_gte?: InputMaybe<Scalars['String']>;
  delegator_lte?: InputMaybe<Scalars['String']>;
  delegator_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_not_in?: InputMaybe<Array<Scalars['String']>>;
  delegator_contains?: InputMaybe<Scalars['String']>;
  delegator_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_contains?: InputMaybe<Scalars['String']>;
  delegator_not_contains_nocase?: InputMaybe<Scalars['String']>;
  delegator_starts_with?: InputMaybe<Scalars['String']>;
  delegator_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with?: InputMaybe<Scalars['String']>;
  delegator_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_ends_with?: InputMaybe<Scalars['String']>;
  delegator_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with?: InputMaybe<Scalars['String']>;
  delegator_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  delegator_?: InputMaybe<Delegator_filter>;
  unbondingLockId?: InputMaybe<Scalars['Int']>;
  unbondingLockId_not?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lt?: InputMaybe<Scalars['Int']>;
  unbondingLockId_gte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_lte?: InputMaybe<Scalars['Int']>;
  unbondingLockId_in?: InputMaybe<Array<Scalars['Int']>>;
  unbondingLockId_not_in?: InputMaybe<Array<Scalars['Int']>>;
  amount?: InputMaybe<Scalars['BigDecimal']>;
  amount_not?: InputMaybe<Scalars['BigDecimal']>;
  amount_gt?: InputMaybe<Scalars['BigDecimal']>;
  amount_lt?: InputMaybe<Scalars['BigDecimal']>;
  amount_gte?: InputMaybe<Scalars['BigDecimal']>;
  amount_lte?: InputMaybe<Scalars['BigDecimal']>;
  amount_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type WithdrawStakeEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'delegator'
  | 'unbondingLockId'
  | 'amount';

/**
 * WithdrawalEvent entities are created for every emitted Withdrawal event.
 *
 */
export type WithdrawalEvent = Event & {
  /** Ethereum transaction hash + event log index */
  id: Scalars['ID'];
  /** Reference to the transaction the event was included in */
  transaction: Transaction;
  /** Timestamp of the transaction the event was included in */
  timestamp: Scalars['Int'];
  /** Reference to the round the event occured in */
  round: Round;
  /** Reference to the broadcaster withdrawing its deposit and reserve */
  sender: Broadcaster;
  /** Deposit amount withdrawn */
  deposit: Scalars['BigDecimal'];
  /** Reserve amount withdrawn */
  reserve: Scalars['BigDecimal'];
};

export type WithdrawalEvent_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  transaction?: InputMaybe<Scalars['String']>;
  transaction_not?: InputMaybe<Scalars['String']>;
  transaction_gt?: InputMaybe<Scalars['String']>;
  transaction_lt?: InputMaybe<Scalars['String']>;
  transaction_gte?: InputMaybe<Scalars['String']>;
  transaction_lte?: InputMaybe<Scalars['String']>;
  transaction_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_not_in?: InputMaybe<Array<Scalars['String']>>;
  transaction_contains?: InputMaybe<Scalars['String']>;
  transaction_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_contains?: InputMaybe<Scalars['String']>;
  transaction_not_contains_nocase?: InputMaybe<Scalars['String']>;
  transaction_starts_with?: InputMaybe<Scalars['String']>;
  transaction_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with?: InputMaybe<Scalars['String']>;
  transaction_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_ends_with?: InputMaybe<Scalars['String']>;
  transaction_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with?: InputMaybe<Scalars['String']>;
  transaction_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  transaction_?: InputMaybe<Transaction_filter>;
  timestamp?: InputMaybe<Scalars['Int']>;
  timestamp_not?: InputMaybe<Scalars['Int']>;
  timestamp_gt?: InputMaybe<Scalars['Int']>;
  timestamp_lt?: InputMaybe<Scalars['Int']>;
  timestamp_gte?: InputMaybe<Scalars['Int']>;
  timestamp_lte?: InputMaybe<Scalars['Int']>;
  timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
  round?: InputMaybe<Scalars['String']>;
  round_not?: InputMaybe<Scalars['String']>;
  round_gt?: InputMaybe<Scalars['String']>;
  round_lt?: InputMaybe<Scalars['String']>;
  round_gte?: InputMaybe<Scalars['String']>;
  round_lte?: InputMaybe<Scalars['String']>;
  round_in?: InputMaybe<Array<Scalars['String']>>;
  round_not_in?: InputMaybe<Array<Scalars['String']>>;
  round_contains?: InputMaybe<Scalars['String']>;
  round_contains_nocase?: InputMaybe<Scalars['String']>;
  round_not_contains?: InputMaybe<Scalars['String']>;
  round_not_contains_nocase?: InputMaybe<Scalars['String']>;
  round_starts_with?: InputMaybe<Scalars['String']>;
  round_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  round_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  round_ends_with?: InputMaybe<Scalars['String']>;
  round_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  round_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  round_?: InputMaybe<Round_filter>;
  sender?: InputMaybe<Scalars['String']>;
  sender_not?: InputMaybe<Scalars['String']>;
  sender_gt?: InputMaybe<Scalars['String']>;
  sender_lt?: InputMaybe<Scalars['String']>;
  sender_gte?: InputMaybe<Scalars['String']>;
  sender_lte?: InputMaybe<Scalars['String']>;
  sender_in?: InputMaybe<Array<Scalars['String']>>;
  sender_not_in?: InputMaybe<Array<Scalars['String']>>;
  sender_contains?: InputMaybe<Scalars['String']>;
  sender_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_not_contains?: InputMaybe<Scalars['String']>;
  sender_not_contains_nocase?: InputMaybe<Scalars['String']>;
  sender_starts_with?: InputMaybe<Scalars['String']>;
  sender_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_starts_with?: InputMaybe<Scalars['String']>;
  sender_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  sender_ends_with?: InputMaybe<Scalars['String']>;
  sender_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_not_ends_with?: InputMaybe<Scalars['String']>;
  sender_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  sender_?: InputMaybe<Broadcaster_filter>;
  deposit?: InputMaybe<Scalars['BigDecimal']>;
  deposit_not?: InputMaybe<Scalars['BigDecimal']>;
  deposit_gt?: InputMaybe<Scalars['BigDecimal']>;
  deposit_lt?: InputMaybe<Scalars['BigDecimal']>;
  deposit_gte?: InputMaybe<Scalars['BigDecimal']>;
  deposit_lte?: InputMaybe<Scalars['BigDecimal']>;
  deposit_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  deposit_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve?: InputMaybe<Scalars['BigDecimal']>;
  reserve_not?: InputMaybe<Scalars['BigDecimal']>;
  reserve_gt?: InputMaybe<Scalars['BigDecimal']>;
  reserve_lt?: InputMaybe<Scalars['BigDecimal']>;
  reserve_gte?: InputMaybe<Scalars['BigDecimal']>;
  reserve_lte?: InputMaybe<Scalars['BigDecimal']>;
  reserve_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  reserve_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type WithdrawalEvent_orderBy =
  | 'id'
  | 'transaction'
  | 'timestamp'
  | 'round'
  | 'sender'
  | 'deposit'
  | 'reserve';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
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
  chainName: Scalars['String'];
  subgraphUrl: Scalars['String'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  BondEvent: ResolverTypeWrapper<BondEvent>;
  BondEvent_filter: BondEvent_filter;
  BondEvent_orderBy: BondEvent_orderBy;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Broadcaster: ResolverTypeWrapper<Broadcaster>;
  Broadcaster_filter: Broadcaster_filter;
  Broadcaster_orderBy: Broadcaster_orderBy;
  BurnEvent: ResolverTypeWrapper<BurnEvent>;
  BurnEvent_filter: BurnEvent_filter;
  BurnEvent_orderBy: BurnEvent_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Day: ResolverTypeWrapper<Day>;
  Day_filter: Day_filter;
  Day_orderBy: Day_orderBy;
  Delegator: ResolverTypeWrapper<Delegator>;
  Delegator_filter: Delegator_filter;
  Delegator_orderBy: Delegator_orderBy;
  DepositFundedEvent: ResolverTypeWrapper<DepositFundedEvent>;
  DepositFundedEvent_filter: DepositFundedEvent_filter;
  DepositFundedEvent_orderBy: DepositFundedEvent_orderBy;
  EarningsClaimedEvent: ResolverTypeWrapper<EarningsClaimedEvent>;
  EarningsClaimedEvent_filter: EarningsClaimedEvent_filter;
  EarningsClaimedEvent_orderBy: EarningsClaimedEvent_orderBy;
  Event: ResolversTypes['BondEvent'] | ResolversTypes['BurnEvent'] | ResolversTypes['DepositFundedEvent'] | ResolversTypes['EarningsClaimedEvent'] | ResolversTypes['MintEvent'] | ResolversTypes['NewRoundEvent'] | ResolversTypes['ParameterUpdateEvent'] | ResolversTypes['PauseEvent'] | ResolversTypes['PollCreatedEvent'] | ResolversTypes['RebondEvent'] | ResolversTypes['ReserveClaimedEvent'] | ResolversTypes['ReserveFundedEvent'] | ResolversTypes['RewardEvent'] | ResolversTypes['ServiceURIUpdateEvent'] | ResolversTypes['SetCurrentRewardTokensEvent'] | ResolversTypes['TranscoderActivatedEvent'] | ResolversTypes['TranscoderDeactivatedEvent'] | ResolversTypes['TranscoderEvictedEvent'] | ResolversTypes['TranscoderResignedEvent'] | ResolversTypes['TranscoderSlashedEvent'] | ResolversTypes['TranscoderUpdateEvent'] | ResolversTypes['UnbondEvent'] | ResolversTypes['UnpauseEvent'] | ResolversTypes['VoteEvent'] | ResolversTypes['WinningTicketRedeemedEvent'] | ResolversTypes['WithdrawFeesEvent'] | ResolversTypes['WithdrawStakeEvent'] | ResolversTypes['WithdrawalEvent'];
  Event_filter: Event_filter;
  Event_orderBy: Event_orderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  MintEvent: ResolverTypeWrapper<MintEvent>;
  MintEvent_filter: MintEvent_filter;
  MintEvent_orderBy: MintEvent_orderBy;
  NewRoundEvent: ResolverTypeWrapper<NewRoundEvent>;
  NewRoundEvent_filter: NewRoundEvent_filter;
  NewRoundEvent_orderBy: NewRoundEvent_orderBy;
  OrderDirection: OrderDirection;
  ParameterUpdateEvent: ResolverTypeWrapper<ParameterUpdateEvent>;
  ParameterUpdateEvent_filter: ParameterUpdateEvent_filter;
  ParameterUpdateEvent_orderBy: ParameterUpdateEvent_orderBy;
  PauseEvent: ResolverTypeWrapper<PauseEvent>;
  PauseEvent_filter: PauseEvent_filter;
  PauseEvent_orderBy: PauseEvent_orderBy;
  Poll: ResolverTypeWrapper<Poll>;
  PollChoice: PollChoice;
  PollCreatedEvent: ResolverTypeWrapper<PollCreatedEvent>;
  PollCreatedEvent_filter: PollCreatedEvent_filter;
  PollCreatedEvent_orderBy: PollCreatedEvent_orderBy;
  PollTally: ResolverTypeWrapper<PollTally>;
  PollTally_filter: PollTally_filter;
  PollTally_orderBy: PollTally_orderBy;
  Poll_filter: Poll_filter;
  Poll_orderBy: Poll_orderBy;
  Pool: ResolverTypeWrapper<Pool>;
  Pool_filter: Pool_filter;
  Pool_orderBy: Pool_orderBy;
  Protocol: ResolverTypeWrapper<Protocol>;
  Protocol_filter: Protocol_filter;
  Protocol_orderBy: Protocol_orderBy;
  RebondEvent: ResolverTypeWrapper<RebondEvent>;
  RebondEvent_filter: RebondEvent_filter;
  RebondEvent_orderBy: RebondEvent_orderBy;
  ReserveClaimedEvent: ResolverTypeWrapper<ReserveClaimedEvent>;
  ReserveClaimedEvent_filter: ReserveClaimedEvent_filter;
  ReserveClaimedEvent_orderBy: ReserveClaimedEvent_orderBy;
  ReserveFundedEvent: ResolverTypeWrapper<ReserveFundedEvent>;
  ReserveFundedEvent_filter: ReserveFundedEvent_filter;
  ReserveFundedEvent_orderBy: ReserveFundedEvent_orderBy;
  RewardEvent: ResolverTypeWrapper<RewardEvent>;
  RewardEvent_filter: RewardEvent_filter;
  RewardEvent_orderBy: RewardEvent_orderBy;
  Round: ResolverTypeWrapper<Round>;
  Round_filter: Round_filter;
  Round_orderBy: Round_orderBy;
  ServiceURIUpdateEvent: ResolverTypeWrapper<ServiceURIUpdateEvent>;
  ServiceURIUpdateEvent_filter: ServiceURIUpdateEvent_filter;
  ServiceURIUpdateEvent_orderBy: ServiceURIUpdateEvent_orderBy;
  SetCurrentRewardTokensEvent: ResolverTypeWrapper<SetCurrentRewardTokensEvent>;
  SetCurrentRewardTokensEvent_filter: SetCurrentRewardTokensEvent_filter;
  SetCurrentRewardTokensEvent_orderBy: SetCurrentRewardTokensEvent_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  Transaction_filter: Transaction_filter;
  Transaction_orderBy: Transaction_orderBy;
  Transcoder: ResolverTypeWrapper<Transcoder>;
  TranscoderActivatedEvent: ResolverTypeWrapper<TranscoderActivatedEvent>;
  TranscoderActivatedEvent_filter: TranscoderActivatedEvent_filter;
  TranscoderActivatedEvent_orderBy: TranscoderActivatedEvent_orderBy;
  TranscoderDay: ResolverTypeWrapper<TranscoderDay>;
  TranscoderDay_filter: TranscoderDay_filter;
  TranscoderDay_orderBy: TranscoderDay_orderBy;
  TranscoderDeactivatedEvent: ResolverTypeWrapper<TranscoderDeactivatedEvent>;
  TranscoderDeactivatedEvent_filter: TranscoderDeactivatedEvent_filter;
  TranscoderDeactivatedEvent_orderBy: TranscoderDeactivatedEvent_orderBy;
  TranscoderEvictedEvent: ResolverTypeWrapper<TranscoderEvictedEvent>;
  TranscoderEvictedEvent_filter: TranscoderEvictedEvent_filter;
  TranscoderEvictedEvent_orderBy: TranscoderEvictedEvent_orderBy;
  TranscoderResignedEvent: ResolverTypeWrapper<TranscoderResignedEvent>;
  TranscoderResignedEvent_filter: TranscoderResignedEvent_filter;
  TranscoderResignedEvent_orderBy: TranscoderResignedEvent_orderBy;
  TranscoderSlashedEvent: ResolverTypeWrapper<TranscoderSlashedEvent>;
  TranscoderSlashedEvent_filter: TranscoderSlashedEvent_filter;
  TranscoderSlashedEvent_orderBy: TranscoderSlashedEvent_orderBy;
  TranscoderStatus: TranscoderStatus;
  TranscoderUpdateEvent: ResolverTypeWrapper<TranscoderUpdateEvent>;
  TranscoderUpdateEvent_filter: TranscoderUpdateEvent_filter;
  TranscoderUpdateEvent_orderBy: TranscoderUpdateEvent_orderBy;
  Transcoder_filter: Transcoder_filter;
  Transcoder_orderBy: Transcoder_orderBy;
  UnbondEvent: ResolverTypeWrapper<UnbondEvent>;
  UnbondEvent_filter: UnbondEvent_filter;
  UnbondEvent_orderBy: UnbondEvent_orderBy;
  UnbondingLock: ResolverTypeWrapper<UnbondingLock>;
  UnbondingLock_filter: UnbondingLock_filter;
  UnbondingLock_orderBy: UnbondingLock_orderBy;
  UnpauseEvent: ResolverTypeWrapper<UnpauseEvent>;
  UnpauseEvent_filter: UnpauseEvent_filter;
  UnpauseEvent_orderBy: UnpauseEvent_orderBy;
  Vote: ResolverTypeWrapper<Vote>;
  VoteEvent: ResolverTypeWrapper<VoteEvent>;
  VoteEvent_filter: VoteEvent_filter;
  VoteEvent_orderBy: VoteEvent_orderBy;
  Vote_filter: Vote_filter;
  Vote_orderBy: Vote_orderBy;
  WinningTicketRedeemedEvent: ResolverTypeWrapper<WinningTicketRedeemedEvent>;
  WinningTicketRedeemedEvent_filter: WinningTicketRedeemedEvent_filter;
  WinningTicketRedeemedEvent_orderBy: WinningTicketRedeemedEvent_orderBy;
  WithdrawFeesEvent: ResolverTypeWrapper<WithdrawFeesEvent>;
  WithdrawFeesEvent_filter: WithdrawFeesEvent_filter;
  WithdrawFeesEvent_orderBy: WithdrawFeesEvent_orderBy;
  WithdrawStakeEvent: ResolverTypeWrapper<WithdrawStakeEvent>;
  WithdrawStakeEvent_filter: WithdrawStakeEvent_filter;
  WithdrawStakeEvent_orderBy: WithdrawStakeEvent_orderBy;
  WithdrawalEvent: ResolverTypeWrapper<WithdrawalEvent>;
  WithdrawalEvent_filter: WithdrawalEvent_filter;
  WithdrawalEvent_orderBy: WithdrawalEvent_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  BondEvent: BondEvent;
  BondEvent_filter: BondEvent_filter;
  Boolean: Scalars['Boolean'];
  Broadcaster: Broadcaster;
  Broadcaster_filter: Broadcaster_filter;
  BurnEvent: BurnEvent;
  BurnEvent_filter: BurnEvent_filter;
  Bytes: Scalars['Bytes'];
  Day: Day;
  Day_filter: Day_filter;
  Delegator: Delegator;
  Delegator_filter: Delegator_filter;
  DepositFundedEvent: DepositFundedEvent;
  DepositFundedEvent_filter: DepositFundedEvent_filter;
  EarningsClaimedEvent: EarningsClaimedEvent;
  EarningsClaimedEvent_filter: EarningsClaimedEvent_filter;
  Event: ResolversParentTypes['BondEvent'] | ResolversParentTypes['BurnEvent'] | ResolversParentTypes['DepositFundedEvent'] | ResolversParentTypes['EarningsClaimedEvent'] | ResolversParentTypes['MintEvent'] | ResolversParentTypes['NewRoundEvent'] | ResolversParentTypes['ParameterUpdateEvent'] | ResolversParentTypes['PauseEvent'] | ResolversParentTypes['PollCreatedEvent'] | ResolversParentTypes['RebondEvent'] | ResolversParentTypes['ReserveClaimedEvent'] | ResolversParentTypes['ReserveFundedEvent'] | ResolversParentTypes['RewardEvent'] | ResolversParentTypes['ServiceURIUpdateEvent'] | ResolversParentTypes['SetCurrentRewardTokensEvent'] | ResolversParentTypes['TranscoderActivatedEvent'] | ResolversParentTypes['TranscoderDeactivatedEvent'] | ResolversParentTypes['TranscoderEvictedEvent'] | ResolversParentTypes['TranscoderResignedEvent'] | ResolversParentTypes['TranscoderSlashedEvent'] | ResolversParentTypes['TranscoderUpdateEvent'] | ResolversParentTypes['UnbondEvent'] | ResolversParentTypes['UnpauseEvent'] | ResolversParentTypes['VoteEvent'] | ResolversParentTypes['WinningTicketRedeemedEvent'] | ResolversParentTypes['WithdrawFeesEvent'] | ResolversParentTypes['WithdrawStakeEvent'] | ResolversParentTypes['WithdrawalEvent'];
  Event_filter: Event_filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  MintEvent: MintEvent;
  MintEvent_filter: MintEvent_filter;
  NewRoundEvent: NewRoundEvent;
  NewRoundEvent_filter: NewRoundEvent_filter;
  ParameterUpdateEvent: ParameterUpdateEvent;
  ParameterUpdateEvent_filter: ParameterUpdateEvent_filter;
  PauseEvent: PauseEvent;
  PauseEvent_filter: PauseEvent_filter;
  Poll: Poll;
  PollCreatedEvent: PollCreatedEvent;
  PollCreatedEvent_filter: PollCreatedEvent_filter;
  PollTally: PollTally;
  PollTally_filter: PollTally_filter;
  Poll_filter: Poll_filter;
  Pool: Pool;
  Pool_filter: Pool_filter;
  Protocol: Protocol;
  Protocol_filter: Protocol_filter;
  RebondEvent: RebondEvent;
  RebondEvent_filter: RebondEvent_filter;
  ReserveClaimedEvent: ReserveClaimedEvent;
  ReserveClaimedEvent_filter: ReserveClaimedEvent_filter;
  ReserveFundedEvent: ReserveFundedEvent;
  ReserveFundedEvent_filter: ReserveFundedEvent_filter;
  RewardEvent: RewardEvent;
  RewardEvent_filter: RewardEvent_filter;
  Round: Round;
  Round_filter: Round_filter;
  ServiceURIUpdateEvent: ServiceURIUpdateEvent;
  ServiceURIUpdateEvent_filter: ServiceURIUpdateEvent_filter;
  SetCurrentRewardTokensEvent: SetCurrentRewardTokensEvent;
  SetCurrentRewardTokensEvent_filter: SetCurrentRewardTokensEvent_filter;
  String: Scalars['String'];
  Transaction: Transaction;
  Transaction_filter: Transaction_filter;
  Transcoder: Transcoder;
  TranscoderActivatedEvent: TranscoderActivatedEvent;
  TranscoderActivatedEvent_filter: TranscoderActivatedEvent_filter;
  TranscoderDay: TranscoderDay;
  TranscoderDay_filter: TranscoderDay_filter;
  TranscoderDeactivatedEvent: TranscoderDeactivatedEvent;
  TranscoderDeactivatedEvent_filter: TranscoderDeactivatedEvent_filter;
  TranscoderEvictedEvent: TranscoderEvictedEvent;
  TranscoderEvictedEvent_filter: TranscoderEvictedEvent_filter;
  TranscoderResignedEvent: TranscoderResignedEvent;
  TranscoderResignedEvent_filter: TranscoderResignedEvent_filter;
  TranscoderSlashedEvent: TranscoderSlashedEvent;
  TranscoderSlashedEvent_filter: TranscoderSlashedEvent_filter;
  TranscoderUpdateEvent: TranscoderUpdateEvent;
  TranscoderUpdateEvent_filter: TranscoderUpdateEvent_filter;
  Transcoder_filter: Transcoder_filter;
  UnbondEvent: UnbondEvent;
  UnbondEvent_filter: UnbondEvent_filter;
  UnbondingLock: UnbondingLock;
  UnbondingLock_filter: UnbondingLock_filter;
  UnpauseEvent: UnpauseEvent;
  UnpauseEvent_filter: UnpauseEvent_filter;
  Vote: Vote;
  VoteEvent: VoteEvent;
  VoteEvent_filter: VoteEvent_filter;
  Vote_filter: Vote_filter;
  WinningTicketRedeemedEvent: WinningTicketRedeemedEvent;
  WinningTicketRedeemedEvent_filter: WinningTicketRedeemedEvent_filter;
  WithdrawFeesEvent: WithdrawFeesEvent;
  WithdrawFeesEvent_filter: WithdrawFeesEvent_filter;
  WithdrawStakeEvent: WithdrawStakeEvent;
  WithdrawStakeEvent_filter: WithdrawStakeEvent_filter;
  WithdrawalEvent: WithdrawalEvent;
  WithdrawalEvent_filter: WithdrawalEvent_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  protocol?: Resolver<Maybe<ResolversTypes['Protocol']>, ParentType, ContextType, RequireFields<QueryprotocolArgs, 'id' | 'subgraphError'>>;
  protocols?: Resolver<Array<ResolversTypes['Protocol']>, ParentType, ContextType, RequireFields<QueryprotocolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoder?: Resolver<Maybe<ResolversTypes['Transcoder']>, ParentType, ContextType, RequireFields<QuerytranscoderArgs, 'id' | 'subgraphError'>>;
  transcoders?: Resolver<Array<ResolversTypes['Transcoder']>, ParentType, ContextType, RequireFields<QuerytranscodersArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: Resolver<Maybe<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolArgs, 'id' | 'subgraphError'>>;
  pools?: Resolver<Array<ResolversTypes['Pool']>, ParentType, ContextType, RequireFields<QuerypoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  round?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryroundArgs, 'id' | 'subgraphError'>>;
  rounds?: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType, RequireFields<QueryroundsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegator?: Resolver<Maybe<ResolversTypes['Delegator']>, ParentType, ContextType, RequireFields<QuerydelegatorArgs, 'id' | 'subgraphError'>>;
  delegators?: Resolver<Array<ResolversTypes['Delegator']>, ParentType, ContextType, RequireFields<QuerydelegatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  broadcaster?: Resolver<Maybe<ResolversTypes['Broadcaster']>, ParentType, ContextType, RequireFields<QuerybroadcasterArgs, 'id' | 'subgraphError'>>;
  broadcasters?: Resolver<Array<ResolversTypes['Broadcaster']>, ParentType, ContextType, RequireFields<QuerybroadcastersArgs, 'skip' | 'first' | 'subgraphError'>>;
  unbondingLock?: Resolver<Maybe<ResolversTypes['UnbondingLock']>, ParentType, ContextType, RequireFields<QueryunbondingLockArgs, 'id' | 'subgraphError'>>;
  unbondingLocks?: Resolver<Array<ResolversTypes['UnbondingLock']>, ParentType, ContextType, RequireFields<QueryunbondingLocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  poll?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType, RequireFields<QuerypollArgs, 'id' | 'subgraphError'>>;
  polls?: Resolver<Array<ResolversTypes['Poll']>, ParentType, ContextType, RequireFields<QuerypollsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pollTally?: Resolver<Maybe<ResolversTypes['PollTally']>, ParentType, ContextType, RequireFields<QuerypollTallyArgs, 'id' | 'subgraphError'>>;
  pollTallies?: Resolver<Array<ResolversTypes['PollTally']>, ParentType, ContextType, RequireFields<QuerypollTalliesArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvoteArgs, 'id' | 'subgraphError'>>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<QueryvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  day?: Resolver<Maybe<ResolversTypes['Day']>, ParentType, ContextType, RequireFields<QuerydayArgs, 'id' | 'subgraphError'>>;
  days?: Resolver<Array<ResolversTypes['Day']>, ParentType, ContextType, RequireFields<QuerydaysArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderDay?: Resolver<Maybe<ResolversTypes['TranscoderDay']>, ParentType, ContextType, RequireFields<QuerytranscoderDayArgs, 'id' | 'subgraphError'>>;
  transcoderDays?: Resolver<Array<ResolversTypes['TranscoderDay']>, ParentType, ContextType, RequireFields<QuerytranscoderDaysArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: Resolver<Array<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QuerytransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bondEvent?: Resolver<Maybe<ResolversTypes['BondEvent']>, ParentType, ContextType, RequireFields<QuerybondEventArgs, 'id' | 'subgraphError'>>;
  bondEvents?: Resolver<Array<ResolversTypes['BondEvent']>, ParentType, ContextType, RequireFields<QuerybondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unbondEvent?: Resolver<Maybe<ResolversTypes['UnbondEvent']>, ParentType, ContextType, RequireFields<QueryunbondEventArgs, 'id' | 'subgraphError'>>;
  unbondEvents?: Resolver<Array<ResolversTypes['UnbondEvent']>, ParentType, ContextType, RequireFields<QueryunbondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rebondEvent?: Resolver<Maybe<ResolversTypes['RebondEvent']>, ParentType, ContextType, RequireFields<QueryrebondEventArgs, 'id' | 'subgraphError'>>;
  rebondEvents?: Resolver<Array<ResolversTypes['RebondEvent']>, ParentType, ContextType, RequireFields<QueryrebondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rewardEvent?: Resolver<Maybe<ResolversTypes['RewardEvent']>, ParentType, ContextType, RequireFields<QueryrewardEventArgs, 'id' | 'subgraphError'>>;
  rewardEvents?: Resolver<Array<ResolversTypes['RewardEvent']>, ParentType, ContextType, RequireFields<QueryrewardEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderActivatedEvent?: Resolver<Maybe<ResolversTypes['TranscoderActivatedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderActivatedEventArgs, 'id' | 'subgraphError'>>;
  transcoderActivatedEvents?: Resolver<Array<ResolversTypes['TranscoderActivatedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderActivatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderDeactivatedEvent?: Resolver<Maybe<ResolversTypes['TranscoderDeactivatedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderDeactivatedEventArgs, 'id' | 'subgraphError'>>;
  transcoderDeactivatedEvents?: Resolver<Array<ResolversTypes['TranscoderDeactivatedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderDeactivatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  earningsClaimedEvent?: Resolver<Maybe<ResolversTypes['EarningsClaimedEvent']>, ParentType, ContextType, RequireFields<QueryearningsClaimedEventArgs, 'id' | 'subgraphError'>>;
  earningsClaimedEvents?: Resolver<Array<ResolversTypes['EarningsClaimedEvent']>, ParentType, ContextType, RequireFields<QueryearningsClaimedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderUpdateEvent?: Resolver<Maybe<ResolversTypes['TranscoderUpdateEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderUpdateEventArgs, 'id' | 'subgraphError'>>;
  transcoderUpdateEvents?: Resolver<Array<ResolversTypes['TranscoderUpdateEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderSlashedEvent?: Resolver<Maybe<ResolversTypes['TranscoderSlashedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderSlashedEventArgs, 'id' | 'subgraphError'>>;
  transcoderSlashedEvents?: Resolver<Array<ResolversTypes['TranscoderSlashedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderSlashedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderResignedEvent?: Resolver<Maybe<ResolversTypes['TranscoderResignedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderResignedEventArgs, 'id' | 'subgraphError'>>;
  transcoderResignedEvents?: Resolver<Array<ResolversTypes['TranscoderResignedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderResignedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderEvictedEvent?: Resolver<Maybe<ResolversTypes['TranscoderEvictedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderEvictedEventArgs, 'id' | 'subgraphError'>>;
  transcoderEvictedEvents?: Resolver<Array<ResolversTypes['TranscoderEvictedEvent']>, ParentType, ContextType, RequireFields<QuerytranscoderEvictedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawStakeEvent?: Resolver<Maybe<ResolversTypes['WithdrawStakeEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawStakeEventArgs, 'id' | 'subgraphError'>>;
  withdrawStakeEvents?: Resolver<Array<ResolversTypes['WithdrawStakeEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawStakeEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawFeesEvent?: Resolver<Maybe<ResolversTypes['WithdrawFeesEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawFeesEventArgs, 'id' | 'subgraphError'>>;
  withdrawFeesEvents?: Resolver<Array<ResolversTypes['WithdrawFeesEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawFeesEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newRoundEvent?: Resolver<Maybe<ResolversTypes['NewRoundEvent']>, ParentType, ContextType, RequireFields<QuerynewRoundEventArgs, 'id' | 'subgraphError'>>;
  newRoundEvents?: Resolver<Array<ResolversTypes['NewRoundEvent']>, ParentType, ContextType, RequireFields<QuerynewRoundEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  winningTicketRedeemedEvent?: Resolver<Maybe<ResolversTypes['WinningTicketRedeemedEvent']>, ParentType, ContextType, RequireFields<QuerywinningTicketRedeemedEventArgs, 'id' | 'subgraphError'>>;
  winningTicketRedeemedEvents?: Resolver<Array<ResolversTypes['WinningTicketRedeemedEvent']>, ParentType, ContextType, RequireFields<QuerywinningTicketRedeemedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  depositFundedEvent?: Resolver<Maybe<ResolversTypes['DepositFundedEvent']>, ParentType, ContextType, RequireFields<QuerydepositFundedEventArgs, 'id' | 'subgraphError'>>;
  depositFundedEvents?: Resolver<Array<ResolversTypes['DepositFundedEvent']>, ParentType, ContextType, RequireFields<QuerydepositFundedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reserveFundedEvent?: Resolver<Maybe<ResolversTypes['ReserveFundedEvent']>, ParentType, ContextType, RequireFields<QueryreserveFundedEventArgs, 'id' | 'subgraphError'>>;
  reserveFundedEvents?: Resolver<Array<ResolversTypes['ReserveFundedEvent']>, ParentType, ContextType, RequireFields<QueryreserveFundedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reserveClaimedEvent?: Resolver<Maybe<ResolversTypes['ReserveClaimedEvent']>, ParentType, ContextType, RequireFields<QueryreserveClaimedEventArgs, 'id' | 'subgraphError'>>;
  reserveClaimedEvents?: Resolver<Array<ResolversTypes['ReserveClaimedEvent']>, ParentType, ContextType, RequireFields<QueryreserveClaimedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawalEvent?: Resolver<Maybe<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventArgs, 'id' | 'subgraphError'>>;
  withdrawalEvents?: Resolver<Array<ResolversTypes['WithdrawalEvent']>, ParentType, ContextType, RequireFields<QuerywithdrawalEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  setCurrentRewardTokensEvent?: Resolver<Maybe<ResolversTypes['SetCurrentRewardTokensEvent']>, ParentType, ContextType, RequireFields<QuerysetCurrentRewardTokensEventArgs, 'id' | 'subgraphError'>>;
  setCurrentRewardTokensEvents?: Resolver<Array<ResolversTypes['SetCurrentRewardTokensEvent']>, ParentType, ContextType, RequireFields<QuerysetCurrentRewardTokensEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pauseEvent?: Resolver<Maybe<ResolversTypes['PauseEvent']>, ParentType, ContextType, RequireFields<QuerypauseEventArgs, 'id' | 'subgraphError'>>;
  pauseEvents?: Resolver<Array<ResolversTypes['PauseEvent']>, ParentType, ContextType, RequireFields<QuerypauseEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unpauseEvent?: Resolver<Maybe<ResolversTypes['UnpauseEvent']>, ParentType, ContextType, RequireFields<QueryunpauseEventArgs, 'id' | 'subgraphError'>>;
  unpauseEvents?: Resolver<Array<ResolversTypes['UnpauseEvent']>, ParentType, ContextType, RequireFields<QueryunpauseEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  parameterUpdateEvent?: Resolver<Maybe<ResolversTypes['ParameterUpdateEvent']>, ParentType, ContextType, RequireFields<QueryparameterUpdateEventArgs, 'id' | 'subgraphError'>>;
  parameterUpdateEvents?: Resolver<Array<ResolversTypes['ParameterUpdateEvent']>, ParentType, ContextType, RequireFields<QueryparameterUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteEvent?: Resolver<Maybe<ResolversTypes['VoteEvent']>, ParentType, ContextType, RequireFields<QueryvoteEventArgs, 'id' | 'subgraphError'>>;
  voteEvents?: Resolver<Array<ResolversTypes['VoteEvent']>, ParentType, ContextType, RequireFields<QueryvoteEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pollCreatedEvent?: Resolver<Maybe<ResolversTypes['PollCreatedEvent']>, ParentType, ContextType, RequireFields<QuerypollCreatedEventArgs, 'id' | 'subgraphError'>>;
  pollCreatedEvents?: Resolver<Array<ResolversTypes['PollCreatedEvent']>, ParentType, ContextType, RequireFields<QuerypollCreatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  serviceURIUpdateEvent?: Resolver<Maybe<ResolversTypes['ServiceURIUpdateEvent']>, ParentType, ContextType, RequireFields<QueryserviceURIUpdateEventArgs, 'id' | 'subgraphError'>>;
  serviceURIUpdateEvents?: Resolver<Array<ResolversTypes['ServiceURIUpdateEvent']>, ParentType, ContextType, RequireFields<QueryserviceURIUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mintEvent?: Resolver<Maybe<ResolversTypes['MintEvent']>, ParentType, ContextType, RequireFields<QuerymintEventArgs, 'id' | 'subgraphError'>>;
  mintEvents?: Resolver<Array<ResolversTypes['MintEvent']>, ParentType, ContextType, RequireFields<QuerymintEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  burnEvent?: Resolver<Maybe<ResolversTypes['BurnEvent']>, ParentType, ContextType, RequireFields<QueryburnEventArgs, 'id' | 'subgraphError'>>;
  burnEvents?: Resolver<Array<ResolversTypes['BurnEvent']>, ParentType, ContextType, RequireFields<QueryburnEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  event?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryeventArgs, 'id' | 'subgraphError'>>;
  events?: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType, RequireFields<QueryeventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  protocol?: SubscriptionResolver<Maybe<ResolversTypes['Protocol']>, "protocol", ParentType, ContextType, RequireFields<SubscriptionprotocolArgs, 'id' | 'subgraphError'>>;
  protocols?: SubscriptionResolver<Array<ResolversTypes['Protocol']>, "protocols", ParentType, ContextType, RequireFields<SubscriptionprotocolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoder?: SubscriptionResolver<Maybe<ResolversTypes['Transcoder']>, "transcoder", ParentType, ContextType, RequireFields<SubscriptiontranscoderArgs, 'id' | 'subgraphError'>>;
  transcoders?: SubscriptionResolver<Array<ResolversTypes['Transcoder']>, "transcoders", ParentType, ContextType, RequireFields<SubscriptiontranscodersArgs, 'skip' | 'first' | 'subgraphError'>>;
  pool?: SubscriptionResolver<Maybe<ResolversTypes['Pool']>, "pool", ParentType, ContextType, RequireFields<SubscriptionpoolArgs, 'id' | 'subgraphError'>>;
  pools?: SubscriptionResolver<Array<ResolversTypes['Pool']>, "pools", ParentType, ContextType, RequireFields<SubscriptionpoolsArgs, 'skip' | 'first' | 'subgraphError'>>;
  round?: SubscriptionResolver<Maybe<ResolversTypes['Round']>, "round", ParentType, ContextType, RequireFields<SubscriptionroundArgs, 'id' | 'subgraphError'>>;
  rounds?: SubscriptionResolver<Array<ResolversTypes['Round']>, "rounds", ParentType, ContextType, RequireFields<SubscriptionroundsArgs, 'skip' | 'first' | 'subgraphError'>>;
  delegator?: SubscriptionResolver<Maybe<ResolversTypes['Delegator']>, "delegator", ParentType, ContextType, RequireFields<SubscriptiondelegatorArgs, 'id' | 'subgraphError'>>;
  delegators?: SubscriptionResolver<Array<ResolversTypes['Delegator']>, "delegators", ParentType, ContextType, RequireFields<SubscriptiondelegatorsArgs, 'skip' | 'first' | 'subgraphError'>>;
  broadcaster?: SubscriptionResolver<Maybe<ResolversTypes['Broadcaster']>, "broadcaster", ParentType, ContextType, RequireFields<SubscriptionbroadcasterArgs, 'id' | 'subgraphError'>>;
  broadcasters?: SubscriptionResolver<Array<ResolversTypes['Broadcaster']>, "broadcasters", ParentType, ContextType, RequireFields<SubscriptionbroadcastersArgs, 'skip' | 'first' | 'subgraphError'>>;
  unbondingLock?: SubscriptionResolver<Maybe<ResolversTypes['UnbondingLock']>, "unbondingLock", ParentType, ContextType, RequireFields<SubscriptionunbondingLockArgs, 'id' | 'subgraphError'>>;
  unbondingLocks?: SubscriptionResolver<Array<ResolversTypes['UnbondingLock']>, "unbondingLocks", ParentType, ContextType, RequireFields<SubscriptionunbondingLocksArgs, 'skip' | 'first' | 'subgraphError'>>;
  poll?: SubscriptionResolver<Maybe<ResolversTypes['Poll']>, "poll", ParentType, ContextType, RequireFields<SubscriptionpollArgs, 'id' | 'subgraphError'>>;
  polls?: SubscriptionResolver<Array<ResolversTypes['Poll']>, "polls", ParentType, ContextType, RequireFields<SubscriptionpollsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pollTally?: SubscriptionResolver<Maybe<ResolversTypes['PollTally']>, "pollTally", ParentType, ContextType, RequireFields<SubscriptionpollTallyArgs, 'id' | 'subgraphError'>>;
  pollTallies?: SubscriptionResolver<Array<ResolversTypes['PollTally']>, "pollTallies", ParentType, ContextType, RequireFields<SubscriptionpollTalliesArgs, 'skip' | 'first' | 'subgraphError'>>;
  vote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, "vote", ParentType, ContextType, RequireFields<SubscriptionvoteArgs, 'id' | 'subgraphError'>>;
  votes?: SubscriptionResolver<Array<ResolversTypes['Vote']>, "votes", ParentType, ContextType, RequireFields<SubscriptionvotesArgs, 'skip' | 'first' | 'subgraphError'>>;
  day?: SubscriptionResolver<Maybe<ResolversTypes['Day']>, "day", ParentType, ContextType, RequireFields<SubscriptiondayArgs, 'id' | 'subgraphError'>>;
  days?: SubscriptionResolver<Array<ResolversTypes['Day']>, "days", ParentType, ContextType, RequireFields<SubscriptiondaysArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderDay?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderDay']>, "transcoderDay", ParentType, ContextType, RequireFields<SubscriptiontranscoderDayArgs, 'id' | 'subgraphError'>>;
  transcoderDays?: SubscriptionResolver<Array<ResolversTypes['TranscoderDay']>, "transcoderDays", ParentType, ContextType, RequireFields<SubscriptiontranscoderDaysArgs, 'skip' | 'first' | 'subgraphError'>>;
  transaction?: SubscriptionResolver<Maybe<ResolversTypes['Transaction']>, "transaction", ParentType, ContextType, RequireFields<SubscriptiontransactionArgs, 'id' | 'subgraphError'>>;
  transactions?: SubscriptionResolver<Array<ResolversTypes['Transaction']>, "transactions", ParentType, ContextType, RequireFields<SubscriptiontransactionsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bondEvent?: SubscriptionResolver<Maybe<ResolversTypes['BondEvent']>, "bondEvent", ParentType, ContextType, RequireFields<SubscriptionbondEventArgs, 'id' | 'subgraphError'>>;
  bondEvents?: SubscriptionResolver<Array<ResolversTypes['BondEvent']>, "bondEvents", ParentType, ContextType, RequireFields<SubscriptionbondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unbondEvent?: SubscriptionResolver<Maybe<ResolversTypes['UnbondEvent']>, "unbondEvent", ParentType, ContextType, RequireFields<SubscriptionunbondEventArgs, 'id' | 'subgraphError'>>;
  unbondEvents?: SubscriptionResolver<Array<ResolversTypes['UnbondEvent']>, "unbondEvents", ParentType, ContextType, RequireFields<SubscriptionunbondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rebondEvent?: SubscriptionResolver<Maybe<ResolversTypes['RebondEvent']>, "rebondEvent", ParentType, ContextType, RequireFields<SubscriptionrebondEventArgs, 'id' | 'subgraphError'>>;
  rebondEvents?: SubscriptionResolver<Array<ResolversTypes['RebondEvent']>, "rebondEvents", ParentType, ContextType, RequireFields<SubscriptionrebondEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  rewardEvent?: SubscriptionResolver<Maybe<ResolversTypes['RewardEvent']>, "rewardEvent", ParentType, ContextType, RequireFields<SubscriptionrewardEventArgs, 'id' | 'subgraphError'>>;
  rewardEvents?: SubscriptionResolver<Array<ResolversTypes['RewardEvent']>, "rewardEvents", ParentType, ContextType, RequireFields<SubscriptionrewardEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderActivatedEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderActivatedEvent']>, "transcoderActivatedEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderActivatedEventArgs, 'id' | 'subgraphError'>>;
  transcoderActivatedEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderActivatedEvent']>, "transcoderActivatedEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderActivatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderDeactivatedEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderDeactivatedEvent']>, "transcoderDeactivatedEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderDeactivatedEventArgs, 'id' | 'subgraphError'>>;
  transcoderDeactivatedEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderDeactivatedEvent']>, "transcoderDeactivatedEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderDeactivatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  earningsClaimedEvent?: SubscriptionResolver<Maybe<ResolversTypes['EarningsClaimedEvent']>, "earningsClaimedEvent", ParentType, ContextType, RequireFields<SubscriptionearningsClaimedEventArgs, 'id' | 'subgraphError'>>;
  earningsClaimedEvents?: SubscriptionResolver<Array<ResolversTypes['EarningsClaimedEvent']>, "earningsClaimedEvents", ParentType, ContextType, RequireFields<SubscriptionearningsClaimedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderUpdateEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderUpdateEvent']>, "transcoderUpdateEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderUpdateEventArgs, 'id' | 'subgraphError'>>;
  transcoderUpdateEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderUpdateEvent']>, "transcoderUpdateEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderSlashedEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderSlashedEvent']>, "transcoderSlashedEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderSlashedEventArgs, 'id' | 'subgraphError'>>;
  transcoderSlashedEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderSlashedEvent']>, "transcoderSlashedEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderSlashedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderResignedEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderResignedEvent']>, "transcoderResignedEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderResignedEventArgs, 'id' | 'subgraphError'>>;
  transcoderResignedEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderResignedEvent']>, "transcoderResignedEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderResignedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  transcoderEvictedEvent?: SubscriptionResolver<Maybe<ResolversTypes['TranscoderEvictedEvent']>, "transcoderEvictedEvent", ParentType, ContextType, RequireFields<SubscriptiontranscoderEvictedEventArgs, 'id' | 'subgraphError'>>;
  transcoderEvictedEvents?: SubscriptionResolver<Array<ResolversTypes['TranscoderEvictedEvent']>, "transcoderEvictedEvents", ParentType, ContextType, RequireFields<SubscriptiontranscoderEvictedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawStakeEvent?: SubscriptionResolver<Maybe<ResolversTypes['WithdrawStakeEvent']>, "withdrawStakeEvent", ParentType, ContextType, RequireFields<SubscriptionwithdrawStakeEventArgs, 'id' | 'subgraphError'>>;
  withdrawStakeEvents?: SubscriptionResolver<Array<ResolversTypes['WithdrawStakeEvent']>, "withdrawStakeEvents", ParentType, ContextType, RequireFields<SubscriptionwithdrawStakeEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawFeesEvent?: SubscriptionResolver<Maybe<ResolversTypes['WithdrawFeesEvent']>, "withdrawFeesEvent", ParentType, ContextType, RequireFields<SubscriptionwithdrawFeesEventArgs, 'id' | 'subgraphError'>>;
  withdrawFeesEvents?: SubscriptionResolver<Array<ResolversTypes['WithdrawFeesEvent']>, "withdrawFeesEvents", ParentType, ContextType, RequireFields<SubscriptionwithdrawFeesEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  newRoundEvent?: SubscriptionResolver<Maybe<ResolversTypes['NewRoundEvent']>, "newRoundEvent", ParentType, ContextType, RequireFields<SubscriptionnewRoundEventArgs, 'id' | 'subgraphError'>>;
  newRoundEvents?: SubscriptionResolver<Array<ResolversTypes['NewRoundEvent']>, "newRoundEvents", ParentType, ContextType, RequireFields<SubscriptionnewRoundEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  winningTicketRedeemedEvent?: SubscriptionResolver<Maybe<ResolversTypes['WinningTicketRedeemedEvent']>, "winningTicketRedeemedEvent", ParentType, ContextType, RequireFields<SubscriptionwinningTicketRedeemedEventArgs, 'id' | 'subgraphError'>>;
  winningTicketRedeemedEvents?: SubscriptionResolver<Array<ResolversTypes['WinningTicketRedeemedEvent']>, "winningTicketRedeemedEvents", ParentType, ContextType, RequireFields<SubscriptionwinningTicketRedeemedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  depositFundedEvent?: SubscriptionResolver<Maybe<ResolversTypes['DepositFundedEvent']>, "depositFundedEvent", ParentType, ContextType, RequireFields<SubscriptiondepositFundedEventArgs, 'id' | 'subgraphError'>>;
  depositFundedEvents?: SubscriptionResolver<Array<ResolversTypes['DepositFundedEvent']>, "depositFundedEvents", ParentType, ContextType, RequireFields<SubscriptiondepositFundedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reserveFundedEvent?: SubscriptionResolver<Maybe<ResolversTypes['ReserveFundedEvent']>, "reserveFundedEvent", ParentType, ContextType, RequireFields<SubscriptionreserveFundedEventArgs, 'id' | 'subgraphError'>>;
  reserveFundedEvents?: SubscriptionResolver<Array<ResolversTypes['ReserveFundedEvent']>, "reserveFundedEvents", ParentType, ContextType, RequireFields<SubscriptionreserveFundedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  reserveClaimedEvent?: SubscriptionResolver<Maybe<ResolversTypes['ReserveClaimedEvent']>, "reserveClaimedEvent", ParentType, ContextType, RequireFields<SubscriptionreserveClaimedEventArgs, 'id' | 'subgraphError'>>;
  reserveClaimedEvents?: SubscriptionResolver<Array<ResolversTypes['ReserveClaimedEvent']>, "reserveClaimedEvents", ParentType, ContextType, RequireFields<SubscriptionreserveClaimedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawalEvent?: SubscriptionResolver<Maybe<ResolversTypes['WithdrawalEvent']>, "withdrawalEvent", ParentType, ContextType, RequireFields<SubscriptionwithdrawalEventArgs, 'id' | 'subgraphError'>>;
  withdrawalEvents?: SubscriptionResolver<Array<ResolversTypes['WithdrawalEvent']>, "withdrawalEvents", ParentType, ContextType, RequireFields<SubscriptionwithdrawalEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  setCurrentRewardTokensEvent?: SubscriptionResolver<Maybe<ResolversTypes['SetCurrentRewardTokensEvent']>, "setCurrentRewardTokensEvent", ParentType, ContextType, RequireFields<SubscriptionsetCurrentRewardTokensEventArgs, 'id' | 'subgraphError'>>;
  setCurrentRewardTokensEvents?: SubscriptionResolver<Array<ResolversTypes['SetCurrentRewardTokensEvent']>, "setCurrentRewardTokensEvents", ParentType, ContextType, RequireFields<SubscriptionsetCurrentRewardTokensEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pauseEvent?: SubscriptionResolver<Maybe<ResolversTypes['PauseEvent']>, "pauseEvent", ParentType, ContextType, RequireFields<SubscriptionpauseEventArgs, 'id' | 'subgraphError'>>;
  pauseEvents?: SubscriptionResolver<Array<ResolversTypes['PauseEvent']>, "pauseEvents", ParentType, ContextType, RequireFields<SubscriptionpauseEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unpauseEvent?: SubscriptionResolver<Maybe<ResolversTypes['UnpauseEvent']>, "unpauseEvent", ParentType, ContextType, RequireFields<SubscriptionunpauseEventArgs, 'id' | 'subgraphError'>>;
  unpauseEvents?: SubscriptionResolver<Array<ResolversTypes['UnpauseEvent']>, "unpauseEvents", ParentType, ContextType, RequireFields<SubscriptionunpauseEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  parameterUpdateEvent?: SubscriptionResolver<Maybe<ResolversTypes['ParameterUpdateEvent']>, "parameterUpdateEvent", ParentType, ContextType, RequireFields<SubscriptionparameterUpdateEventArgs, 'id' | 'subgraphError'>>;
  parameterUpdateEvents?: SubscriptionResolver<Array<ResolversTypes['ParameterUpdateEvent']>, "parameterUpdateEvents", ParentType, ContextType, RequireFields<SubscriptionparameterUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteEvent?: SubscriptionResolver<Maybe<ResolversTypes['VoteEvent']>, "voteEvent", ParentType, ContextType, RequireFields<SubscriptionvoteEventArgs, 'id' | 'subgraphError'>>;
  voteEvents?: SubscriptionResolver<Array<ResolversTypes['VoteEvent']>, "voteEvents", ParentType, ContextType, RequireFields<SubscriptionvoteEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pollCreatedEvent?: SubscriptionResolver<Maybe<ResolversTypes['PollCreatedEvent']>, "pollCreatedEvent", ParentType, ContextType, RequireFields<SubscriptionpollCreatedEventArgs, 'id' | 'subgraphError'>>;
  pollCreatedEvents?: SubscriptionResolver<Array<ResolversTypes['PollCreatedEvent']>, "pollCreatedEvents", ParentType, ContextType, RequireFields<SubscriptionpollCreatedEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  serviceURIUpdateEvent?: SubscriptionResolver<Maybe<ResolversTypes['ServiceURIUpdateEvent']>, "serviceURIUpdateEvent", ParentType, ContextType, RequireFields<SubscriptionserviceURIUpdateEventArgs, 'id' | 'subgraphError'>>;
  serviceURIUpdateEvents?: SubscriptionResolver<Array<ResolversTypes['ServiceURIUpdateEvent']>, "serviceURIUpdateEvents", ParentType, ContextType, RequireFields<SubscriptionserviceURIUpdateEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  mintEvent?: SubscriptionResolver<Maybe<ResolversTypes['MintEvent']>, "mintEvent", ParentType, ContextType, RequireFields<SubscriptionmintEventArgs, 'id' | 'subgraphError'>>;
  mintEvents?: SubscriptionResolver<Array<ResolversTypes['MintEvent']>, "mintEvents", ParentType, ContextType, RequireFields<SubscriptionmintEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  burnEvent?: SubscriptionResolver<Maybe<ResolversTypes['BurnEvent']>, "burnEvent", ParentType, ContextType, RequireFields<SubscriptionburnEventArgs, 'id' | 'subgraphError'>>;
  burnEvents?: SubscriptionResolver<Array<ResolversTypes['BurnEvent']>, "burnEvents", ParentType, ContextType, RequireFields<SubscriptionburnEventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  event?: SubscriptionResolver<Maybe<ResolversTypes['Event']>, "event", ParentType, ContextType, RequireFields<SubscriptioneventArgs, 'id' | 'subgraphError'>>;
  events?: SubscriptionResolver<Array<ResolversTypes['Event']>, "events", ParentType, ContextType, RequireFields<SubscriptioneventsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BondEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BondEvent'] = ResolversParentTypes['BondEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  bondedAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  additionalAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  newDelegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  oldDelegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BroadcasterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Broadcaster'] = ResolversParentTypes['Broadcaster']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  deposit?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type BurnEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['BurnEvent'] = ResolversParentTypes['BurnEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DayResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Day'] = ResolversParentTypes['Day']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalActiveStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  participationRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DelegatorResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Delegator'] = ResolversParentTypes['Delegator']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  delegate?: Resolver<Maybe<ResolversTypes['Transcoder']>, ParentType, ContextType>;
  startRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastClaimRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  bondedAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  principal?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  unbonded?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  fees?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawnFees?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegatedAmount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  unbondingLocks?: Resolver<Maybe<Array<ResolversTypes['UnbondingLock']>>, ParentType, ContextType, RequireFields<DelegatorunbondingLocksArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DepositFundedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['DepositFundedEvent'] = ResolversParentTypes['DepositFundedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Broadcaster'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EarningsClaimedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['EarningsClaimedEvent'] = ResolversParentTypes['EarningsClaimedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  startRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endRound?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  rewardTokens?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  fees?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  __resolveType: TypeResolveFn<'BondEvent' | 'BurnEvent' | 'DepositFundedEvent' | 'EarningsClaimedEvent' | 'MintEvent' | 'NewRoundEvent' | 'ParameterUpdateEvent' | 'PauseEvent' | 'PollCreatedEvent' | 'RebondEvent' | 'ReserveClaimedEvent' | 'ReserveFundedEvent' | 'RewardEvent' | 'ServiceURIUpdateEvent' | 'SetCurrentRewardTokensEvent' | 'TranscoderActivatedEvent' | 'TranscoderDeactivatedEvent' | 'TranscoderEvictedEvent' | 'TranscoderResignedEvent' | 'TranscoderSlashedEvent' | 'TranscoderUpdateEvent' | 'UnbondEvent' | 'UnpauseEvent' | 'VoteEvent' | 'WinningTicketRedeemedEvent' | 'WithdrawFeesEvent' | 'WithdrawStakeEvent' | 'WithdrawalEvent', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
}>;

export type MintEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['MintEvent'] = ResolversParentTypes['MintEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type NewRoundEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NewRoundEvent'] = ResolversParentTypes['NewRoundEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ParameterUpdateEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ParameterUpdateEvent'] = ResolversParentTypes['ParameterUpdateEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  param?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PauseEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PauseEvent'] = ResolversParentTypes['PauseEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PollResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Poll'] = ResolversParentTypes['Poll']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quorum?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quota?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  tally?: Resolver<Maybe<ResolversTypes['PollTally']>, ParentType, ContextType>;
  votes?: Resolver<Maybe<Array<ResolversTypes['Vote']>>, ParentType, ContextType, RequireFields<PollvotesArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PollCreatedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PollCreatedEvent'] = ResolversParentTypes['PollCreatedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quorum?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  quota?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PollTallyResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PollTally'] = ResolversParentTypes['PollTally']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  yes?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  no?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PoolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Pool'] = ResolversParentTypes['Pool']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  fees?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  rewardTokens?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  totalStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  rewardCut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProtocolResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Protocol'] = ResolversParentTypes['Protocol']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inflation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  inflationChange?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  maxEarningsClaimsRounds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  numActiveTranscoders?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  paused?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  targetBondingRate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unbondingPeriod?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lockPeriod?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  roundLockAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalActiveStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  participationRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  currentRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  lastInitializedRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  lastRoundLengthUpdateRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  roundLength?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastRoundLengthUpdateStartBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  winningTicketCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roundCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pendingActivation?: Resolver<Array<ResolversTypes['Transcoder']>, ParentType, ContextType, RequireFields<ProtocolpendingActivationArgs, 'skip' | 'first'>>;
  pendingDeactivation?: Resolver<Array<ResolversTypes['Transcoder']>, ParentType, ContextType, RequireFields<ProtocolpendingDeactivationArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RebondEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RebondEvent'] = ResolversParentTypes['RebondEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  unbondingLockId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReserveClaimedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ReserveClaimedEvent'] = ResolversParentTypes['ReserveClaimedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  reserveHolder?: Resolver<ResolversTypes['Broadcaster'], ParentType, ContextType>;
  claimant?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReserveFundedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ReserveFundedEvent'] = ResolversParentTypes['ReserveFundedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  reserveHolder?: Resolver<ResolversTypes['Broadcaster'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RewardEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['RewardEvent'] = ResolversParentTypes['RewardEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  rewardTokens?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type RoundResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initialized?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  length?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  startBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  endBlock?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pools?: Resolver<Maybe<Array<ResolversTypes['Pool']>>, ParentType, ContextType, RequireFields<RoundpoolsArgs, 'skip' | 'first'>>;
  mintableTokens?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalActiveStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  participationRate?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  movedStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  newStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ServiceURIUpdateEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ServiceURIUpdateEvent'] = ResolversParentTypes['ServiceURIUpdateEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  addr?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceURI?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetCurrentRewardTokensEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SetCurrentRewardTokensEvent'] = ResolversParentTypes['SetCurrentRewardTokensEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  currentMintableTokens?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  currentInflation?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TransactionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gasUsed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  from?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  events?: Resolver<Maybe<Array<ResolversTypes['Event']>>, ParentType, ContextType, RequireFields<TransactioneventsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Transcoder'] = ResolversParentTypes['Transcoder']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  activationRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  deactivationRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  lastActiveStakeUpdateRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TranscoderStatus'], ParentType, ContextType>;
  lastRewardRound?: Resolver<Maybe<ResolversTypes['Round']>, ParentType, ContextType>;
  rewardCut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  pricePerSegment?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  pendingPricePerSegment?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  pendingRewardCut?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  pendingFeeShare?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  totalStake?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  totalVolumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  pools?: Resolver<Maybe<Array<ResolversTypes['Pool']>>, ParentType, ContextType, RequireFields<TranscoderpoolsArgs, 'skip' | 'first'>>;
  delegators?: Resolver<Maybe<Array<ResolversTypes['Delegator']>>, ParentType, ContextType, RequireFields<TranscoderdelegatorsArgs, 'skip' | 'first'>>;
  delegator?: Resolver<Maybe<ResolversTypes['Delegator']>, ParentType, ContextType>;
  serviceURI?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderActivatedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderActivatedEvent'] = ResolversParentTypes['TranscoderActivatedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  activationRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderDayResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderDay'] = ResolversParentTypes['TranscoderDay']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  volumeETH?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  volumeUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  transcoder?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderDeactivatedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderDeactivatedEvent'] = ResolversParentTypes['TranscoderDeactivatedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  deactivationRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderEvictedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderEvictedEvent'] = ResolversParentTypes['TranscoderEvictedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderResignedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderResignedEvent'] = ResolversParentTypes['TranscoderResignedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderSlashedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderSlashedEvent'] = ResolversParentTypes['TranscoderSlashedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  finder?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  penalty?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  finderReward?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranscoderUpdateEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['TranscoderUpdateEvent'] = ResolversParentTypes['TranscoderUpdateEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  rewardCut?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  feeShare?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnbondEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UnbondEvent'] = ResolversParentTypes['UnbondEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  unbondingLockId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnbondingLockResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UnbondingLock'] = ResolversParentTypes['UnbondingLock']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  unbondingLockId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  delegate?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  withdrawRound?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnpauseEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['UnpauseEvent'] = ResolversParentTypes['UnpauseEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  voteStake?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  nonVoteStake?: Resolver<Maybe<ResolversTypes['BigDecimal']>, ParentType, ContextType>;
  choiceID?: Resolver<Maybe<ResolversTypes['PollChoice']>, ParentType, ContextType>;
  poll?: Resolver<Maybe<ResolversTypes['Poll']>, ParentType, ContextType>;
  registeredTranscoder?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VoteEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VoteEvent'] = ResolversParentTypes['VoteEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  choiceID?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  poll?: Resolver<ResolversTypes['Poll'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WinningTicketRedeemedEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WinningTicketRedeemedEvent'] = ResolversParentTypes['WinningTicketRedeemedEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Broadcaster'], ParentType, ContextType>;
  recipient?: Resolver<ResolversTypes['Transcoder'], ParentType, ContextType>;
  faceValue?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  faceValueUSD?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  winProb?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  senderNonce?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  recipientRand?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  auxData?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawFeesEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WithdrawFeesEvent'] = ResolversParentTypes['WithdrawFeesEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawStakeEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WithdrawStakeEvent'] = ResolversParentTypes['WithdrawStakeEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  delegator?: Resolver<ResolversTypes['Delegator'], ParentType, ContextType>;
  unbondingLockId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawalEventResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WithdrawalEvent'] = ResolversParentTypes['WithdrawalEvent']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transaction?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  round?: Resolver<ResolversTypes['Round'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['Broadcaster'], ParentType, ContextType>;
  deposit?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  reserve?: Resolver<ResolversTypes['BigDecimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  chainName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subgraphUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  BondEvent?: BondEventResolvers<ContextType>;
  Broadcaster?: BroadcasterResolvers<ContextType>;
  BurnEvent?: BurnEventResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Day?: DayResolvers<ContextType>;
  Delegator?: DelegatorResolvers<ContextType>;
  DepositFundedEvent?: DepositFundedEventResolvers<ContextType>;
  EarningsClaimedEvent?: EarningsClaimedEventResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  MintEvent?: MintEventResolvers<ContextType>;
  NewRoundEvent?: NewRoundEventResolvers<ContextType>;
  ParameterUpdateEvent?: ParameterUpdateEventResolvers<ContextType>;
  PauseEvent?: PauseEventResolvers<ContextType>;
  Poll?: PollResolvers<ContextType>;
  PollCreatedEvent?: PollCreatedEventResolvers<ContextType>;
  PollTally?: PollTallyResolvers<ContextType>;
  Pool?: PoolResolvers<ContextType>;
  Protocol?: ProtocolResolvers<ContextType>;
  RebondEvent?: RebondEventResolvers<ContextType>;
  ReserveClaimedEvent?: ReserveClaimedEventResolvers<ContextType>;
  ReserveFundedEvent?: ReserveFundedEventResolvers<ContextType>;
  RewardEvent?: RewardEventResolvers<ContextType>;
  Round?: RoundResolvers<ContextType>;
  ServiceURIUpdateEvent?: ServiceURIUpdateEventResolvers<ContextType>;
  SetCurrentRewardTokensEvent?: SetCurrentRewardTokensEventResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  Transcoder?: TranscoderResolvers<ContextType>;
  TranscoderActivatedEvent?: TranscoderActivatedEventResolvers<ContextType>;
  TranscoderDay?: TranscoderDayResolvers<ContextType>;
  TranscoderDeactivatedEvent?: TranscoderDeactivatedEventResolvers<ContextType>;
  TranscoderEvictedEvent?: TranscoderEvictedEventResolvers<ContextType>;
  TranscoderResignedEvent?: TranscoderResignedEventResolvers<ContextType>;
  TranscoderSlashedEvent?: TranscoderSlashedEventResolvers<ContextType>;
  TranscoderUpdateEvent?: TranscoderUpdateEventResolvers<ContextType>;
  UnbondEvent?: UnbondEventResolvers<ContextType>;
  UnbondingLock?: UnbondingLockResolvers<ContextType>;
  UnpauseEvent?: UnpauseEventResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VoteEvent?: VoteEventResolvers<ContextType>;
  WinningTicketRedeemedEvent?: WinningTicketRedeemedEventResolvers<ContextType>;
  WithdrawFeesEvent?: WithdrawFeesEventResolvers<ContextType>;
  WithdrawStakeEvent?: WithdrawStakeEventResolvers<ContextType>;
  WithdrawalEvent?: WithdrawalEventResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;


export type MeshContext = TidvContext & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn = (moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/tidv/introspectionSchema":
      return import("./sources/tidv/introspectionSchema");
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources = [];
const transforms = [];
const additionalEnvelopPlugins = [];
const tidvTransforms = [];
const tidvHandler = new GraphqlHandler({
              name: "tidv",
              config: {"endpoint":"https://{context.indexer_url:gateway.thegraph.com/api/408304b8f418be03f0c0aa1bcc4282fe/subgraphs/id/FDD65maya4xVfPnCjSgDRBz6UBWKAcmGtgY6BmUueJCg}","chainName":{"context.chainName":null}},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("tidv"),
              logger: logger.child("tidv"),
              importFn,
            });
sources[0] = {
          name: 'tidv',
          handler: tidvHandler,
          transforms: tidvTransforms
        }
const additionalTypeDefs = [parse("extend type _Meta_ {\n  chainName: String!\n  subgraphUrl: String!\n}"),] as any[];
const additionalResolvers = await Promise.all([
        import("../graph/resolvers.ts")
            .then(m => m.resolvers || m.default || m)
      ]);
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetSubgraphStatusDocument,
        get rawSDL() {
          return printWithCache(GetSubgraphStatusDocument);
        },
        location: 'GetSubgraphStatusDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler() {
  return createMeshHTTPHandler({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance<MeshContext>>;

export function getBuiltGraphClient(): Promise<MeshInstance<MeshContext>> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh<MeshContext>(meshOptions)).then(mesh => {
      const id$ = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        id$.then(id => mesh.pubsub.unsubscribe(id)).catch(err => console.error(err));
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type getSubgraphStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type getSubgraphStatusQuery = { _meta?: Maybe<{ block: Pick<_Block_, 'hash' | 'number'> }> };


export const getSubgraphStatusDocument = gql`
    query getSubgraphStatus {
  _meta {
    block {
      hash
      number
    }
  }
}
    ` as unknown as DocumentNode<getSubgraphStatusQuery, getSubgraphStatusQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    getSubgraphStatus(variables?: getSubgraphStatusQueryVariables, options?: C): Promise<getSubgraphStatusQuery> {
      return requester<getSubgraphStatusQuery, getSubgraphStatusQueryVariables>(getSubgraphStatusDocument, variables, options) as Promise<getSubgraphStatusQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;