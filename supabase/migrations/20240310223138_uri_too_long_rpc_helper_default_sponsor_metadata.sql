create or replace function default_sponsor_metadata_by_address(addresses text[]) returns setof default_sponsor_metadata as $$
select * from default_sponsor_metadata
where address = any(addresses)
$$ language sql;
