import { z } from "zod";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

export const TagsTableSchema = z.object({
  event_id: z.string(),
  tag: z.string(),
  value: z.string(),
});
export type TagsTable = z.infer<typeof TagsTableSchema>;
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
@Entity()
export class EventTable {
  @PrimaryColumn()
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

  @OneToMany(() => Tags, (tag) => tag.event_id, { cascade: true })
  tags?: Tags[];

  @Column({ default: false })
  is_bookmarked?: boolean;

  @Column({ default: false })
  is_read?: boolean;
}

@Entity()
export class Tags {
  @PrimaryColumn({ generated: "rowid" })
  id?: string;
  @Column({ nullable: true, unique: false })
  tag?: string;

  @Column({ nullable: true, unique: false })
  value?: string;

  @ManyToOne(() => EventTable, (event) => event.tags)
  @Column({ unique: false })
  event_id?: string;
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

  @OneToMany(() => NostrProfileFollowers, (follower) => follower.follower)
  followers?: NostrProfileFollowers[];

  @OneToMany(() => NostrProfileFollowers, (follower) => follower.pubkey)
  following?: NostrProfileFollowers[];

  @Column({ default: false })
  is_bookmarked?: boolean;
}

@Entity()
export class NostrProfileFollowers {
  @Column({ nullable: true })
  @PrimaryColumn()
  @ManyToOne(() => NostrProfile, (profile) => profile.followers)
  pubkey?: string;

  @Column({ nullable: true })
  @PrimaryColumn()
  @ManyToOne(() => NostrProfile, (profile) => profile.following)
  follower?: string;
}
