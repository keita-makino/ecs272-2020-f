import { nexusPrismaPlugin } from "nexus-prisma";
import {
  idArg,
  makeSchema,
  objectType,
  stringArg,
  intArg,
  mutationType,
  queryType
} from "nexus";
import { hsl } from "color-convert";

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.setting();
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
    t.model.record();
    t.model.active();
    t.list.int("color", {
      args: {
        l: intArg({ required: false })
      },
      resolve({ id }, args, ctx) {
        return hsl.rgb((id * 191) % 255, 80, args.l ? args.l : 60);
      }
    });
  }
});

const Room = objectType({
  name: "Room",
  definition(t) {
    t.model.id();
    t.model.recordType({ ordering: { id: true } });
  }
});

const Setting = objectType({
  name: "Setting",
  definition(t) {
    t.model.id();
    t.model.cellSize();
    t.model.markSize();
    t.model.darkMode();
    t.model.scatter();
    t.model.bubble();
    t.model.edge();
    t.model.height();
    t.model.user();
  }
});

const Query = queryType({
  definition(t) {
    t.crud.record();
    t.crud.records();
    t.crud.recordTypes();
    t.crud.recordType();
    t.crud.users({ ordering: true });
    t.crud.user();
    t.crud.room();
    t.crud.setting();
  }
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneRecord();
    t.crud.deleteOneRecord();
    t.crud.createOneRecordType();
    t.crud.deleteOneRecordType();
    t.crud.createOneRoom();
    t.crud.createOneUser();
    t.crud.updateOneUser();
    t.crud.updateOneSetting();
    t.crud.updateOneRecord();
    t.crud.updateOneRecordType();
  }
});

export const schema = makeSchema({
  types: [User, Record, RecordType, Room, Setting, Query, Mutation],
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
