CREATE TABLE "cost_presets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"material_cost_per_kg" numeric(10, 2) NOT NULL,
	"print_weight" numeric(10, 2) NOT NULL,
	"print_time_hours" numeric(10, 2) NOT NULL,
	"power_consumption_kw" numeric(10, 2) NOT NULL,
	"power_cost_per_kwh" numeric(10, 2) NOT NULL,
	"failure_rate_percent" numeric(5, 2) NOT NULL,
	"labor_time_hours" numeric(10, 2) NOT NULL,
	"labor_rate_per_hour" numeric(10, 2) NOT NULL,
	"margin_percent" numeric(10, 2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workshop_supplies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"brand" text,
	"quantity" numeric(10, 2) NOT NULL,
	"unit" text NOT NULL,
	"threshold" numeric(10, 2) NOT NULL,
	"cost" numeric(10, 2) NOT NULL,
	"notes" text,
	"last_restocked" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "uploaded_photos" jsonb DEFAULT '{}';