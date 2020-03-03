# Migration `20200301111719-initial`

This migration has been generated at 3/1/2020, 11:17:19 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
    "author" integer   ,
    "content" text   ,
    "id" SERIAL,
    "published" boolean  NOT NULL DEFAULT false,
    "title" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "email" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "name" text   ,
    "password" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."MainData" (
    "address" text  NOT NULL DEFAULT '',
    "id" integer  NOT NULL ,
    "lat" Decimal(65,30)  NOT NULL DEFAULT 0,
    "lng" Decimal(65,30)  NOT NULL DEFAULT 0,
    "name" text  NOT NULL DEFAULT '',
    "type" integer   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."InitialData" (
    "address" text  NOT NULL DEFAULT '',
    "id" integer  NOT NULL ,
    "lat" Decimal(65,30)  NOT NULL DEFAULT 0,
    "lng" Decimal(65,30)  NOT NULL DEFAULT 0,
    "name" text  NOT NULL DEFAULT '',
    "type" integer   ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."DataType" (
    "id" integer  NOT NULL ,
    "name" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("author") REFERENCES "public"."User"("id") ON DELETE SET NULL

ALTER TABLE "public"."MainData" ADD FOREIGN KEY ("type") REFERENCES "public"."DataType"("id") ON DELETE SET NULL

ALTER TABLE "public"."InitialData" ADD FOREIGN KEY ("type") REFERENCES "public"."DataType"("id") ON DELETE SET NULL
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200301111719-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,47 @@
+generator photon {
+  provider = "photonjs"
+}
+
+datasource db {
+  provider = "postgresql"
+  url      = "postgresql://postgres:l2Z9CeabVSrv8x3kPo!@localhost:5432/ecs272-2020-f?schema=public&sslmode=prefer"
+}
+
+model Post {
+  content   String?
+  id        Int     @default(autoincrement()) @id
+  published Boolean @default(false)
+  title     String  @default("")
+  author    User?
+}
+
+model User {
+  email    String  @default("") @unique
+  id       Int     @default(autoincrement()) @id
+  name     String?
+  password String  @default("")
+  posts    Post[]
+}
+
+model MainData {
+  address String
+  id      Int       @id
+  lat     Float
+  lng     Float
+  name    String
+  type    DataType?
+}
+
+model InitialData {
+  address String
+  id      Int       @id
+  lat     Float
+  lng     Float
+  name    String
+  type    DataType?
+}
+
+model DataType {
+  id   Int    @id
+  name String
+}
```


