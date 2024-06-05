alter table "public"."blueprints" add column "display_size" bigint not null default '1'::bigint;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.add_claim_from_blueprint(registry_id uuid, hypercert_id text, chain_id integer, admin_id text, owner_id text, blueprint_id bigint)
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path TO 'public'
AS $function$
declare
    claim_id uuid;
    declare
    old_blueprint_id int4;
    declare
    old_blueprint_display_size int8;
begin
    select id
    into old_blueprint_id
    from blueprints
    where (lower((auth.jwt() ->> 'address'::text)) = lower((minter_address)::text))
      and blueprint_id = blueprint_id;

    select display_size
    into old_blueprint_display_size
    from blueprints
    where (lower((auth.jwt() ->> 'address'::text)) = lower((minter_address)::text))
      and blueprint_id = blueprint_id;

    if
        old_blueprint_id is null then
        raise exception 'Blueprint not found';
    end if;

    insert into claims (registry_id, hypercert_id, chain_id, admin_id, owner_id, display_size)
    values (registry_id, hypercert_id, chain_id, admin_id, owner_id, old_blueprint_display_size) returning id
        into claim_id;

    delete
    from blueprints
    where id = old_blueprint_id;
    return claim_id;
end;
$function$
;
