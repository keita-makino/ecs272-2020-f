import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { createContext } from "./context";

new ApolloServer({ schema, context: createContext }).listen();
