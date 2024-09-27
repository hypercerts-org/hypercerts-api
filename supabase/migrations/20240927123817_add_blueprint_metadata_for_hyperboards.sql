create table "public"."hyperboard_blueprint_metadata" (
                                                          "created_at" timestamp with time zone not null default now(),
                                                          "collection_id" uuid not null,
                                                          "display_size" bigint default '1'::bigint,
                                                          "blueprint_id" bigint not null,
                                                          "hyperboard_id" uuid not null
);


alter table "public"."hyperboard_blueprint_metadata" enable row level security;

alter table "public"."collection_blueprints" drop column "display_size";

CREATE UNIQUE INDEX hyperboard_blueprint_metadata_pkey ON public.hyperboard_blueprint_metadata USING btree (collection_id, blueprint_id, hyperboard_id);

alter table "public"."hyperboard_blueprint_metadata" add constraint "hyperboard_blueprint_metadata_pkey" PRIMARY KEY using index "hyperboard_blueprint_metadata_pkey";

alter table "public"."hyperboard_blueprint_metadata" add constraint "hyperboard_blueprint_metadata_collection_id_blueprint_id_fkey" FOREIGN KEY (collection_id, blueprint_id) REFERENCES collection_blueprints(collection_id, blueprint_id) not valid;

alter table "public"."hyperboard_blueprint_metadata" validate constraint "hyperboard_blueprint_metadata_collection_id_blueprint_id_fkey";

alter table "public"."hyperboard_blueprint_metadata" add constraint "hyperboard_blueprint_metadata_collection_id_fkey" FOREIGN KEY (collection_id) REFERENCES collections(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_blueprint_metadata" validate constraint "hyperboard_blueprint_metadata_collection_id_fkey";

alter table "public"."hyperboard_blueprint_metadata" add constraint "hyperboard_blueprint_metadata_hyperboard_id_fkey" FOREIGN KEY (hyperboard_id) REFERENCES hyperboards(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_blueprint_metadata" validate constraint "hyperboard_blueprint_metadata_hyperboard_id_fkey";

grant delete on table "public"."hyperboard_blueprint_metadata" to "anon";

grant insert on table "public"."hyperboard_blueprint_metadata" to "anon";

grant references on table "public"."hyperboard_blueprint_metadata" to "anon";

grant select on table "public"."hyperboard_blueprint_metadata" to "anon";

grant trigger on table "public"."hyperboard_blueprint_metadata" to "anon";

grant truncate on table "public"."hyperboard_blueprint_metadata" to "anon";

grant update on table "public"."hyperboard_blueprint_metadata" to "anon";

grant delete on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant insert on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant references on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant select on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant trigger on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant truncate on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant update on table "public"."hyperboard_blueprint_metadata" to "authenticated";

grant delete on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant insert on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant references on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant select on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant trigger on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant truncate on table "public"."hyperboard_blueprint_metadata" to "service_role";

grant update on table "public"."hyperboard_blueprint_metadata" to "service_role";
