ALTER TABLE default_sponsor_metadata DROP CONSTRAINT hyperboard_sponsor_metadata_pkey;

ALTER TABLE default_sponsor_metadata ADD CONSTRAINT default_sponsor_metadata_pkey PRIMARY KEY (address);
ALTER TABLE default_sponsor_metadata DROP COLUMN IF EXISTS id;