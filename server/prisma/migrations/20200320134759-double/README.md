# Migration `20200320134759-double`

This migration has been generated at 3/20/2020, 1:47:59 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP TABLE "public"."Record","public"."RecordType","public"."Room","public"."Setting","public"."User","public"."_RoomToUser";

CREATE TABLE "public"."Record" (
    "address" text  NOT NULL DEFAULT '',
    "id" SERIAL,
    "lat" Decimal(65,30)  NOT NULL DEFAULT 0,
    "lng" Decimal(65,30)  NOT NULL DEFAULT 0,
    "name" text  NOT NULL DEFAULT '',
    "type" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."RecordType" (
    "active" boolean  NOT NULL DEFAULT true,
    "id" SERIAL,
    "name" text  NOT NULL DEFAULT '',
    "room" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Room" (
    "id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Setting" (
    "bubble" boolean  NOT NULL DEFAULT false,
    "cellSize" Decimal(65,30)  NOT NULL DEFAULT 0.00025,
    "darkMode" boolean  NOT NULL DEFAULT false,
    "edge" boolean  NOT NULL DEFAULT false,
    "height" Decimal(65,30)  NOT NULL DEFAULT 5,
    "id" SERIAL,
    "markSize" Decimal(65,30)  NOT NULL DEFAULT 5,
    "scatter" boolean  NOT NULL DEFAULT false,
    "user" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."User" (
    "email" text  NOT NULL DEFAULT '',
    "id" text  NOT NULL ,
    "password" text  NOT NULL DEFAULT '',
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."_RoomToUser" (
    "A" text  NOT NULL ,
    "B" text  NOT NULL 
) 

CREATE UNIQUE INDEX "Setting_user" ON "public"."Setting"("user")

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "public"."_RoomToUser"("A","B")

CREATE  INDEX "_RoomToUser_B_index" ON "public"."_RoomToUser"("B")

ALTER TABLE "public"."Record" ADD FOREIGN KEY ("type")REFERENCES "public"."RecordType"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."RecordType" ADD FOREIGN KEY ("room")REFERENCES "public"."Room"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Setting" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Room"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200315011028-toggles..20200320134759-double
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgres://ojqgzezcrkkccv:413545d8bc9cfbeb322834d87f2369199c51d226e374dc06da6883681e1fa266@ec2-35-172-85-250.compute-1.amazonaws.com:5432/d23tt9hq4p0gh8"
 }
 model Record {
   address String     @default("")
@@ -17,17 +17,16 @@
 }
 model RecordType {
   id     Int      @default(autoincrement()) @id
+  room   Room
   name   String   @default("")
-  room   Room
   record Record[]
   active Boolean  @default(true)
 }
 model Room {
-  id         Int          @default(autoincrement()) @id
-  name       String       @default("")
+  id         String       @default("") @id
   recordType RecordType[]
   user       User[]
 }
@@ -44,10 +43,9 @@
 }
 model User {
   email    String   @default("") @unique
-  id       Int      @default(autoincrement()) @id
-  name     String   @default("")
+  id       String   @default("") @id
   password String   @default("")
   room     Room[]
   setting  Setting?
 }
```


