alter table "public"."marketplace_orders" add column "invalidated" boolean not null default false;

alter table "public"."marketplace_orders" add column "validator_codes" integer[];
