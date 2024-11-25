create type signature_request_purpose_enum as enum ('update_user_data');

create type signature_request_status_enum as enum ('pending', 'executed', 'canceled');

create table public.signature_requests (
    safe_address citext not null,
    message_hash text not null,
    chain_id integer not null,
    message jsonb not null,
    created_at timestamptz not null default now(),
    purpose signature_request_purpose_enum not null default 'update_user_data',
    status signature_request_status_enum not null default 'pending',
    constraint signature_requests_pkey primary key (safe_address, message_hash)
) tablespace pg_default;
