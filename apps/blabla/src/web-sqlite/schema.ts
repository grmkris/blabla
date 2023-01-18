import { z } from "zod";
import { Column, Entity, PrimaryColumn } from "typeorm";

/**
 * TABLE SCHEMAS
 */
export const EventTableSchema = z.object({
  id: z.string(),
  pubkey: z.string(),
  kind: z.number(),
  created_at: z.number(),
  content: z.string(),
  tags_full: z.string(),
  sig: z.string(),
});
export type EventTable = z.infer<typeof EventTableSchema>;

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
  npub: z.string(),
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
export class Events {
  @PrimaryColumn()
  id: string;

  @Column()
  pubkey: string;

  @Column()
  kind: number;

  @Column()
  created_at: number;

  @Column()
  content: string;

  @Column()
  tags_full: string;

  @Column()
  sig: string;
}

@Entity()
export class Tags {
  @PrimaryColumn()
  event_id: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: true })
  value: string;
}

@Entity()
export class Seen {
  @PrimaryColumn()
  event_id: string;

  @Column()
  relay: string;
}

@Entity()
export class NostrProfile {
  @PrimaryColumn()
  pubkey: string;

  @Column({ nullable: true })
  npub: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  display_name: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  lud06: string;

  @Column({ nullable: true })
  lud16: string;

  @Column({ nullable: true })
  nip06: string;
}

@Entity()
export class BookmarkedEvents {
  @PrimaryColumn()
  event_id: string;
}

@Entity()
export class BookmarkedProfiles {
  @PrimaryColumn()
  pubkey: string;
}
