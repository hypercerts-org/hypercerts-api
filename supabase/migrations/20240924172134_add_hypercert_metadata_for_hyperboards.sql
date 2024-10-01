alter table "public"."hypercerts"
    drop constraint "hyperboard_claims_pkey";

drop index if exists "public"."hyperboard_claims_pkey";

create table "public"."collection_admins"
(
    "created_at"    timestamp with time zone not null default now(),
    "collection_id" uuid                     not null,
    "user_id"       uuid                     not null
);


alter table "public"."collection_admins"
    enable row level security;

create table "public"."hyperboard_admins"
(
    "created_at"    timestamp with time zone not null default now(),
    "hyperboard_id" uuid                     not null,
    "user_id"       uuid                     not null
);


alter table "public"."hyperboard_admins"
    enable row level security;

create table "public"."hyperboard_hypercert_metadata"
(
    "created_at"    timestamp with time zone not null default now(),
    "hyperboard_id" uuid                     not null,
    "collection_id" uuid                     not null,
    "display_size"  bigint                            default '1'::bigint,
    "hypercert_id"  text                     not null
);


alter table "public"."hyperboard_hypercert_metadata"
    enable row level security;

alter table "public"."hypercerts"
    drop column "display_size";

alter table "public"."hypercerts"
    drop column "id";

alter table "public"."collections"
    alter column chain_id type numeric(78,0)[] using array [chain_id]::numeric(78,0)[];

alter table "public"."hyperboards"
    alter column chain_id type numeric(78,0)[] using array [chain_id]::numeric(78,0)[];


CREATE UNIQUE INDEX collection_admins_pkey ON public.collection_admins USING btree (collection_id, user_id);

CREATE UNIQUE INDEX hyperboard_admins_pkey ON public.hyperboard_admins USING btree (hyperboard_id, user_id);

CREATE UNIQUE INDEX hyperboard_hypercert_metadata_pkey ON public.hyperboard_hypercert_metadata USING btree (hyperboard_id, collection_id, hypercert_id);

CREATE UNIQUE INDEX hypercerts_pkey ON public.hypercerts USING btree (collection_id, hypercert_id);

alter table "public"."collection_admins"
    add constraint "collection_admins_pkey" PRIMARY KEY using index "collection_admins_pkey";

alter table "public"."hyperboard_admins"
    add constraint "hyperboard_admins_pkey" PRIMARY KEY using index "hyperboard_admins_pkey";

alter table "public"."hyperboard_hypercert_metadata"
    add constraint "hyperboard_hypercert_metadata_pkey" PRIMARY KEY using index "hyperboard_hypercert_metadata_pkey";

alter table "public"."hypercerts"
    add constraint "hypercerts_pkey" PRIMARY KEY using index "hypercerts_pkey";

alter table "public"."collection_admins"
    add constraint "collection_admins_admin_address_fkey" FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collection_admins"
    validate constraint "collection_admins_admin_address_fkey";

alter table "public"."collection_admins"
    add constraint "collection_admins_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."collection_admins"
    validate constraint "collection_admins_collection_id_fkey";

alter table "public"."hyperboard_admins"
    add constraint "hyperboard_admins_admin_address_fkey" FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_admins"
    validate constraint "hyperboard_admins_admin_address_fkey";

