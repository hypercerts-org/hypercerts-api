drop policy "Only owners of registry can add a blueprint to it" on "public"."blueprints";

drop policy "Owners of blueprint or minters of blueprint can delete" on "public"."blueprints";

drop policy "Delete claims when you are the owner" on "public"."claims";

drop policy "Enable insert for authenticated users only" on "public"."claims";

drop policy "Enable read access for all users" on "public"."claims";

drop policy "Only allow for owner of registry" on "public"."claims";

drop policy "Enable read access for all users" on "public"."hyperboard_registries";

drop policy "Only allow for owner of hyperboard" on "public"."hyperboard_registries";

drop policy "Only allow for owner of the hyperboard" on "public"."hyperboard_registries";

drop policy "Only allow update for owner of hyperboard" on "public"."hyperboard_registries";

drop policy "Allow owners of registries to delete them based on address" on "public"."registries";

drop policy "Allow owners of registries to update based on address" on "public"."registries";

drop policy "Enable insert for authenticated users only" on "public"."registries";

drop policy "Enable read access for all users" on "public"."registries";

revoke delete on table "public"."claims" from "anon";

revoke insert on table "public"."claims" from "anon";

revoke references on table "public"."claims" from "anon";

revoke select on table "public"."claims" from "anon";

revoke trigger on table "public"."claims" from "anon";

revoke truncate on table "public"."claims" from "anon";

revoke update on table "public"."claims" from "anon";

revoke delete on table "public"."claims" from "authenticated";

revoke insert on table "public"."claims" from "authenticated";

revoke references on table "public"."claims" from "authenticated";

revoke select on table "public"."claims" from "authenticated";

revoke trigger on table "public"."claims" from "authenticated";

revoke truncate on table "public"."claims" from "authenticated";

revoke update on table "public"."claims" from "authenticated";

revoke delete on table "public"."claims" from "service_role";

revoke insert on table "public"."claims" from "service_role";

revoke references on table "public"."claims" from "service_role";

revoke select on table "public"."claims" from "service_role";

revoke trigger on table "public"."claims" from "service_role";

revoke truncate on table "public"."claims" from "service_role";

revoke update on table "public"."claims" from "service_role";

revoke delete on table "public"."hyperboard_registries" from "anon";

revoke insert on table "public"."hyperboard_registries" from "anon";

revoke references on table "public"."hyperboard_registries" from "anon";

revoke select on table "public"."hyperboard_registries" from "anon";

revoke trigger on table "public"."hyperboard_registries" from "anon";

revoke truncate on table "public"."hyperboard_registries" from "anon";

revoke update on table "public"."hyperboard_registries" from "anon";

revoke delete on table "public"."hyperboard_registries" from "authenticated";

revoke insert on table "public"."hyperboard_registries" from "authenticated";

revoke references on table "public"."hyperboard_registries" from "authenticated";

revoke select on table "public"."hyperboard_registries" from "authenticated";

revoke trigger on table "public"."hyperboard_registries" from "authenticated";

revoke truncate on table "public"."hyperboard_registries" from "authenticated";

revoke update on table "public"."hyperboard_registries" from "authenticated";

revoke delete on table "public"."hyperboard_registries" from "service_role";

revoke insert on table "public"."hyperboard_registries" from "service_role";

revoke references on table "public"."hyperboard_registries" from "service_role";

revoke select on table "public"."hyperboard_registries" from "service_role";

revoke trigger on table "public"."hyperboard_registries" from "service_role";

revoke truncate on table "public"."hyperboard_registries" from "service_role";

revoke update on table "public"."hyperboard_registries" from "service_role";

revoke delete on table "public"."registries" from "anon";

revoke insert on table "public"."registries" from "anon";

revoke references on table "public"."registries" from "anon";

revoke select on table "public"."registries" from "anon";

revoke trigger on table "public"."registries" from "anon";

revoke truncate on table "public"."registries" from "anon";

revoke update on table "public"."registries" from "anon";

revoke delete on table "public"."registries" from "authenticated";

revoke insert on table "public"."registries" from "authenticated";

revoke references on table "public"."registries" from "authenticated";

revoke select on table "public"."registries" from "authenticated";

revoke trigger on table "public"."registries" from "authenticated";

revoke truncate on table "public"."registries" from "authenticated";

revoke update on table "public"."registries" from "authenticated";

revoke delete on table "public"."registries" from "service_role";

revoke insert on table "public"."registries" from "service_role";

revoke references on table "public"."registries" from "service_role";

revoke select on table "public"."registries" from "service_role";

revoke trigger on table "public"."registries" from "service_role";

revoke truncate on table "public"."registries" from "service_role";

revoke update on table "public"."registries" from "service_role";

alter table "public"."blueprints" drop constraint "blueprints_admin_id_fkey";

alter table "public"."blueprints" drop constraint "blueprints_registry_id_fkey";

alter table "public"."claims" drop constraint "claims_registry_id_fkey";

