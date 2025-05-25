create view collections_with_admins as
select collections.id,
       collections.created_at,
       collections.name,
       collections.description,
       collections.hidden,
       collections.chain_ids,
       u.address AS admin_address,
       u.chain_id AS admin_chain_id,
       u.avatar,
       u.display_name
from public.collections
         join public.collection_admins ca on collections.id = ca.collection_id
         join public.users u on ca.user_id = u.id