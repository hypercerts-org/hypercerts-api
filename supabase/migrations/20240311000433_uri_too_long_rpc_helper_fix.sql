drop function fraction_sponsor_metadata_by_fraction_id;

create or replace function fraction_sponsor_metadata_by_fraction_id(fractions text[], chain int8) returns setof fraction_sponsor_metadata as $$
select * from fraction_sponsor_metadata
where fraction_id = any(fractions) and chain_id = chain
$$ language sql;