alter table "public"."hyperboard_registries" drop constraint "hyperboard_registries_hyperboard_id_fkey";

alter table "public"."hyperboard_registries" drop constraint "hyperboard_registries_registries_id_fk";

alter table "public"."claims" drop constraint "hyperboard_claims_pkey";

alter table "public"."hyperboard_registries" drop constraint "hyperboard_registries_pkey";

alter table "public"."registries" drop constraint "registries_pkey";

drop index if exists "public"."hyperboard_registries_pkey";

drop index if exists "public"."hyperboard_claims_pkey";

drop index if exists "public"."registries_pkey";

drop table "public"."claims";

drop table "public"."hyperboard_registries";

drop table "public"."registries";

create table "public"."collection_blueprints" (
                                                  "created_at" timestamp with time zone not null default now(),
                                                  "collection_id" uuid not null,
                                                  "blueprint_id" bigint not null
);


alter table "public"."collection_blueprints" enable row level security;

create table "public"."collections" (
                                        "id" uuid not null default gen_random_uuid(),
                                        "created_at" timestamp with time zone not null default now(),
                                        "name" text not null,
                                        "description" text not null,
                                        "admin_id" citext not null,
                                        "hidden" boolean not null default false,
                                        "chain_id" integer not null
);


alter table "public"."collections" enable row level security;

create table "public"."hyperboard_collections" (
                                                   "created_at" timestamp with time zone default now(),
                                                   "hyperboard_id" uuid not null,
                                                   "collection_id" uuid not null,
                                                   "label" text,
                                                   "render_method" text not null default 'full'::text
);


alter table "public"."hyperboard_collections" enable row level security;

create table "public"."hypercerts" (
                                       "id" uuid not null default gen_random_uuid(),
                                       "created_at" timestamp with time zone not null default now(),
                                       "collection_id" uuid not null,
                                       "hypercert_id" text not null,
                                       "chain_id" integer not null,
                                       "admin_id" citext not null,
                                       "display_size" bigint not null default '1'::bigint
);


alter table "public"."hypercerts" enable row level security;

alter table "public"."blueprints" drop column "registry_id";

CREATE UNIQUE INDEX collection_blueprints_pkey ON public.collection_blueprints USING btree (collection_id, blueprint_id);

CREATE UNIQUE INDEX hyperboard_collections_pkey ON public.hyperboard_collections USING btree (hyperboard_id, collection_id);

CREATE UNIQUE INDEX hyperboard_claims_pkey ON public.hypercerts USING btree (id);

CREATE UNIQUE INDEX registries_pkey ON public.collections USING btree (id);

alter table "public"."collection_blueprints" add constraint "collection_blueprints_pkey" PRIMARY KEY using index "collection_blueprints_pkey";

alter table "public"."collections" add constraint "registries_pkey" PRIMARY KEY using index "registries_pkey";

alter table "public"."hyperboard_collections" add constraint "hyperboard_collections_pkey" PRIMARY KEY using index "hyperboard_collections_pkey";

alter table "public"."hypercerts" add constraint "hyperboard_claims_pkey" PRIMARY KEY using index "hyperboard_claims_pkey";

