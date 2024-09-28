CREATE TABLE IF NOT EXISTS "Warehouses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"pincode" varchar(6) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "pincode_idx" ON "Warehouses" USING btree ("id");