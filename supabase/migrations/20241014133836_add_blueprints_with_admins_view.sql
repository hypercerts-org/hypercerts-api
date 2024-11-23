create view blueprints_with_admins as
select blueprints.id,
       blueprints.form_values,
       blueprints.created_at,
       blueprints.minter_address,
       blueprints.minted,
       blueprints.hypercert_ids,
       u.address AS admin_address,
       u.chain_id AS admin_chain_id,
       u.avatar,
       u.display_name
from public.blueprints
         join public.blueprint_admins ba on blueprints.id = ba.blueprint_id
         join public.users u on ba.user_id = u.id