alter table "public"."collection_blueprints" add constraint "collection_blueprints_blueprint_id_fkey" FOREIGN KEY (blueprint_id) REFERENCES blueprints(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collection_blueprints" validate constraint "collection_blueprints_blueprint_id_fkey";

alter table "public"."collection_blueprints" add constraint "collection_blueprints_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collection_blueprints" validate constraint "collection_blueprints_collection_id_fkey";

alter table "public"."hyperboard_collections" add constraint "hyperboard_registries_hyperboard_id_fkey" FOREIGN KEY (hyperboard_id) REFERENCES hyperboards(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_collections" validate constraint "hyperboard_registries_hyperboard_id_fkey";

alter table "public"."hyperboard_collections" add constraint "hyperboard_registries_registries_id_fk" FOREIGN KEY (collection_id) REFERENCES collections(id) not valid;

alter table "public"."hyperboard_collections" validate constraint "hyperboard_registries_registries_id_fk";

alter table "public"."hypercerts" add constraint "claims_registry_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE not valid;

alter table "public"."hypercerts" validate constraint "claims_registry_id_fkey";

grant delete on table "public"."collection_blueprints" to "anon";

grant insert on table "public"."collection_blueprints" to "anon";

grant references on table "public"."collection_blueprints" to "anon";

grant select on table "public"."collection_blueprints" to "anon";

grant trigger on table "public"."collection_blueprints" to "anon";

grant truncate on table "public"."collection_blueprints" to "anon";

grant update on table "public"."collection_blueprints" to "anon";

grant delete on table "public"."collection_blueprints" to "authenticated";

grant insert on table "public"."collection_blueprints" to "authenticated";

grant references on table "public"."collection_blueprints" to "authenticated";

grant select on table "public"."collection_blueprints" to "authenticated";

grant trigger on table "public"."collection_blueprints" to "authenticated";

grant truncate on table "public"."collection_blueprints" to "authenticated";

grant update on table "public"."collection_blueprints" to "authenticated";

grant delete on table "public"."collection_blueprints" to "service_role";

grant insert on table "public"."collection_blueprints" to "service_role";

grant references on table "public"."collection_blueprints" to "service_role";

grant select on table "public"."collection_blueprints" to "service_role";

grant trigger on table "public"."collection_blueprints" to "service_role";

grant truncate on table "public"."collection_blueprints" to "service_role";

grant update on table "public"."collection_blueprints" to "service_role";

grant delete on table "public"."collections" to "anon";

grant insert on table "public"."collections" to "anon";

grant references on table "public"."collections" to "anon";

grant select on table "public"."collections" to "anon";

grant trigger on table "public"."collections" to "anon";

grant truncate on table "public"."collections" to "anon";

grant update on table "public"."collections" to "anon";

grant delete on table "public"."collections" to "authenticated";

grant insert on table "public"."collections" to "authenticated";

grant references on table "public"."collections" to "authenticated";

grant select on table "public"."collections" to "authenticated";

grant trigger on table "public"."collections" to "authenticated";

grant truncate on table "public"."collections" to "authenticated";

grant update on table "public"."collections" to "authenticated";

grant delete on table "public"."collections" to "service_role";

grant insert on table "public"."collections" to "service_role";

grant references on table "public"."collections" to "service_role";

grant select on table "public"."collections" to "service_role";

grant trigger on table "public"."collections" to "service_role";

grant truncate on table "public"."collections" to "service_role";

grant update on table "public"."collections" to "service_role";

grant delete on table "public"."hyperboard_collections" to "anon";

grant insert on table "public"."hyperboard_collections" to "anon";

grant references on table "public"."hyperboard_collections" to "anon";

grant select on table "public"."hyperboard_collections" to "anon";

grant trigger on table "public"."hyperboard_collections" to "anon";

grant truncate on table "public"."hyperboard_collections" to "anon";

grant update on table "public"."hyperboard_collections" to "anon";

grant delete on table "public"."hyperboard_collections" to "authenticated";

grant insert on table "public"."hyperboard_collections" to "authenticated";

grant references on table "public"."hyperboard_collections" to "authenticated";

grant select on table "public"."hyperboard_collections" to "authenticated";

grant trigger on table "public"."hyperboard_collections" to "authenticated";

grant truncate on table "public"."hyperboard_collections" to "authenticated";

grant update on table "public"."hyperboard_collections" to "authenticated";

grant delete on table "public"."hyperboard_collections" to "service_role";

grant insert on table "public"."hyperboard_collections" to "service_role";

grant references on table "public"."hyperboard_collections" to "service_role";

grant select on table "public"."hyperboard_collections" to "service_role";

grant trigger on table "public"."hyperboard_collections" to "service_role";

grant truncate on table "public"."hyperboard_collections" to "service_role";

grant update on table "public"."hyperboard_collections" to "service_role";

grant delete on table "public"."hypercerts" to "anon";

grant insert on table "public"."hypercerts" to "anon";

grant references on table "public"."hypercerts" to "anon";

grant select on table "public"."hypercerts" to "anon";

grant trigger on table "public"."hypercerts" to "anon";

grant truncate on table "public"."hypercerts" to "anon";

grant update on table "public"."hypercerts" to "anon";

grant delete on table "public"."hypercerts" to "authenticated";

grant insert on table "public"."hypercerts" to "authenticated";

grant references on table "public"."hypercerts" to "authenticated";

grant select on table "public"."hypercerts" to "authenticated";

grant trigger on table "public"."hypercerts" to "authenticated";

grant truncate on table "public"."hypercerts" to "authenticated";

grant update on table "public"."hypercerts" to "authenticated";

grant delete on table "public"."hypercerts" to "service_role";

grant insert on table "public"."hypercerts" to "service_role";

grant references on table "public"."hypercerts" to "service_role";

grant select on table "public"."hypercerts" to "service_role";

grant trigger on table "public"."hypercerts" to "service_role";

grant truncate on table "public"."hypercerts" to "service_role";

grant update on table "public"."hypercerts" to "service_role";


create policy "Enable insert for authenticated users only"
    on "public"."collections"
    as permissive
    for insert
    to authenticated
    with check (true);


create policy "Enable read access for all users"
    on "public"."collections"
    as permissive
    for select
    to public
    using (true);


create policy "Enable read access for all users"
    on "public"."hyperboard_collections"
    as permissive
    for select
    to public
    using (true);


create policy "Enable insert for authenticated users only"
    on "public"."hypercerts"
    as permissive
    for insert
    to authenticated
    with check (true);


create policy "Enable read access for all users"
    on "public"."hypercerts"
    as permissive
    for select
    to public
    using (true);

alter table "public"."blueprints" add column "minted" boolean not null default false;
