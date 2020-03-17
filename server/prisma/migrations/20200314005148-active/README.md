# Migration `20200314005148-active`

This migration has been generated by keita-makino at 3/14/2020, 12:51:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."_RoomToUser_B_index"

ALTER TABLE "public"."Record" DROP CONSTRAINT IF EXiSTS "Record_type_fkey";

ALTER TABLE "public"."RecordType" DROP CONSTRAINT IF EXiSTS "RecordType_room_fkey",
ADD COLUMN "active" boolean  NOT NULL DEFAULT false;

ALTER TABLE "public"."Setting" DROP CONSTRAINT IF EXiSTS "Setting_user_fkey";

ALTER TABLE "public"."Record" ADD FOREIGN KEY ("type")REFERENCES "public"."RecordType"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."RecordType" ADD FOREIGN KEY ("room")REFERENCES "public"."Room"("id") ON DELETE RESTRICT  ON UPDATE CASCADE

ALTER TABLE "public"."Setting" ADD FOREIGN KEY ("user")REFERENCES "public"."User"("id") ON DELETE RESTRICT  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200313200237-not-yet..20200314005148-active
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
@@ -20,8 +20,9 @@
   id     Int      @default(autoincrement()) @id
   name   String   @default("")
   room   Room
   record Record[]
+  active Boolean
 }
 model Room {
   id         Int          @default(autoincrement()) @id
```

