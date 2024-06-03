drop policy "Only owners of registry can add a blueprint to it" on "public"."blueprints";

drop policy "Owners of blueprint or minters of blueprint can delete" on "public"."blueprints";

drop policy "Delete claims when you are the owner" on "public"."claims";

drop policy "Only allow for owner of hyperboard" on "public"."hyperboard_registries";

drop policy "Only allow for owner of the hyperboard" on "public"."hyperboard_registries";

drop policy "Enable delete for users based on address" on "public"."hyperboards";

drop policy "Enable update for users based on address" on "public"."hyperboards";

drop policy "Allow owners of registries to delete them based on address" on "public"."registries";

drop policy "Allow owners of registries to update based on address" on "public"."registries";

alter table "public"."hyperboard_registries" drop constraint "hyperboard_registries_hyperboard_id_fkey";

alter table "public"."hyperboard_registries" add constraint "hyperboard_registries_hyperboard_id_fkey" FOREIGN KEY (hyperboard_id) REFERENCES hyperboards(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."hyperboard_registries" validate constraint "hyperboard_registries_hyperboard_id_fkey";

create policy "Only allow update for owner of hyperboard"
on "public"."hyperboard_registries"
as permissive
for update
               to public
               using ((lower((auth.jwt() ->> 'address'::text)) IN ( SELECT lower((hyperboards.admin_id)::text) AS lower
               FROM hyperboards
               WHERE (hyperboard_registries.hyperboard_id = hyperboards.id))))
    with check ((lower((auth.jwt() ->> 'address'::text)) IN ( SELECT lower((hyperboards.admin_id)::text) AS lower
               FROM hyperboards
               WHERE (hyperboard_registries.hyperboard_id = hyperboards.id))));


create policy "Only owners of registry can add a blueprint to it"
on "public"."blueprints"
as permissive
for insert
to public
with check ((lower((auth.jwt() ->> 'address'::text)) IN ( SELECT lower((registries.admin_id)::text) AS lower
   FROM registries
  WHERE (registries.id = blueprints.registry_id))));


create policy "Owners of blueprint or minters of blueprint can delete"
on "public"."blueprints"
as permissive
for delete
to public
using (((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)) OR (lower((auth.jwt() ->> 'address'::text)) = lower((minter_address)::text))));


create policy "Delete claims when you are the owner"
on "public"."claims"
as permissive
for delete
to public
using ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)));


create policy "Only allow for owner of hyperboard"
on "public"."hyperboard_registries"
as permissive
for delete
to public
using ((lower((auth.jwt() ->> 'address'::text)) IN ( SELECT lower((hyperboards.admin_id)::text) AS lower
   FROM hyperboards
  WHERE (hyperboard_registries.hyperboard_id = hyperboards.id))));


create policy "Only allow for owner of the hyperboard"
on "public"."hyperboard_registries"
as permissive
for insert
to public
with check ((lower((auth.jwt() ->> 'address'::text)) IN ( SELECT lower((hyperboards.admin_id)::text) AS lower
   FROM hyperboards
  WHERE (hyperboard_registries.hyperboard_id = hyperboards.id))));


create policy "Enable delete for users based on address"
on "public"."hyperboards"
as permissive
for delete
to public
using ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)));


create policy "Enable update for users based on address"
on "public"."hyperboards"
as permissive
for update
               to public
               using ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)))
    with check ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)));


create policy "Allow owners of registries to delete them based on address"
on "public"."registries"
as permissive
for delete
to public
using ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)));


create policy "Allow owners of registries to update based on address"
on "public"."registries"
as permissive
for update
               to public
               using ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)))
    with check ((lower((auth.jwt() ->> 'address'::text)) = lower((admin_id)::text)));
