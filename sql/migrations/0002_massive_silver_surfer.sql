CREATE TABLE "health_checkups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"checkup_date" date NOT NULL,
	"raw_data" jsonb,
	"parsed_data" jsonb,
	"analysis_result" jsonb,
	"protocols" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "health_checkups" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "huberman_protocols" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"related_biomarkers" text[],
	"description" text,
	"scientific_basis" text,
	"implementation_steps" jsonb,
	"source_episode" text,
	"embedding" vector(768),
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "huberman_protocols" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "checkup_id" uuid;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "ci" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "verified_at" timestamp;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "subscription_status" text DEFAULT 'free';--> statement-breakpoint
ALTER TABLE "health_checkups" ADD CONSTRAINT "health_checkups_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE POLICY "select-checkup-policy" ON "health_checkups" AS PERMISSIVE FOR SELECT TO "authenticated" USING ((select auth.uid()) = "health_checkups"."user_id");--> statement-breakpoint
CREATE POLICY "insert-checkup-policy" ON "health_checkups" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK ((select auth.uid()) = "health_checkups"."user_id");--> statement-breakpoint
CREATE POLICY "read-protocols-policy" ON "huberman_protocols" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);