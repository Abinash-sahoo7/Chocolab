DROP INDEX IF EXISTS "pincode_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pincode_idx" ON "Warehouses" USING btree ("pincode");