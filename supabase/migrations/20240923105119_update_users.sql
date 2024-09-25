alter table "public"."blueprints" drop constraint "blueprints_admin_id_fkey";
alter table "public"."users" drop column "auth";

alter table "public"."users" drop column "email";

alter table "public"."users" add column "avatar" text;

alter table "public"."users" add column "display_name" text;

alter table "public"."users" alter column "address" type text;


alter table "public"."users" add column "chain_id" bigint not null;

alter table "public"."users" drop constraint "users_pkey";

drop index if exists "public"."users_pkey";

alter table "public"."users" alter column "id" set default gen_random_uuid();

alter table "public"."users" alter column "id" set not null;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

CREATE UNIQUE INDEX users_address_chain_id ON public."users" using btree (address, chain_id);

alter table "public"."users" add constraint "users_address_chain_id" UNIQUE using index users_address_chain_id;

-- remove the supabase_realtime publication
drop
    publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

alter
    publication supabase_realtime add table users;