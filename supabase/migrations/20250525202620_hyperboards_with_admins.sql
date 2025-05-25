create view hyperboards_with_admins as
select hyperboards.id,
       hyperboards.created_at,
       hyperboards.name,
       hyperboards.background_image,
       hyperboards.grayscale_images,
       hyperboards.tile_border_color,
       hyperboards.chain_ids,
       u.address AS admin_address,
       u.chain_id AS admin_chain_id,
       u.avatar,
       u.display_name
from public.hyperboards
         join public.hyperboard_admins ha on hyperboards.id = ha.hyperboard_id
         join public.users u on ha.user_id = u.id