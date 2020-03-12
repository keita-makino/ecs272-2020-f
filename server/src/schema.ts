import { nexusPrismaPlugin } from "nexus-prisma";
import { idArg, makeSchema, objectType, stringArg } from "nexus";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  }
});

const Record = objectType({
  name: "Record",
  definition(t) {
    t.model.id();
    t.model.lat();
    t.model.lng();
    t.model.address();
    t.model.name();
    t.model.type();
  }
});

const RecordType = objectType({
  name: "RecordType",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.records();
  }
});

const Room = objectType({
  name: "Room",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.records();
  }
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.record();
    t.crud.records();
    t.crud.recordTypes();
    t.crud.users({ ordering: true });
    t.crud.user();
  }
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneRecord();
    t.crud.createOneRecordType();
    t.crud.createOneRoom();
    t.crud.createOneUser();
    t.crud.deleteOneRoom();
  }
});

export const schema = makeSchema({
  types: [User, Record, RecordType, Room, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + "/../schema.graphql",
    typegen: __dirname + "/generated/nexus.ts"
  },
  typegenAutoConfig: {
    contextType: "Context.Context",
    sources: [
      {
        source: "@prisma/client",
        alias: "prisma"
      },
      {
        source: require.resolve("./context"),
        alias: "Context"
      }
    ]
  }
});
