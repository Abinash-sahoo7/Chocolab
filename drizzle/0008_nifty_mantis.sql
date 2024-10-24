ALTER TABLE "order" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "product_id" integer;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "status" varchar(10) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "type" varchar(6) DEFAULT 'quick';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "price" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "address" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "qty" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order" ADD CONSTRAINT "order_product_id_Products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."Products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
