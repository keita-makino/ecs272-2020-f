import { makeExecutableSchema } from "graphql-tools";
import { Context } from "./context";

const typeDefs = `
type User {
  email: String!
  id: ID!
  name: String
  number: Float!
}
type Record {
  id: ID!
  lat: Float!
  lng: Float!
  name: String!
  address: String!
  type: DataType!
}
type DataType {
  id: ID!
  name: String!
  mainData: [Record!]!
}
type Set {
  type: String!
  locations: [Record!]!
}
type Query {
  records: [Record!]!
  sets: [Set!]!
}
type Mutation {
  createRecord(lat: Float!, lng: Float!, name: String!, address: String!, type: Int!): Record!
  signupUser(data: UserCreateInput!): User!
}
input UserCreateInput {
  email: String!
  id: ID
  name: String
  number: Float
}
`;

const resolvers = {
  Query: {
    records: (_parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.mainData.findMany({
        include: { type: true }
      });
    },
    sets: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.dataType
        .findMany({
          include: { mainData: true }
        })
        .then(data => {
          return data.map(item => ({
            type: item.name,
            locations: item.mainData
          }));
        });
    }
  },
  Mutation: {
    createRecord: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.mainData.create({
        data: {
          lat: args.lat,
          lng: args.lat,
          name: args.name,
          address: args.address,
          type: {
            connect: {
              id: args.type
            }
          }
        }
      });
    },
    signupUser: (_parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.create(args);
    }
  }
};

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});
