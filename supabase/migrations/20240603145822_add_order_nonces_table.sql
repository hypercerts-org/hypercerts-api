create table
    public.marketplace_order_nonces
(
    address       text                     not null,
    chain_id      integer                  not null,
    nonce_counter bigint                   not null default '0'::bigint,
    created_at    timestamp with time zone not null default now(),
    constraint marketplace_order_nonces_pkey primary key (address, chain_id)
) tablespace pg_default;