alter table "public"."hyperboard_admins"
    add constraint "hyperboard_admins_hyperboard_id_fkey" FOREIGN KEY (hyperboard_id) REFERENCES hyperboards (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_admins"
    validate constraint "hyperboard_admins_hyperboard_id_fkey";

alter table "public"."hyperboard_hypercert_metadata"
    add constraint "hyperboard_hypercert_metadata_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_hypercert_metadata"
    validate constraint "hyperboard_hypercert_metadata_collection_id_fkey";

alter table "public"."hyperboard_hypercert_metadata"
    add constraint "hyperboard_hypercert_metadata_hyperboard_id_fkey" FOREIGN KEY (hyperboard_id) REFERENCES hyperboards (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_hypercert_metadata"
    validate constraint "hyperboard_hypercert_metadata_hyperboard_id_fkey";

alter table "public"."hyperboard_hypercert_metadata"
    add constraint "hyperboard_hypercert_metadata_hypercert_id_collection_id_fkey" FOREIGN KEY (hypercert_id, collection_id) REFERENCES hypercerts (hypercert_id, collection_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_hypercert_metadata"
    validate constraint "hyperboard_hypercert_metadata_hypercert_id_collection_id_fkey";

grant delete on table "public"."collection_admins" to "anon";

grant insert on table "public"."collection_admins" to "anon";

grant references on table "public"."collection_admins" to "anon";

grant select on table "public"."collection_admins" to "anon";

grant trigger on table "public"."collection_admins" to "anon";

grant truncate on table "public"."collection_admins" to "anon";

grant update on table "public"."collection_admins" to "anon";

grant delete on table "public"."collection_admins" to "authenticated";

grant insert on table "public"."collection_admins" to "authenticated";

grant references on table "public"."collection_admins" to "authenticated";

grant select on table "public"."collection_admins" to "authenticated";

grant trigger on table "public"."collection_admins" to "authenticated";

grant truncate on table "public"."collection_admins" to "authenticated";

grant update on table "public"."collection_admins" to "authenticated";

grant delete on table "public"."collection_admins" to "service_role";

grant insert on table "public"."collection_admins" to "service_role";

grant references on table "public"."collection_admins" to "service_role";

grant select on table "public"."collection_admins" to "service_role";

grant trigger on table "public"."collection_admins" to "service_role";

grant truncate on table "public"."collection_admins" to "service_role";

grant update on table "public"."collection_admins" to "service_role";

grant delete on table "public"."hyperboard_admins" to "anon";

grant insert on table "public"."hyperboard_admins" to "anon";

grant references on table "public"."hyperboard_admins" to "anon";

grant select on table "public"."hyperboard_admins" to "anon";

grant trigger on table "public"."hyperboard_admins" to "anon";

grant truncate on table "public"."hyperboard_admins" to "anon";

grant update on table "public"."hyperboard_admins" to "anon";

grant delete on table "public"."hyperboard_admins" to "authenticated";

grant insert on table "public"."hyperboard_admins" to "authenticated";

grant references on table "public"."hyperboard_admins" to "authenticated";

grant select on table "public"."hyperboard_admins" to "authenticated";

grant trigger on table "public"."hyperboard_admins" to "authenticated";

grant truncate on table "public"."hyperboard_admins" to "authenticated";

grant update on table "public"."hyperboard_admins" to "authenticated";

grant delete on table "public"."hyperboard_admins" to "service_role";

grant insert on table "public"."hyperboard_admins" to "service_role";

grant references on table "public"."hyperboard_admins" to "service_role";

grant select on table "public"."hyperboard_admins" to "service_role";

grant trigger on table "public"."hyperboard_admins" to "service_role";

grant truncate on table "public"."hyperboard_admins" to "service_role";

grant update on table "public"."hyperboard_admins" to "service_role";

grant delete on table "public"."hyperboard_hypercert_metadata" to "anon";

grant insert on table "public"."hyperboard_hypercert_metadata" to "anon";

grant references on table "public"."hyperboard_hypercert_metadata" to "anon";

grant select on table "public"."hyperboard_hypercert_metadata" to "anon";

grant trigger on table "public"."hyperboard_hypercert_metadata" to "anon";

grant truncate on table "public"."hyperboard_hypercert_metadata" to "anon";

grant update on table "public"."hyperboard_hypercert_metadata" to "anon";

grant delete on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant insert on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant references on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant select on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant trigger on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant truncate on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant update on table "public"."hyperboard_hypercert_metadata" to "authenticated";

grant delete on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant insert on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant references on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant select on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant trigger on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant truncate on table "public"."hyperboard_hypercert_metadata" to "service_role";

grant update on table "public"."hyperboard_hypercert_metadata" to "service_role";

create policy "Enable read access for all users"
    on "public"."collection_admins"
    as permissive
    for select
    to public
    using (true);


create policy "Enable read access for all users"
    on "public"."collection_blueprints"
    as permissive
    for select
    to public
    using (true);


create policy "Enable read access for all users"
    on "public"."hyperboard_admins"
    as permissive
    for select
    to public
    using (true);


create policy "Enable read access for all users"
    on "public"."hyperboard_hypercert_metadata"
    as permissive
    for select
    to public
    using (true);


drop policy "Enable delete for users based on address" on "public"."hyperboards";

drop policy "Enable insert for authenticated users only" on "public"."hyperboards";

drop policy "Enable update for users based on address" on "public"."hyperboards";

drop function if exists public.add_claim_from_blueprint(registry_id uuid, hypercert_id text, chain_id integer,
                                                        admin_id text, owner_id text, blueprint_id bigint);


create table "public"."blueprint_admins"
(
    "created_at"   timestamp with time zone not null default now(),
    "user_id"      uuid                     not null,
    "blueprint_id" bigint                   not null
);


alter table "public"."blueprint_admins"
    enable row level security;

alter table "public"."blueprints"
    drop column "admin_id";

CREATE UNIQUE INDEX blueprint_admins_pkey ON public.blueprint_admins USING btree (user_id, blueprint_id);

alter table "public"."blueprint_admins"
    add constraint "blueprint_admins_pkey" PRIMARY KEY using index "blueprint_admins_pkey";

alter table "public"."blueprint_admins"
    add constraint "blueprint_admins_blueprint_id_fkey" FOREIGN KEY (blueprint_id) REFERENCES blueprints (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."blueprint_admins"
    validate constraint "blueprint_admins_blueprint_id_fkey";

alter table "public"."blueprint_admins"
    add constraint "blueprint_admins_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."blueprint_admins"
    validate constraint "blueprint_admins_user_id_fkey";

grant delete on table "public"."blueprint_admins" to "anon";

grant insert on table "public"."blueprint_admins" to "anon";

grant references on table "public"."blueprint_admins" to "anon";

grant select on table "public"."blueprint_admins" to "anon";

grant trigger on table "public"."blueprint_admins" to "anon";

grant truncate on table "public"."blueprint_admins" to "anon";

grant update on table "public"."blueprint_admins" to "anon";

grant delete on table "public"."blueprint_admins" to "authenticated";

grant insert on table "public"."blueprint_admins" to "authenticated";

grant references on table "public"."blueprint_admins" to "authenticated";

grant select on table "public"."blueprint_admins" to "authenticated";

grant trigger on table "public"."blueprint_admins" to "authenticated";

grant truncate on table "public"."blueprint_admins" to "authenticated";

grant update on table "public"."blueprint_admins" to "authenticated";

grant delete on table "public"."blueprint_admins" to "service_role";

grant insert on table "public"."blueprint_admins" to "service_role";

grant references on table "public"."blueprint_admins" to "service_role";

grant select on table "public"."blueprint_admins" to "service_role";

grant trigger on table "public"."blueprint_admins" to "service_role";

grant truncate on table "public"."blueprint_admins" to "service_role";

grant update on table "public"."blueprint_admins" to "service_role";

alter table "public"."collections"
    drop column "admin_id";

alter table "public"."hypercerts"
    drop column "admin_id";

alter table "public"."hypercerts"
    drop column "chain_id";

alter table "public"."blueprints"
    drop column "display_size";

alter table "public"."collection_blueprints"
    add column "display_size" bigint not null;

alter table "public"."hyperboards"
    drop column "admin_id";

alter table "public"."collections"
    drop column "chain_id";

alter table "public"."collections"
    add column "chain_ids" numeric(78,0)[] not null;

alter table "public"."hyperboards"
    drop column "chain_id";

alter table "public"."hyperboards"
    add column "chain_ids" numeric(78,0)[] not null;

