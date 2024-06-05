create or replace function fraction_sponsor_metadata_by_fraction_id(fraction_ids text[], chain_id int8) returns setof fraction_sponsor_metadata as $$
select * from fraction_sponsor_metadata
where fraction_id = any(fraction_ids) and chain_id = chain_id;
$$ language sql;