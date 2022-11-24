// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace TidvTypes {
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

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type CollectedFeesDay = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  amount: Scalars['BigDecimal'];
};

export type CollectedFeesDay_filter = {
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

export type CollectedFeesDay_orderBy =
  | 'id'
  | 'date'
  | 'amount';

export type Delegate = {
  id: Scalars['ID'];
  factory: DelegateFactory;
  swap: SwapContract;
  indexer: Indexer;
  owner: User;
  tradeWallet: Scalars['Bytes'];
};

export type DelegateFactory = {
  id: Scalars['ID'];
};

export type DelegateFactory_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type DelegateFactory_orderBy =
  | 'id';

export type Delegate_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  factory?: InputMaybe<Scalars['String']>;
  factory_not?: InputMaybe<Scalars['String']>;
  factory_gt?: InputMaybe<Scalars['String']>;
  factory_lt?: InputMaybe<Scalars['String']>;
  factory_gte?: InputMaybe<Scalars['String']>;
  factory_lte?: InputMaybe<Scalars['String']>;
  factory_in?: InputMaybe<Array<Scalars['String']>>;
  factory_not_in?: InputMaybe<Array<Scalars['String']>>;
  factory_contains?: InputMaybe<Scalars['String']>;
  factory_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_not_contains?: InputMaybe<Scalars['String']>;
  factory_not_contains_nocase?: InputMaybe<Scalars['String']>;
  factory_starts_with?: InputMaybe<Scalars['String']>;
  factory_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_starts_with?: InputMaybe<Scalars['String']>;
  factory_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  factory_ends_with?: InputMaybe<Scalars['String']>;
  factory_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_not_ends_with?: InputMaybe<Scalars['String']>;
  factory_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  factory_?: InputMaybe<DelegateFactory_filter>;
  swap?: InputMaybe<Scalars['String']>;
  swap_not?: InputMaybe<Scalars['String']>;
  swap_gt?: InputMaybe<Scalars['String']>;
  swap_lt?: InputMaybe<Scalars['String']>;
  swap_gte?: InputMaybe<Scalars['String']>;
  swap_lte?: InputMaybe<Scalars['String']>;
  swap_in?: InputMaybe<Array<Scalars['String']>>;
  swap_not_in?: InputMaybe<Array<Scalars['String']>>;
  swap_contains?: InputMaybe<Scalars['String']>;
  swap_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_not_contains?: InputMaybe<Scalars['String']>;
  swap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_starts_with?: InputMaybe<Scalars['String']>;
  swap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_starts_with?: InputMaybe<Scalars['String']>;
  swap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_ends_with?: InputMaybe<Scalars['String']>;
  swap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_ends_with?: InputMaybe<Scalars['String']>;
  swap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_?: InputMaybe<SwapContract_filter>;
  indexer?: InputMaybe<Scalars['String']>;
  indexer_not?: InputMaybe<Scalars['String']>;
  indexer_gt?: InputMaybe<Scalars['String']>;
  indexer_lt?: InputMaybe<Scalars['String']>;
  indexer_gte?: InputMaybe<Scalars['String']>;
  indexer_lte?: InputMaybe<Scalars['String']>;
  indexer_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_contains?: InputMaybe<Scalars['String']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_contains?: InputMaybe<Scalars['String']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_starts_with?: InputMaybe<Scalars['String']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_ends_with?: InputMaybe<Scalars['String']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_?: InputMaybe<Indexer_filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<User_filter>;
  tradeWallet?: InputMaybe<Scalars['Bytes']>;
  tradeWallet_not?: InputMaybe<Scalars['Bytes']>;
  tradeWallet_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tradeWallet_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tradeWallet_contains?: InputMaybe<Scalars['Bytes']>;
  tradeWallet_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Delegate_orderBy =
  | 'id'
  | 'factory'
  | 'swap'
  | 'indexer'
  | 'owner'
  | 'tradeWallet';

export type EnabledRoot = {
  id: Scalars['ID'];
  pool: Pool;
  root: Scalars['Bytes'];
};

export type EnabledRoot_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  root?: InputMaybe<Scalars['Bytes']>;
  root_not?: InputMaybe<Scalars['Bytes']>;
  root_in?: InputMaybe<Array<Scalars['Bytes']>>;
  root_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  root_contains?: InputMaybe<Scalars['Bytes']>;
  root_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type EnabledRoot_orderBy =
  | 'id'
  | 'pool'
  | 'root';

export type Index = {
  id: Scalars['ID'];
  indexer: Indexer;
  signerToken: Token;
  senderToken: Token;
  protocol: Scalars['Bytes'];
};

export type Index_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  indexer?: InputMaybe<Scalars['String']>;
  indexer_not?: InputMaybe<Scalars['String']>;
  indexer_gt?: InputMaybe<Scalars['String']>;
  indexer_lt?: InputMaybe<Scalars['String']>;
  indexer_gte?: InputMaybe<Scalars['String']>;
  indexer_lte?: InputMaybe<Scalars['String']>;
  indexer_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_contains?: InputMaybe<Scalars['String']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_contains?: InputMaybe<Scalars['String']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_starts_with?: InputMaybe<Scalars['String']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_ends_with?: InputMaybe<Scalars['String']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_?: InputMaybe<Indexer_filter>;
  signerToken?: InputMaybe<Scalars['String']>;
  signerToken_not?: InputMaybe<Scalars['String']>;
  signerToken_gt?: InputMaybe<Scalars['String']>;
  signerToken_lt?: InputMaybe<Scalars['String']>;
  signerToken_gte?: InputMaybe<Scalars['String']>;
  signerToken_lte?: InputMaybe<Scalars['String']>;
  signerToken_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_contains?: InputMaybe<Scalars['String']>;
  signerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_contains?: InputMaybe<Scalars['String']>;
  signerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_?: InputMaybe<Token_filter>;
  senderToken?: InputMaybe<Scalars['String']>;
  senderToken_not?: InputMaybe<Scalars['String']>;
  senderToken_gt?: InputMaybe<Scalars['String']>;
  senderToken_lt?: InputMaybe<Scalars['String']>;
  senderToken_gte?: InputMaybe<Scalars['String']>;
  senderToken_lte?: InputMaybe<Scalars['String']>;
  senderToken_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_contains?: InputMaybe<Scalars['String']>;
  senderToken_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_contains?: InputMaybe<Scalars['String']>;
  senderToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_?: InputMaybe<Token_filter>;
  protocol?: InputMaybe<Scalars['Bytes']>;
  protocol_not?: InputMaybe<Scalars['Bytes']>;
  protocol_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_contains?: InputMaybe<Scalars['Bytes']>;
  protocol_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Index_orderBy =
  | 'id'
  | 'indexer'
  | 'signerToken'
  | 'senderToken'
  | 'protocol';

export type Indexer = {
  id: Scalars['ID'];
};

export type Indexer_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Indexer_orderBy =
  | 'id';

export type Locator = {
  id: Scalars['ID'];
  owner: User;
  index: Index;
  score: Scalars['BigInt'];
  locator: Scalars['Bytes'];
};

export type Locator_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<User_filter>;
  index?: InputMaybe<Scalars['String']>;
  index_not?: InputMaybe<Scalars['String']>;
  index_gt?: InputMaybe<Scalars['String']>;
  index_lt?: InputMaybe<Scalars['String']>;
  index_gte?: InputMaybe<Scalars['String']>;
  index_lte?: InputMaybe<Scalars['String']>;
  index_in?: InputMaybe<Array<Scalars['String']>>;
  index_not_in?: InputMaybe<Array<Scalars['String']>>;
  index_contains?: InputMaybe<Scalars['String']>;
  index_contains_nocase?: InputMaybe<Scalars['String']>;
  index_not_contains?: InputMaybe<Scalars['String']>;
  index_not_contains_nocase?: InputMaybe<Scalars['String']>;
  index_starts_with?: InputMaybe<Scalars['String']>;
  index_starts_with_nocase?: InputMaybe<Scalars['String']>;
  index_not_starts_with?: InputMaybe<Scalars['String']>;
  index_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  index_ends_with?: InputMaybe<Scalars['String']>;
  index_ends_with_nocase?: InputMaybe<Scalars['String']>;
  index_not_ends_with?: InputMaybe<Scalars['String']>;
  index_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  index_?: InputMaybe<Index_filter>;
  score?: InputMaybe<Scalars['BigInt']>;
  score_not?: InputMaybe<Scalars['BigInt']>;
  score_gt?: InputMaybe<Scalars['BigInt']>;
  score_lt?: InputMaybe<Scalars['BigInt']>;
  score_gte?: InputMaybe<Scalars['BigInt']>;
  score_lte?: InputMaybe<Scalars['BigInt']>;
  score_in?: InputMaybe<Array<Scalars['BigInt']>>;
  score_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  locator?: InputMaybe<Scalars['Bytes']>;
  locator_not?: InputMaybe<Scalars['Bytes']>;
  locator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  locator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  locator_contains?: InputMaybe<Scalars['Bytes']>;
  locator_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Locator_orderBy =
  | 'id'
  | 'owner'
  | 'index'
  | 'score'
  | 'locator';

export type Locker = {
  id: Scalars['ID'];
  throttlingPercentage?: Maybe<Scalars['BigInt']>;
  throttlingDuration?: Maybe<Scalars['BigInt']>;
  throttlingBalance?: Maybe<Scalars['BigInt']>;
};

export type Locker_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  throttlingPercentage?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_not?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_gt?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_lt?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_gte?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_lte?: InputMaybe<Scalars['BigInt']>;
  throttlingPercentage_in?: InputMaybe<Array<Scalars['BigInt']>>;
  throttlingPercentage_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  throttlingDuration?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_not?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_gt?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_lt?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_gte?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_lte?: InputMaybe<Scalars['BigInt']>;
  throttlingDuration_in?: InputMaybe<Array<Scalars['BigInt']>>;
  throttlingDuration_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  throttlingBalance?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_not?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_gt?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_lt?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_gte?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_lte?: InputMaybe<Scalars['BigInt']>;
  throttlingBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  throttlingBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Locker_orderBy =
  | 'id'
  | 'throttlingPercentage'
  | 'throttlingDuration'
  | 'throttlingBalance';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Pool = {
  id: Scalars['ID'];
  scale?: Maybe<Scalars['BigInt']>;
  max?: Maybe<Scalars['BigInt']>;
  roots: Array<Scalars['Bytes']>;
};

export type PoolClaim = {
  id: Scalars['ID'];
  pool: Pool;
  transactionHash: Scalars['Bytes'];
  user: User;
  token: Token;
  amount: Scalars['BigInt'];
};

export type PoolClaim_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  pool_?: InputMaybe<Pool_filter>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  user?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_filter>;
  token?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_contains_nocase?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token_?: InputMaybe<Token_filter>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type PoolClaim_orderBy =
  | 'id'
  | 'pool'
  | 'transactionHash'
  | 'user'
  | 'token'
  | 'amount';

export type Pool_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  scale?: InputMaybe<Scalars['BigInt']>;
  scale_not?: InputMaybe<Scalars['BigInt']>;
  scale_gt?: InputMaybe<Scalars['BigInt']>;
  scale_lt?: InputMaybe<Scalars['BigInt']>;
  scale_gte?: InputMaybe<Scalars['BigInt']>;
  scale_lte?: InputMaybe<Scalars['BigInt']>;
  scale_in?: InputMaybe<Array<Scalars['BigInt']>>;
  scale_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  max?: InputMaybe<Scalars['BigInt']>;
  max_not?: InputMaybe<Scalars['BigInt']>;
  max_gt?: InputMaybe<Scalars['BigInt']>;
  max_lt?: InputMaybe<Scalars['BigInt']>;
  max_gte?: InputMaybe<Scalars['BigInt']>;
  max_lte?: InputMaybe<Scalars['BigInt']>;
  max_in?: InputMaybe<Array<Scalars['BigInt']>>;
  max_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  roots?: InputMaybe<Array<Scalars['Bytes']>>;
  roots_not?: InputMaybe<Array<Scalars['Bytes']>>;
  roots_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  roots_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  roots_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  roots_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Pool_orderBy =
  | 'id'
  | 'scale'
  | 'max'
  | 'roots';

export type Query = {
  user?: Maybe<User>;
  users: Array<User>;
  swapContract?: Maybe<SwapContract>;
  swapContracts: Array<SwapContract>;
  swapLightContract?: Maybe<SwapLightContract>;
  swapLightContracts: Array<SwapLightContract>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  swapLight?: Maybe<SwapLight>;
  swapLights: Array<SwapLight>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  indexer?: Maybe<Indexer>;
  indexers: Array<Indexer>;
  index?: Maybe<Index>;
  indexes: Array<Index>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  locator?: Maybe<Locator>;
  locators: Array<Locator>;
  delegateFactory?: Maybe<DelegateFactory>;
  delegateFactories: Array<DelegateFactory>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  rule?: Maybe<Rule>;
  rules: Array<Rule>;
  locker?: Maybe<Locker>;
  lockers: Array<Locker>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolClaim?: Maybe<PoolClaim>;
  poolClaims: Array<PoolClaim>;
  enabledRoot?: Maybe<EnabledRoot>;
  enabledRoots: Array<EnabledRoot>;
  collectedFeesDay?: Maybe<CollectedFeesDay>;
  collectedFeesDays: Array<CollectedFeesDay>;
  volumeDay?: Maybe<VolumeDay>;
  volumeDays: Array<VolumeDay>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapLightContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapLightContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapLightContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapLightContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapLightArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryswapLightsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapLight_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapLight_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerytokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Indexer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Indexer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryindexesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Index_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Index_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Stake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylocatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylocatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Locator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateFactoryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateFactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateFactory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateFactory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerydelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryruleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryrulesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rule_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Rule_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylockerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerylockersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Locker_filter>;
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


export type QuerypoolClaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypoolClaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolClaim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolClaim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryenabledRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryenabledRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EnabledRoot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EnabledRoot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectedFeesDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerycollectedFeesDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectedFeesDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectedFeesDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvolumeDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvolumeDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VolumeDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VolumeDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Rule = {
  id: Scalars['ID'];
  delegate: Delegate;
  owner: User;
  signerToken: Token;
  senderToken: Token;
  maxSenderAmount: Scalars['BigInt'];
  priceCoef: Scalars['BigInt'];
  priceExp: Scalars['BigInt'];
};

export type Rule_filter = {
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
  delegate_?: InputMaybe<Delegate_filter>;
  owner?: InputMaybe<Scalars['String']>;
  owner_not?: InputMaybe<Scalars['String']>;
  owner_gt?: InputMaybe<Scalars['String']>;
  owner_lt?: InputMaybe<Scalars['String']>;
  owner_gte?: InputMaybe<Scalars['String']>;
  owner_lte?: InputMaybe<Scalars['String']>;
  owner_in?: InputMaybe<Array<Scalars['String']>>;
  owner_not_in?: InputMaybe<Array<Scalars['String']>>;
  owner_contains?: InputMaybe<Scalars['String']>;
  owner_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_not_contains?: InputMaybe<Scalars['String']>;
  owner_not_contains_nocase?: InputMaybe<Scalars['String']>;
  owner_starts_with?: InputMaybe<Scalars['String']>;
  owner_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_starts_with?: InputMaybe<Scalars['String']>;
  owner_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner_ends_with?: InputMaybe<Scalars['String']>;
  owner_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_not_ends_with?: InputMaybe<Scalars['String']>;
  owner_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  owner_?: InputMaybe<User_filter>;
  signerToken?: InputMaybe<Scalars['String']>;
  signerToken_not?: InputMaybe<Scalars['String']>;
  signerToken_gt?: InputMaybe<Scalars['String']>;
  signerToken_lt?: InputMaybe<Scalars['String']>;
  signerToken_gte?: InputMaybe<Scalars['String']>;
  signerToken_lte?: InputMaybe<Scalars['String']>;
  signerToken_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_contains?: InputMaybe<Scalars['String']>;
  signerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_contains?: InputMaybe<Scalars['String']>;
  signerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_?: InputMaybe<Token_filter>;
  senderToken?: InputMaybe<Scalars['String']>;
  senderToken_not?: InputMaybe<Scalars['String']>;
  senderToken_gt?: InputMaybe<Scalars['String']>;
  senderToken_lt?: InputMaybe<Scalars['String']>;
  senderToken_gte?: InputMaybe<Scalars['String']>;
  senderToken_lte?: InputMaybe<Scalars['String']>;
  senderToken_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_contains?: InputMaybe<Scalars['String']>;
  senderToken_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_contains?: InputMaybe<Scalars['String']>;
  senderToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_?: InputMaybe<Token_filter>;
  maxSenderAmount?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_not?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_gt?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_lt?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_gte?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_lte?: InputMaybe<Scalars['BigInt']>;
  maxSenderAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  maxSenderAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceCoef?: InputMaybe<Scalars['BigInt']>;
  priceCoef_not?: InputMaybe<Scalars['BigInt']>;
  priceCoef_gt?: InputMaybe<Scalars['BigInt']>;
  priceCoef_lt?: InputMaybe<Scalars['BigInt']>;
  priceCoef_gte?: InputMaybe<Scalars['BigInt']>;
  priceCoef_lte?: InputMaybe<Scalars['BigInt']>;
  priceCoef_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceCoef_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceExp?: InputMaybe<Scalars['BigInt']>;
  priceExp_not?: InputMaybe<Scalars['BigInt']>;
  priceExp_gt?: InputMaybe<Scalars['BigInt']>;
  priceExp_lt?: InputMaybe<Scalars['BigInt']>;
  priceExp_gte?: InputMaybe<Scalars['BigInt']>;
  priceExp_lte?: InputMaybe<Scalars['BigInt']>;
  priceExp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  priceExp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Rule_orderBy =
  | 'id'
  | 'delegate'
  | 'owner'
  | 'signerToken'
  | 'senderToken'
  | 'maxSenderAmount'
  | 'priceCoef'
  | 'priceExp';

export type Stake = {
  id: Scalars['ID'];
  indexer: Indexer;
  staker: User;
  signerToken: Token;
  senderToken: Token;
  protocol: Scalars['Bytes'];
  stakeAmount: Scalars['BigInt'];
};

export type Stake_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  indexer?: InputMaybe<Scalars['String']>;
  indexer_not?: InputMaybe<Scalars['String']>;
  indexer_gt?: InputMaybe<Scalars['String']>;
  indexer_lt?: InputMaybe<Scalars['String']>;
  indexer_gte?: InputMaybe<Scalars['String']>;
  indexer_lte?: InputMaybe<Scalars['String']>;
  indexer_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_not_in?: InputMaybe<Array<Scalars['String']>>;
  indexer_contains?: InputMaybe<Scalars['String']>;
  indexer_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_contains?: InputMaybe<Scalars['String']>;
  indexer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  indexer_starts_with?: InputMaybe<Scalars['String']>;
  indexer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with?: InputMaybe<Scalars['String']>;
  indexer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_ends_with?: InputMaybe<Scalars['String']>;
  indexer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with?: InputMaybe<Scalars['String']>;
  indexer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  indexer_?: InputMaybe<Indexer_filter>;
  staker?: InputMaybe<Scalars['String']>;
  staker_not?: InputMaybe<Scalars['String']>;
  staker_gt?: InputMaybe<Scalars['String']>;
  staker_lt?: InputMaybe<Scalars['String']>;
  staker_gte?: InputMaybe<Scalars['String']>;
  staker_lte?: InputMaybe<Scalars['String']>;
  staker_in?: InputMaybe<Array<Scalars['String']>>;
  staker_not_in?: InputMaybe<Array<Scalars['String']>>;
  staker_contains?: InputMaybe<Scalars['String']>;
  staker_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_not_contains?: InputMaybe<Scalars['String']>;
  staker_not_contains_nocase?: InputMaybe<Scalars['String']>;
  staker_starts_with?: InputMaybe<Scalars['String']>;
  staker_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_starts_with?: InputMaybe<Scalars['String']>;
  staker_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  staker_ends_with?: InputMaybe<Scalars['String']>;
  staker_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_not_ends_with?: InputMaybe<Scalars['String']>;
  staker_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  staker_?: InputMaybe<User_filter>;
  signerToken?: InputMaybe<Scalars['String']>;
  signerToken_not?: InputMaybe<Scalars['String']>;
  signerToken_gt?: InputMaybe<Scalars['String']>;
  signerToken_lt?: InputMaybe<Scalars['String']>;
  signerToken_gte?: InputMaybe<Scalars['String']>;
  signerToken_lte?: InputMaybe<Scalars['String']>;
  signerToken_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_contains?: InputMaybe<Scalars['String']>;
  signerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_contains?: InputMaybe<Scalars['String']>;
  signerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_?: InputMaybe<Token_filter>;
  senderToken?: InputMaybe<Scalars['String']>;
  senderToken_not?: InputMaybe<Scalars['String']>;
  senderToken_gt?: InputMaybe<Scalars['String']>;
  senderToken_lt?: InputMaybe<Scalars['String']>;
  senderToken_gte?: InputMaybe<Scalars['String']>;
  senderToken_lte?: InputMaybe<Scalars['String']>;
  senderToken_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_contains?: InputMaybe<Scalars['String']>;
  senderToken_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_contains?: InputMaybe<Scalars['String']>;
  senderToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_?: InputMaybe<Token_filter>;
  protocol?: InputMaybe<Scalars['Bytes']>;
  protocol_not?: InputMaybe<Scalars['Bytes']>;
  protocol_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  protocol_contains?: InputMaybe<Scalars['Bytes']>;
  protocol_not_contains?: InputMaybe<Scalars['Bytes']>;
  stakeAmount?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_not?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_gt?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_lt?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_gte?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_lte?: InputMaybe<Scalars['BigInt']>;
  stakeAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakeAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Stake_orderBy =
  | 'id'
  | 'indexer'
  | 'staker'
  | 'signerToken'
  | 'senderToken'
  | 'protocol'
  | 'stakeAmount';

export type Subscription = {
  user?: Maybe<User>;
  users: Array<User>;
  swapContract?: Maybe<SwapContract>;
  swapContracts: Array<SwapContract>;
  swapLightContract?: Maybe<SwapLightContract>;
  swapLightContracts: Array<SwapLightContract>;
  swap?: Maybe<Swap>;
  swaps: Array<Swap>;
  swapLight?: Maybe<SwapLight>;
  swapLights: Array<SwapLight>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  indexer?: Maybe<Indexer>;
  indexers: Array<Indexer>;
  index?: Maybe<Index>;
  indexes: Array<Index>;
  stake?: Maybe<Stake>;
  stakes: Array<Stake>;
  locator?: Maybe<Locator>;
  locators: Array<Locator>;
  delegateFactory?: Maybe<DelegateFactory>;
  delegateFactories: Array<DelegateFactory>;
  delegate?: Maybe<Delegate>;
  delegates: Array<Delegate>;
  rule?: Maybe<Rule>;
  rules: Array<Rule>;
  locker?: Maybe<Locker>;
  lockers: Array<Locker>;
  pool?: Maybe<Pool>;
  pools: Array<Pool>;
  poolClaim?: Maybe<PoolClaim>;
  poolClaims: Array<PoolClaim>;
  enabledRoot?: Maybe<EnabledRoot>;
  enabledRoots: Array<EnabledRoot>;
  collectedFeesDay?: Maybe<CollectedFeesDay>;
  collectedFeesDays: Array<CollectedFeesDay>;
  volumeDay?: Maybe<VolumeDay>;
  volumeDays: Array<VolumeDay>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionuserArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionusersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapLightContractArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapLightContractsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapLightContract_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapLightContract_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Swap_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Swap_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapLightArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionswapLightsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SwapLight_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SwapLight_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokenArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiontokensArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Token_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Indexer_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Indexer_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionindexesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Index_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Index_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Stake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Stake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlocatorArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlocatorsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locator_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Locator_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateFactoryArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateFactoriesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DelegateFactory_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<DelegateFactory_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegateArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiondelegatesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Delegate_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Delegate_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionruleArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionrulesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Rule_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Rule_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlockerArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionlockersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Locker_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Locker_filter>;
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


export type SubscriptionpoolClaimArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpoolClaimsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolClaim_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PoolClaim_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionenabledRootArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionenabledRootsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EnabledRoot_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<EnabledRoot_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectedFeesDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioncollectedFeesDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<CollectedFeesDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<CollectedFeesDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvolumeDayArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvolumeDaysArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VolumeDay_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VolumeDay_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Swap = {
  id: Scalars['ID'];
  swap: SwapContract;
  block?: Maybe<Scalars['BigInt']>;
  transactionHash?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  from?: Maybe<Scalars['Bytes']>;
  to?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  expiry?: Maybe<Scalars['BigInt']>;
  signer?: Maybe<User>;
  signerAmount?: Maybe<Scalars['BigInt']>;
  signerId?: Maybe<Scalars['BigInt']>;
  signerToken?: Maybe<Token>;
  sender?: Maybe<User>;
  senderAmount?: Maybe<Scalars['BigInt']>;
  senderId?: Maybe<Scalars['BigInt']>;
  senderToken?: Maybe<Token>;
  affiliate?: Maybe<User>;
  affiliateAmount?: Maybe<Scalars['BigInt']>;
  affiliateId?: Maybe<Scalars['BigInt']>;
  affiliateToken?: Maybe<Token>;
};

export type SwapContract = {
  id: Scalars['ID'];
};

export type SwapContract_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SwapContract_orderBy =
  | 'id';

export type SwapLight = {
  id: Scalars['ID'];
  swap: SwapLightContract;
  block?: Maybe<Scalars['BigInt']>;
  transactionHash?: Maybe<Scalars['Bytes']>;
  timestamp?: Maybe<Scalars['BigInt']>;
  from?: Maybe<Scalars['Bytes']>;
  to?: Maybe<Scalars['Bytes']>;
  value?: Maybe<Scalars['BigInt']>;
  nonce?: Maybe<Scalars['BigInt']>;
  expiry?: Maybe<Scalars['BigInt']>;
  signer?: Maybe<User>;
  signerAmount?: Maybe<Scalars['BigInt']>;
  signerToken?: Maybe<Token>;
  signerFee?: Maybe<Scalars['BigInt']>;
  sender?: Maybe<User>;
  senderAmount?: Maybe<Scalars['BigInt']>;
  senderToken?: Maybe<Token>;
  swapValueUsd?: Maybe<Scalars['BigInt']>;
  feeValueUsd?: Maybe<Scalars['BigInt']>;
};

export type SwapLightContract = {
  id: Scalars['ID'];
};

export type SwapLightContract_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SwapLightContract_orderBy =
  | 'id';

export type SwapLight_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  swap?: InputMaybe<Scalars['String']>;
  swap_not?: InputMaybe<Scalars['String']>;
  swap_gt?: InputMaybe<Scalars['String']>;
  swap_lt?: InputMaybe<Scalars['String']>;
  swap_gte?: InputMaybe<Scalars['String']>;
  swap_lte?: InputMaybe<Scalars['String']>;
  swap_in?: InputMaybe<Array<Scalars['String']>>;
  swap_not_in?: InputMaybe<Array<Scalars['String']>>;
  swap_contains?: InputMaybe<Scalars['String']>;
  swap_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_not_contains?: InputMaybe<Scalars['String']>;
  swap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_starts_with?: InputMaybe<Scalars['String']>;
  swap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_starts_with?: InputMaybe<Scalars['String']>;
  swap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_ends_with?: InputMaybe<Scalars['String']>;
  swap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_ends_with?: InputMaybe<Scalars['String']>;
  swap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_?: InputMaybe<SwapLightContract_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry?: InputMaybe<Scalars['BigInt']>;
  expiry_not?: InputMaybe<Scalars['BigInt']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']>;
  expiry_lt?: InputMaybe<Scalars['BigInt']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']>;
  expiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signer?: InputMaybe<Scalars['String']>;
  signer_not?: InputMaybe<Scalars['String']>;
  signer_gt?: InputMaybe<Scalars['String']>;
  signer_lt?: InputMaybe<Scalars['String']>;
  signer_gte?: InputMaybe<Scalars['String']>;
  signer_lte?: InputMaybe<Scalars['String']>;
  signer_in?: InputMaybe<Array<Scalars['String']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']>>;
  signer_contains?: InputMaybe<Scalars['String']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']>;
  signer_not_contains?: InputMaybe<Scalars['String']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signer_starts_with?: InputMaybe<Scalars['String']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signer_ends_with?: InputMaybe<Scalars['String']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signer_?: InputMaybe<User_filter>;
  signerAmount?: InputMaybe<Scalars['BigInt']>;
  signerAmount_not?: InputMaybe<Scalars['BigInt']>;
  signerAmount_gt?: InputMaybe<Scalars['BigInt']>;
  signerAmount_lt?: InputMaybe<Scalars['BigInt']>;
  signerAmount_gte?: InputMaybe<Scalars['BigInt']>;
  signerAmount_lte?: InputMaybe<Scalars['BigInt']>;
  signerAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerToken?: InputMaybe<Scalars['String']>;
  signerToken_not?: InputMaybe<Scalars['String']>;
  signerToken_gt?: InputMaybe<Scalars['String']>;
  signerToken_lt?: InputMaybe<Scalars['String']>;
  signerToken_gte?: InputMaybe<Scalars['String']>;
  signerToken_lte?: InputMaybe<Scalars['String']>;
  signerToken_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_contains?: InputMaybe<Scalars['String']>;
  signerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_contains?: InputMaybe<Scalars['String']>;
  signerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_?: InputMaybe<Token_filter>;
  signerFee?: InputMaybe<Scalars['BigInt']>;
  signerFee_not?: InputMaybe<Scalars['BigInt']>;
  signerFee_gt?: InputMaybe<Scalars['BigInt']>;
  signerFee_lt?: InputMaybe<Scalars['BigInt']>;
  signerFee_gte?: InputMaybe<Scalars['BigInt']>;
  signerFee_lte?: InputMaybe<Scalars['BigInt']>;
  signerFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  sender_?: InputMaybe<User_filter>;
  senderAmount?: InputMaybe<Scalars['BigInt']>;
  senderAmount_not?: InputMaybe<Scalars['BigInt']>;
  senderAmount_gt?: InputMaybe<Scalars['BigInt']>;
  senderAmount_lt?: InputMaybe<Scalars['BigInt']>;
  senderAmount_gte?: InputMaybe<Scalars['BigInt']>;
  senderAmount_lte?: InputMaybe<Scalars['BigInt']>;
  senderAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderToken?: InputMaybe<Scalars['String']>;
  senderToken_not?: InputMaybe<Scalars['String']>;
  senderToken_gt?: InputMaybe<Scalars['String']>;
  senderToken_lt?: InputMaybe<Scalars['String']>;
  senderToken_gte?: InputMaybe<Scalars['String']>;
  senderToken_lte?: InputMaybe<Scalars['String']>;
  senderToken_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_contains?: InputMaybe<Scalars['String']>;
  senderToken_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_contains?: InputMaybe<Scalars['String']>;
  senderToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_?: InputMaybe<Token_filter>;
  swapValueUsd?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_not?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_gt?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_lt?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_gte?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_lte?: InputMaybe<Scalars['BigInt']>;
  swapValueUsd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  swapValueUsd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeValueUsd?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_not?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_gt?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_lt?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_gte?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_lte?: InputMaybe<Scalars['BigInt']>;
  feeValueUsd_in?: InputMaybe<Array<Scalars['BigInt']>>;
  feeValueUsd_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type SwapLight_orderBy =
  | 'id'
  | 'swap'
  | 'block'
  | 'transactionHash'
  | 'timestamp'
  | 'from'
  | 'to'
  | 'value'
  | 'nonce'
  | 'expiry'
  | 'signer'
  | 'signerAmount'
  | 'signerToken'
  | 'signerFee'
  | 'sender'
  | 'senderAmount'
  | 'senderToken'
  | 'swapValueUsd'
  | 'feeValueUsd';

export type Swap_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  swap?: InputMaybe<Scalars['String']>;
  swap_not?: InputMaybe<Scalars['String']>;
  swap_gt?: InputMaybe<Scalars['String']>;
  swap_lt?: InputMaybe<Scalars['String']>;
  swap_gte?: InputMaybe<Scalars['String']>;
  swap_lte?: InputMaybe<Scalars['String']>;
  swap_in?: InputMaybe<Array<Scalars['String']>>;
  swap_not_in?: InputMaybe<Array<Scalars['String']>>;
  swap_contains?: InputMaybe<Scalars['String']>;
  swap_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_not_contains?: InputMaybe<Scalars['String']>;
  swap_not_contains_nocase?: InputMaybe<Scalars['String']>;
  swap_starts_with?: InputMaybe<Scalars['String']>;
  swap_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_starts_with?: InputMaybe<Scalars['String']>;
  swap_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  swap_ends_with?: InputMaybe<Scalars['String']>;
  swap_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_not_ends_with?: InputMaybe<Scalars['String']>;
  swap_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  swap_?: InputMaybe<SwapContract_filter>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce?: InputMaybe<Scalars['BigInt']>;
  nonce_not?: InputMaybe<Scalars['BigInt']>;
  nonce_gt?: InputMaybe<Scalars['BigInt']>;
  nonce_lt?: InputMaybe<Scalars['BigInt']>;
  nonce_gte?: InputMaybe<Scalars['BigInt']>;
  nonce_lte?: InputMaybe<Scalars['BigInt']>;
  nonce_in?: InputMaybe<Array<Scalars['BigInt']>>;
  nonce_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry?: InputMaybe<Scalars['BigInt']>;
  expiry_not?: InputMaybe<Scalars['BigInt']>;
  expiry_gt?: InputMaybe<Scalars['BigInt']>;
  expiry_lt?: InputMaybe<Scalars['BigInt']>;
  expiry_gte?: InputMaybe<Scalars['BigInt']>;
  expiry_lte?: InputMaybe<Scalars['BigInt']>;
  expiry_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expiry_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signer?: InputMaybe<Scalars['String']>;
  signer_not?: InputMaybe<Scalars['String']>;
  signer_gt?: InputMaybe<Scalars['String']>;
  signer_lt?: InputMaybe<Scalars['String']>;
  signer_gte?: InputMaybe<Scalars['String']>;
  signer_lte?: InputMaybe<Scalars['String']>;
  signer_in?: InputMaybe<Array<Scalars['String']>>;
  signer_not_in?: InputMaybe<Array<Scalars['String']>>;
  signer_contains?: InputMaybe<Scalars['String']>;
  signer_contains_nocase?: InputMaybe<Scalars['String']>;
  signer_not_contains?: InputMaybe<Scalars['String']>;
  signer_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signer_starts_with?: InputMaybe<Scalars['String']>;
  signer_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signer_not_starts_with?: InputMaybe<Scalars['String']>;
  signer_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signer_ends_with?: InputMaybe<Scalars['String']>;
  signer_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signer_not_ends_with?: InputMaybe<Scalars['String']>;
  signer_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signer_?: InputMaybe<User_filter>;
  signerAmount?: InputMaybe<Scalars['BigInt']>;
  signerAmount_not?: InputMaybe<Scalars['BigInt']>;
  signerAmount_gt?: InputMaybe<Scalars['BigInt']>;
  signerAmount_lt?: InputMaybe<Scalars['BigInt']>;
  signerAmount_gte?: InputMaybe<Scalars['BigInt']>;
  signerAmount_lte?: InputMaybe<Scalars['BigInt']>;
  signerAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerId?: InputMaybe<Scalars['BigInt']>;
  signerId_not?: InputMaybe<Scalars['BigInt']>;
  signerId_gt?: InputMaybe<Scalars['BigInt']>;
  signerId_lt?: InputMaybe<Scalars['BigInt']>;
  signerId_gte?: InputMaybe<Scalars['BigInt']>;
  signerId_lte?: InputMaybe<Scalars['BigInt']>;
  signerId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  signerToken?: InputMaybe<Scalars['String']>;
  signerToken_not?: InputMaybe<Scalars['String']>;
  signerToken_gt?: InputMaybe<Scalars['String']>;
  signerToken_lt?: InputMaybe<Scalars['String']>;
  signerToken_gte?: InputMaybe<Scalars['String']>;
  signerToken_lte?: InputMaybe<Scalars['String']>;
  signerToken_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  signerToken_contains?: InputMaybe<Scalars['String']>;
  signerToken_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_contains?: InputMaybe<Scalars['String']>;
  signerToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  signerToken_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with?: InputMaybe<Scalars['String']>;
  signerToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with?: InputMaybe<Scalars['String']>;
  signerToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  signerToken_?: InputMaybe<Token_filter>;
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
  sender_?: InputMaybe<User_filter>;
  senderAmount?: InputMaybe<Scalars['BigInt']>;
  senderAmount_not?: InputMaybe<Scalars['BigInt']>;
  senderAmount_gt?: InputMaybe<Scalars['BigInt']>;
  senderAmount_lt?: InputMaybe<Scalars['BigInt']>;
  senderAmount_gte?: InputMaybe<Scalars['BigInt']>;
  senderAmount_lte?: InputMaybe<Scalars['BigInt']>;
  senderAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderId?: InputMaybe<Scalars['BigInt']>;
  senderId_not?: InputMaybe<Scalars['BigInt']>;
  senderId_gt?: InputMaybe<Scalars['BigInt']>;
  senderId_lt?: InputMaybe<Scalars['BigInt']>;
  senderId_gte?: InputMaybe<Scalars['BigInt']>;
  senderId_lte?: InputMaybe<Scalars['BigInt']>;
  senderId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  senderToken?: InputMaybe<Scalars['String']>;
  senderToken_not?: InputMaybe<Scalars['String']>;
  senderToken_gt?: InputMaybe<Scalars['String']>;
  senderToken_lt?: InputMaybe<Scalars['String']>;
  senderToken_gte?: InputMaybe<Scalars['String']>;
  senderToken_lte?: InputMaybe<Scalars['String']>;
  senderToken_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  senderToken_contains?: InputMaybe<Scalars['String']>;
  senderToken_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_contains?: InputMaybe<Scalars['String']>;
  senderToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  senderToken_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with?: InputMaybe<Scalars['String']>;
  senderToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with?: InputMaybe<Scalars['String']>;
  senderToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  senderToken_?: InputMaybe<Token_filter>;
  affiliate?: InputMaybe<Scalars['String']>;
  affiliate_not?: InputMaybe<Scalars['String']>;
  affiliate_gt?: InputMaybe<Scalars['String']>;
  affiliate_lt?: InputMaybe<Scalars['String']>;
  affiliate_gte?: InputMaybe<Scalars['String']>;
  affiliate_lte?: InputMaybe<Scalars['String']>;
  affiliate_in?: InputMaybe<Array<Scalars['String']>>;
  affiliate_not_in?: InputMaybe<Array<Scalars['String']>>;
  affiliate_contains?: InputMaybe<Scalars['String']>;
  affiliate_contains_nocase?: InputMaybe<Scalars['String']>;
  affiliate_not_contains?: InputMaybe<Scalars['String']>;
  affiliate_not_contains_nocase?: InputMaybe<Scalars['String']>;
  affiliate_starts_with?: InputMaybe<Scalars['String']>;
  affiliate_starts_with_nocase?: InputMaybe<Scalars['String']>;
  affiliate_not_starts_with?: InputMaybe<Scalars['String']>;
  affiliate_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  affiliate_ends_with?: InputMaybe<Scalars['String']>;
  affiliate_ends_with_nocase?: InputMaybe<Scalars['String']>;
  affiliate_not_ends_with?: InputMaybe<Scalars['String']>;
  affiliate_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  affiliate_?: InputMaybe<User_filter>;
  affiliateAmount?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_not?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_gt?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_lt?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_gte?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_lte?: InputMaybe<Scalars['BigInt']>;
  affiliateAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  affiliateAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  affiliateId?: InputMaybe<Scalars['BigInt']>;
  affiliateId_not?: InputMaybe<Scalars['BigInt']>;
  affiliateId_gt?: InputMaybe<Scalars['BigInt']>;
  affiliateId_lt?: InputMaybe<Scalars['BigInt']>;
  affiliateId_gte?: InputMaybe<Scalars['BigInt']>;
  affiliateId_lte?: InputMaybe<Scalars['BigInt']>;
  affiliateId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  affiliateId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  affiliateToken?: InputMaybe<Scalars['String']>;
  affiliateToken_not?: InputMaybe<Scalars['String']>;
  affiliateToken_gt?: InputMaybe<Scalars['String']>;
  affiliateToken_lt?: InputMaybe<Scalars['String']>;
  affiliateToken_gte?: InputMaybe<Scalars['String']>;
  affiliateToken_lte?: InputMaybe<Scalars['String']>;
  affiliateToken_in?: InputMaybe<Array<Scalars['String']>>;
  affiliateToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  affiliateToken_contains?: InputMaybe<Scalars['String']>;
  affiliateToken_contains_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_not_contains?: InputMaybe<Scalars['String']>;
  affiliateToken_not_contains_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_starts_with?: InputMaybe<Scalars['String']>;
  affiliateToken_starts_with_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_not_starts_with?: InputMaybe<Scalars['String']>;
  affiliateToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_ends_with?: InputMaybe<Scalars['String']>;
  affiliateToken_ends_with_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_not_ends_with?: InputMaybe<Scalars['String']>;
  affiliateToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  affiliateToken_?: InputMaybe<Token_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Swap_orderBy =
  | 'id'
  | 'swap'
  | 'block'
  | 'transactionHash'
  | 'timestamp'
  | 'from'
  | 'to'
  | 'value'
  | 'nonce'
  | 'expiry'
  | 'signer'
  | 'signerAmount'
  | 'signerId'
  | 'signerToken'
  | 'sender'
  | 'senderAmount'
  | 'senderId'
  | 'senderToken'
  | 'affiliate'
  | 'affiliateAmount'
  | 'affiliateId'
  | 'affiliateToken';

export type Token = {
  id: Scalars['ID'];
  isBlacklisted?: Maybe<Scalars['Boolean']>;
};

export type Token_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isBlacklisted?: InputMaybe<Scalars['Boolean']>;
  isBlacklisted_not?: InputMaybe<Scalars['Boolean']>;
  isBlacklisted_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isBlacklisted_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type Token_orderBy =
  | 'id'
  | 'isBlacklisted';

export type User = {
  id: Scalars['ID'];
  authorizedSigners: Array<User>;
  authorizedSenders: Array<User>;
  cancelledSwapNonces: Array<Scalars['BigInt']>;
  cancelledSwapLightNonces: Array<Scalars['BigInt']>;
  amountInLocker?: Maybe<Scalars['BigInt']>;
};


export type UserauthorizedSignersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
};


export type UserauthorizedSendersArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<User_filter>;
};

export type User_filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  authorizedSigners?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_not?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_contains?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_not_contains?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  authorizedSigners_?: InputMaybe<User_filter>;
  authorizedSenders?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_not?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_contains?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_not_contains?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  authorizedSenders_?: InputMaybe<User_filter>;
  cancelledSwapNonces?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapNonces_not?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapNonces_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapNonces_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapNonces_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapNonces_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces_not?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  cancelledSwapLightNonces_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInLocker?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_not?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_gt?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_lt?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_gte?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_lte?: InputMaybe<Scalars['BigInt']>;
  amountInLocker_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInLocker_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
};

export type User_orderBy =
  | 'id'
  | 'authorizedSigners'
  | 'authorizedSenders'
  | 'cancelledSwapNonces'
  | 'cancelledSwapLightNonces'
  | 'amountInLocker';

export type VolumeDay = {
  id: Scalars['ID'];
  date: Scalars['Int'];
  amount: Scalars['BigDecimal'];
};

export type VolumeDay_filter = {
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

export type VolumeDay_orderBy =
  | 'id'
  | 'date'
  | 'amount';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
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
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  user: InContextSdkMethod<Query['user'], QueryuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Query['users'], QueryusersArgs, MeshContext>,
  /** null **/
  swapContract: InContextSdkMethod<Query['swapContract'], QueryswapContractArgs, MeshContext>,
  /** null **/
  swapContracts: InContextSdkMethod<Query['swapContracts'], QueryswapContractsArgs, MeshContext>,
  /** null **/
  swapLightContract: InContextSdkMethod<Query['swapLightContract'], QueryswapLightContractArgs, MeshContext>,
  /** null **/
  swapLightContracts: InContextSdkMethod<Query['swapLightContracts'], QueryswapLightContractsArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Query['swap'], QueryswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Query['swaps'], QueryswapsArgs, MeshContext>,
  /** null **/
  swapLight: InContextSdkMethod<Query['swapLight'], QueryswapLightArgs, MeshContext>,
  /** null **/
  swapLights: InContextSdkMethod<Query['swapLights'], QueryswapLightsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Query['token'], QuerytokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Query['tokens'], QuerytokensArgs, MeshContext>,
  /** null **/
  indexer: InContextSdkMethod<Query['indexer'], QueryindexerArgs, MeshContext>,
  /** null **/
  indexers: InContextSdkMethod<Query['indexers'], QueryindexersArgs, MeshContext>,
  /** null **/
  index: InContextSdkMethod<Query['index'], QueryindexArgs, MeshContext>,
  /** null **/
  indexes: InContextSdkMethod<Query['indexes'], QueryindexesArgs, MeshContext>,
  /** null **/
  stake: InContextSdkMethod<Query['stake'], QuerystakeArgs, MeshContext>,
  /** null **/
  stakes: InContextSdkMethod<Query['stakes'], QuerystakesArgs, MeshContext>,
  /** null **/
  locator: InContextSdkMethod<Query['locator'], QuerylocatorArgs, MeshContext>,
  /** null **/
  locators: InContextSdkMethod<Query['locators'], QuerylocatorsArgs, MeshContext>,
  /** null **/
  delegateFactory: InContextSdkMethod<Query['delegateFactory'], QuerydelegateFactoryArgs, MeshContext>,
  /** null **/
  delegateFactories: InContextSdkMethod<Query['delegateFactories'], QuerydelegateFactoriesArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Query['delegate'], QuerydelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Query['delegates'], QuerydelegatesArgs, MeshContext>,
  /** null **/
  rule: InContextSdkMethod<Query['rule'], QueryruleArgs, MeshContext>,
  /** null **/
  rules: InContextSdkMethod<Query['rules'], QueryrulesArgs, MeshContext>,
  /** null **/
  locker: InContextSdkMethod<Query['locker'], QuerylockerArgs, MeshContext>,
  /** null **/
  lockers: InContextSdkMethod<Query['lockers'], QuerylockersArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Query['pool'], QuerypoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Query['pools'], QuerypoolsArgs, MeshContext>,
  /** null **/
  poolClaim: InContextSdkMethod<Query['poolClaim'], QuerypoolClaimArgs, MeshContext>,
  /** null **/
  poolClaims: InContextSdkMethod<Query['poolClaims'], QuerypoolClaimsArgs, MeshContext>,
  /** null **/
  enabledRoot: InContextSdkMethod<Query['enabledRoot'], QueryenabledRootArgs, MeshContext>,
  /** null **/
  enabledRoots: InContextSdkMethod<Query['enabledRoots'], QueryenabledRootsArgs, MeshContext>,
  /** null **/
  collectedFeesDay: InContextSdkMethod<Query['collectedFeesDay'], QuerycollectedFeesDayArgs, MeshContext>,
  /** null **/
  collectedFeesDays: InContextSdkMethod<Query['collectedFeesDays'], QuerycollectedFeesDaysArgs, MeshContext>,
  /** null **/
  volumeDay: InContextSdkMethod<Query['volumeDay'], QueryvolumeDayArgs, MeshContext>,
  /** null **/
  volumeDays: InContextSdkMethod<Query['volumeDays'], QueryvolumeDaysArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  user: InContextSdkMethod<Subscription['user'], SubscriptionuserArgs, MeshContext>,
  /** null **/
  users: InContextSdkMethod<Subscription['users'], SubscriptionusersArgs, MeshContext>,
  /** null **/
  swapContract: InContextSdkMethod<Subscription['swapContract'], SubscriptionswapContractArgs, MeshContext>,
  /** null **/
  swapContracts: InContextSdkMethod<Subscription['swapContracts'], SubscriptionswapContractsArgs, MeshContext>,
  /** null **/
  swapLightContract: InContextSdkMethod<Subscription['swapLightContract'], SubscriptionswapLightContractArgs, MeshContext>,
  /** null **/
  swapLightContracts: InContextSdkMethod<Subscription['swapLightContracts'], SubscriptionswapLightContractsArgs, MeshContext>,
  /** null **/
  swap: InContextSdkMethod<Subscription['swap'], SubscriptionswapArgs, MeshContext>,
  /** null **/
  swaps: InContextSdkMethod<Subscription['swaps'], SubscriptionswapsArgs, MeshContext>,
  /** null **/
  swapLight: InContextSdkMethod<Subscription['swapLight'], SubscriptionswapLightArgs, MeshContext>,
  /** null **/
  swapLights: InContextSdkMethod<Subscription['swapLights'], SubscriptionswapLightsArgs, MeshContext>,
  /** null **/
  token: InContextSdkMethod<Subscription['token'], SubscriptiontokenArgs, MeshContext>,
  /** null **/
  tokens: InContextSdkMethod<Subscription['tokens'], SubscriptiontokensArgs, MeshContext>,
  /** null **/
  indexer: InContextSdkMethod<Subscription['indexer'], SubscriptionindexerArgs, MeshContext>,
  /** null **/
  indexers: InContextSdkMethod<Subscription['indexers'], SubscriptionindexersArgs, MeshContext>,
  /** null **/
  index: InContextSdkMethod<Subscription['index'], SubscriptionindexArgs, MeshContext>,
  /** null **/
  indexes: InContextSdkMethod<Subscription['indexes'], SubscriptionindexesArgs, MeshContext>,
  /** null **/
  stake: InContextSdkMethod<Subscription['stake'], SubscriptionstakeArgs, MeshContext>,
  /** null **/
  stakes: InContextSdkMethod<Subscription['stakes'], SubscriptionstakesArgs, MeshContext>,
  /** null **/
  locator: InContextSdkMethod<Subscription['locator'], SubscriptionlocatorArgs, MeshContext>,
  /** null **/
  locators: InContextSdkMethod<Subscription['locators'], SubscriptionlocatorsArgs, MeshContext>,
  /** null **/
  delegateFactory: InContextSdkMethod<Subscription['delegateFactory'], SubscriptiondelegateFactoryArgs, MeshContext>,
  /** null **/
  delegateFactories: InContextSdkMethod<Subscription['delegateFactories'], SubscriptiondelegateFactoriesArgs, MeshContext>,
  /** null **/
  delegate: InContextSdkMethod<Subscription['delegate'], SubscriptiondelegateArgs, MeshContext>,
  /** null **/
  delegates: InContextSdkMethod<Subscription['delegates'], SubscriptiondelegatesArgs, MeshContext>,
  /** null **/
  rule: InContextSdkMethod<Subscription['rule'], SubscriptionruleArgs, MeshContext>,
  /** null **/
  rules: InContextSdkMethod<Subscription['rules'], SubscriptionrulesArgs, MeshContext>,
  /** null **/
  locker: InContextSdkMethod<Subscription['locker'], SubscriptionlockerArgs, MeshContext>,
  /** null **/
  lockers: InContextSdkMethod<Subscription['lockers'], SubscriptionlockersArgs, MeshContext>,
  /** null **/
  pool: InContextSdkMethod<Subscription['pool'], SubscriptionpoolArgs, MeshContext>,
  /** null **/
  pools: InContextSdkMethod<Subscription['pools'], SubscriptionpoolsArgs, MeshContext>,
  /** null **/
  poolClaim: InContextSdkMethod<Subscription['poolClaim'], SubscriptionpoolClaimArgs, MeshContext>,
  /** null **/
  poolClaims: InContextSdkMethod<Subscription['poolClaims'], SubscriptionpoolClaimsArgs, MeshContext>,
  /** null **/
  enabledRoot: InContextSdkMethod<Subscription['enabledRoot'], SubscriptionenabledRootArgs, MeshContext>,
  /** null **/
  enabledRoots: InContextSdkMethod<Subscription['enabledRoots'], SubscriptionenabledRootsArgs, MeshContext>,
  /** null **/
  collectedFeesDay: InContextSdkMethod<Subscription['collectedFeesDay'], SubscriptioncollectedFeesDayArgs, MeshContext>,
  /** null **/
  collectedFeesDays: InContextSdkMethod<Subscription['collectedFeesDays'], SubscriptioncollectedFeesDaysArgs, MeshContext>,
  /** null **/
  volumeDay: InContextSdkMethod<Subscription['volumeDay'], SubscriptionvolumeDayArgs, MeshContext>,
  /** null **/
  volumeDays: InContextSdkMethod<Subscription['volumeDays'], SubscriptionvolumeDaysArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["tidv"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      ["indexer_url"]: Scalars['ID']
    };
}
