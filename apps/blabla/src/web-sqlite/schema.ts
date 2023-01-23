import { z } from "zod";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

export const TagsTableSchema = z.object({
  event_id: z.string(),
  tag: z.string(),
  value: z.string(),
});
export type TagsTable = z.infer<typeof TagsTableSchema>;

export const SeenTableSchema = z.object({
  event_id: z.string(),
  relay: z.string(),
});
export type SeenTable = z.infer<typeof SeenTableSchema>;

export const NostrProfileTableSchema = z.object({
  pubkey: z.string(),
  npub: z.string().optional(),
  name: z.string().optional(),
  display_name: z.string().optional(),
  picture: z.string().optional(),
  about: z.string().optional(),
  website: z.string().optional(),
  lud06: z.string().optional(),
  lud16: z.string().optional(),
  nip06: z.string().optional(),
});
export type NostrProfileTable = z.infer<typeof NostrProfileTableSchema>;

export const BookmarkedEventsTableSchema = z.object({
  event_id: z.string(),
});
export type BookmarkedEventsTable = z.infer<typeof BookmarkedEventsTableSchema>;

export const BookmarkedProfilesTableSchema = z.object({ pubkey: z.string() });
export type BookmarkedProfilesTable = z.infer<
  typeof BookmarkedProfilesTableSchema
>;

@Entity()
export class EventTable {
  @PrimaryColumn({ nullable: false })
  id?: string;

  @Column({ nullable: true })
  pubkey?: string;

  @Column({ nullable: true })
  kind?: number;

  @Column({ nullable: true })
  created_at?: number;

  @Column({ nullable: true })
  content?: string;

  @Column({ nullable: true })
  sig?: string;

  @OneToMany(() => Tags, (tag) => tag.event_id)
  tags?: Tags[];
}

@Entity()
export class Tags {
  @PrimaryColumn()
  id?: string;
  @Column({ nullable: true, unique: false })
  tag?: string;

  @Column({ nullable: true, unique: false })
  value?: string;

  @ManyToOne(() => EventTable, (event) => event.tags)
  @Column({ nullable: true, unique: false })
  event_id?: string;
}

@Entity()
export class Seen {
  @PrimaryColumn()
  event_id?: string;

  @Column()
  relay?: string;
}

@Entity()
export class NostrProfile {
  @PrimaryColumn()
  pubkey?: string;

  @Column({ nullable: true })
  npub?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  display_name?: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ nullable: true })
  about?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  lud06?: string;

  @Column({ nullable: true })
  lud16?: string;

  @Column({ nullable: true })
  nip06?: string;

  @OneToMany(() => Follows, (follows) => follows.pubkey)
  followers?: Follows[];

  @OneToMany(() => Follows, (follows) => follows.followedPubkey)
  follows?: Follows[];
}

@Entity()
export class BookmarkedEvents {
  @PrimaryColumn()
  event_id?: string;
}

@Entity()
export class BookmarkedProfiles {
  @PrimaryColumn()
  pubkey?: string;
}

@Entity()
export class Follows {
  @PrimaryColumn()
  pubkey?: string;

  @PrimaryColumn()
  followedPubkey?: string;
}
