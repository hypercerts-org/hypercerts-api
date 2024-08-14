drop policy if exists "Enable read access for all users" on "public"."marketplace_orders";

alter table "public"."marketplace_orders"
    enable row level security;

create policy "Enable read access for all users"
    on "public"."marketplace_orders"
    as permissive
    for select
    to public
    using (true);