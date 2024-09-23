alter table "public"."users" drop column "auth";

alter table "public"."users" drop column "email";

alter table "public"."users" drop column "id";

alter table "public"."users" add column "avatar" text;

alter table "public"."users" add column "display_name" text;

alter table "public"."users" alter column "address" type text;