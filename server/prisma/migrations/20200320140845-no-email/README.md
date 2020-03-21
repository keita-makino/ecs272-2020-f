# Migration `20200320140845-no-email`

This migration has been generated at 3/20/2020, 2:08:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.email"

ALTER TABLE "public"."User" DROP COLUMN "email",
DROP COLUMN "password";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200320134759-double..20200320140845-no-email
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
@@ -42,10 +42,8 @@
   user     User
 }
 model User {
-  email    String   @default("") @unique
-  id       String   @default("") @id
-  password String   @default("")
-  room     Room[]
-  setting  Setting?
+  id      String   @default("") @id
+  room    Room[]
+  setting Setting?
 }
```


