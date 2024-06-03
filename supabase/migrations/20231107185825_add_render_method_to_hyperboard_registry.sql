alter table "public"."hyperboard_registries" add column "render_method" text not null default 'full';

create policy "Enable insert for authenticated users only"
    on "public"."default_sponsor_metadata"
    as permissive
    for insert
    to authenticated
    with check (true);


create policy "Update for authenticated users"
    on "public"."default_sponsor_metadata"
    as permissive
    for update
    to authenticated
    using (true)
    with check (true);
