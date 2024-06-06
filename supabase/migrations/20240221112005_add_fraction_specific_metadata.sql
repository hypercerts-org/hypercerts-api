create table "public"."fraction_sponsor_metadata"
(
    "created_at"   timestamp with time zone not null default now(),
    "type"         text                     not null,
    "companyName"  text,
    "firstName"    text,
    "lastName"     text,
    "image"        text                     not null,
    "hypercert_id" text                     not null,
    "fraction_id"  text                     not null,
    "value"        text                     not null,
    "strategy"     text                     not null,
    "chain_id"     bigint                   not null,
    "id"           uuid                     not null default gen_random_uuid()
);


alter table "public"."fraction_sponsor_metadata"
    enable row level security;

CREATE UNIQUE INDEX fraction_sponsor_metadata_pkey ON public.fraction_sponsor_metadata USING btree (hypercert_id, fraction_id);

alter table "public"."fraction_sponsor_metadata"
    add constraint "fraction_sponsor_metadata_pkey" PRIMARY KEY using index "fraction_sponsor_metadata_pkey";

create policy "Enable insert access for all authenticated users"
    on "public"."fraction_sponsor_metadata"
    as permissive
    for insert
    to authenticated
    with check (true);


create policy "Enable read access for all users"
    on "public"."fraction_sponsor_metadata"
    as permissive
    for select
    to public
    using (true);


create policy "Enable update access for all authenticated users"
    on "public"."fraction_sponsor_metadata"
    as permissive
    for update
    to authenticated
    using (true)
    with check (true);
