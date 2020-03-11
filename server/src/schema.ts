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

const Data = objectType({
  name: "MainData",
  definition(t) {
    t.model.id();
    t.model.lat();
    t.model.lng();
    t.model.address();
    t.model.name();
    t.model.type();
  }
});

const DataType = objectType({
  name: "DataType",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.mainData();
  }
});

const Query = objectType({
  name: "Query",
  definition(t) {}
});

const Mutation = objectType({
  name: "Mutation",
  definition(t) {}
});

export const schema = makeSchema({
  types: [User, Data, DataType],
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
