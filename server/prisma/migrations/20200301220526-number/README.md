# Migration `20200301220526-number`

This migration has been generated at 3/1/2020, 10:05:26 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."User" ADD COLUMN "number" Decimal(65,30)  NOT NULL DEFAULT 0;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200301220318-third..20200301220526-number
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://postgres:l2Z9CeabVSrv8x3kPo!@localhost:5432/ecs272-2020-f?schema=public&sslmode=prefer"
 }
 model DataType {
   id          Int           @id
@@ -35,6 +35,7 @@
 model User {
   email    String  @default("") @unique
   id       Int     @default(autoincrement()) @id
   name     String?
+  number   Float   @default(0)
   password String  @default("")
 }
```


