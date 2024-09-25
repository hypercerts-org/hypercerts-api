alter table "public"."users" drop column "auth";

alter table "public"."users" drop column "email";

alter table "public"."users" drop column "id";

alter table "public"."users" add column "avatar" text;

alter table "public"."users" add column "display_name" text;

alter table "public"."users" alter column "address" type text;

-- remove the supabase_realtime publication
drop
    publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

alter
    publication supabase_realtime add table users;