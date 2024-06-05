create policy "Only allow for owner of registry"
    on "public"."claims"
    as permissive
    for update
    to public
    using (((auth.jwt() ->> 'address'::text) IN (SELECT hyperboards.admin_id
                                                 FROM hyperboards
                                                          JOIN public.hyperboard_registries hr on hyperboards.id = hr.hyperboard_id
                                                          JOIN public.claims c on hr.registry_id = c.registry_id
                                                 WHERE (hr.registry_id = c.registry_id))));

alter table "public"."claims" add column "display_size" bigint not null default '1'::bigint;
