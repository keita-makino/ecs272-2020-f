# Migration `20200301220318-third`

This migration has been generated at 3/1/2020, 10:03:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200301115207-second..20200301220318-third
--- datamodel.dml
+++ datamodel.dml
@@ -1,18 +1,18 @@
 generator photon {
-  provider = "photonjs"
+  provider = "prisma-client-js"
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = "postgresql://postgres:l2Z9CeabVSrv8x3kPo!@localhost:5432/ecs272-2020-f?schema=public&sslmode=prefer"
 }
 model DataType {
-  id           Int           @default(autoincrement()) @id
-  name         String        @default("")
-  initialDatas InitialData[] @relation(references: [type])
-  mainDatas    MainData[]    @relation(references: [type])
+  id          Int           @id
+  name        String        @default("")
+  initialData InitialData[]
+  mainData    MainData[]
 }
 model InitialData {
   address String   @default("")
@@ -31,19 +31,10 @@
   name    String   @default("")
   type    DataType
 }
-model Post {
-  content   String?
-  id        Int     @default(autoincrement()) @id
-  published Boolean @default(false)
-  title     String  @default("")
-  author    User?
-}
-
 model User {
   email    String  @default("") @unique
   id       Int     @default(autoincrement()) @id
   name     String?
   password String  @default("")
-  posts    Post[]
 }
```


