# Migration `20200313200237-not-yet`

This migration has been generated by keita-makino at 3/13/2020, 8:02:37 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."_RoomToUser" (
    "A" integer  NOT NULL ,
    "B" integer  NOT NULL 
) 

CREATE UNIQUE INDEX "_RoomToUser_AB_unique" ON "public"."_RoomToUser"("A","B")

CREATE  INDEX "_RoomToUser_B_index" ON "public"."_RoomToUser"("B")

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("A")REFERENCES "public"."Room"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."_RoomToUser" ADD FOREIGN KEY ("B")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200313195823-complete-for-now..20200313200237-not-yet
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
@@ -26,8 +26,9 @@
 model Room {
   id         Int          @default(autoincrement()) @id
   name       String       @default("")
   recordType RecordType[]
+  user       User[]
 }
 model Setting {
   cellSize Float   @default(0.00025)
@@ -42,6 +43,7 @@
   email    String   @default("") @unique
   id       Int      @default(autoincrement()) @id
   name     String   @default("")
   password String   @default("")
+  room     Room[]
   setting  Setting?
 }
```


