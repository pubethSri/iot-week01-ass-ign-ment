CREATE TABLE "students" (
	"stid" integer PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL,
	"birthday" date NOT NULL,
	"gender" varchar(50) NOT NULL
);
--> statement-breakpoint
DROP TABLE "books" CASCADE;--> statement-breakpoint
DROP TABLE "genres" CASCADE;