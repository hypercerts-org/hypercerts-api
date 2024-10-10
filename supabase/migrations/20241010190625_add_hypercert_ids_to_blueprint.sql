alter table "public"."blueprints" add column "hypercert_ids" text[] not null default '{}'::text[];
