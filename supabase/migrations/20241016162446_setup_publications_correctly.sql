-- remove the supabase_realtime publication
drop
    publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

alter
    publication supabase_realtime add table users;
alter
    publication supabase_realtime add table hyperboards;
alter
    publication supabase_realtime add
    table collections;
alter
    publication supabase_realtime add
    table hypercerts;
alter
    publication supabase_realtime add
    table hyperboard_hypercert_metadata;
alter
    publication supabase_realtime add
    table hyperboard_collections;
alter
    publication supabase_realtime add
    table hyperboard_blueprint_metadata;
alter
    publication supabase_realtime add
    table collection_blueprints;
alter publication supabase_realtime add table blueprints;
alter publication supabase_realtime add table collection_admins;
alter publication supabase_realtime add table hyperboard_admins;