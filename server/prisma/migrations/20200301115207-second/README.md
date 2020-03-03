# Migration `20200301115207-second`

This migration has been generated at 3/1/2020, 11:52:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."MainData" DROP COLUMN "type",
ADD COLUMN "type" integer  NOT NULL ;

ALTER TABLE "public"."InitialData" DROP COLUMN "type",
ADD COLUMN "type" integer  NOT NULL ;

ALTER TABLE "public"."MainData" ADD FOREIGN KEY ("type") REFERENCES "public"."DataType"("id") ON DELETE RESTRICT

ALTER TABLE "public"."InitialData" ADD FOREIGN KEY ("type") REFERENCES "public"."DataType"("id") ON DELETE RESTRICT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200301111719-initial..20200301115207-second
--- datamodel.dml
+++ datamodel.dml
@@ -3,11 +3,36 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://postgres:l2Z9CeabVSrv8x3kPo!@localhost:5432/ecs272-2020-f?schema=public&sslmode=prefer"
 }
+model DataType {
+  id           Int           @default(autoincrement()) @id
+  name         String        @default("")
+  initialDatas InitialData[] @relation(references: [type])
+  mainDatas    MainData[]    @relation(references: [type])
+}
+
+model InitialData {
+  address String   @default("")
+  id      Int      @default(autoincrement()) @id
+  lat     Float    @default(0)
+  lng     Float    @default(0)
+  name    String   @default("")
+  type    DataType
+}
+
+model MainData {
+  address String   @default("")
+  id      Int      @default(autoincrement()) @id
+  lat     Float    @default(0)
+  lng     Float    @default(0)
+  name    String   @default("")
+  type    DataType
+}
+
 model Post {
   content   String?
   id        Int     @default(autoincrement()) @id
   published Boolean @default(false)
@@ -20,28 +45,5 @@
   id       Int     @default(autoincrement()) @id
   name     String?
   password String  @default("")
   posts    Post[]
-}
-
-model MainData {
-  address String
-  id      Int       @id
-  lat     Float
-  lng     Float
-  name    String
-  type    DataType?
-}
-
-model InitialData {
-  address String
-  id      Int       @id
-  lat     Float
-  lng     Float
-  name    String
-  type    DataType?
-}
-
-model DataType {
-  id   Int    @id
-  name String
 }
```


