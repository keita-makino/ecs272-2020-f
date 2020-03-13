/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"
import * as prisma from "@prisma/client"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  RecordCreateInput: { // input type
    address?: string | null; // String
    lat?: number | null; // Float
    lng?: number | null; // Float
    name?: string | null; // String
    room: NexusGenInputs['RoomCreateOneWithoutRecordsInput']; // RoomCreateOneWithoutRecordsInput!
    type: NexusGenInputs['RecordTypeCreateOneWithoutRecordsInput']; // RecordTypeCreateOneWithoutRecordsInput!
  }
  RecordCreateManyWithoutRoomInput: { // input type
    connect?: NexusGenInputs['RecordWhereUniqueInput'][] | null; // [RecordWhereUniqueInput!]
    create?: NexusGenInputs['RecordCreateWithoutRoomInput'][] | null; // [RecordCreateWithoutRoomInput!]
  }
  RecordCreateManyWithoutTypeInput: { // input type
    connect?: NexusGenInputs['RecordWhereUniqueInput'][] | null; // [RecordWhereUniqueInput!]
    create?: NexusGenInputs['RecordCreateWithoutTypeInput'][] | null; // [RecordCreateWithoutTypeInput!]
  }
  RecordCreateWithoutRoomInput: { // input type
    address?: string | null; // String
    lat?: number | null; // Float
    lng?: number | null; // Float
    name?: string | null; // String
    type: NexusGenInputs['RecordTypeCreateOneWithoutRecordsInput']; // RecordTypeCreateOneWithoutRecordsInput!
  }
  RecordCreateWithoutTypeInput: { // input type
    address?: string | null; // String
    lat?: number | null; // Float
    lng?: number | null; // Float
    name?: string | null; // String
    room: NexusGenInputs['RoomCreateOneWithoutRecordsInput']; // RoomCreateOneWithoutRecordsInput!
  }
  RecordTypeCreateInput: { // input type
    id: number; // Int!
    name?: string | null; // String
    records?: NexusGenInputs['RecordCreateManyWithoutTypeInput'] | null; // RecordCreateManyWithoutTypeInput
  }
  RecordTypeCreateOneWithoutRecordsInput: { // input type
    connect?: NexusGenInputs['RecordTypeWhereUniqueInput'] | null; // RecordTypeWhereUniqueInput
    create?: NexusGenInputs['RecordTypeCreateWithoutRecordsInput'] | null; // RecordTypeCreateWithoutRecordsInput
  }
  RecordTypeCreateWithoutRecordsInput: { // input type
    id: number; // Int!
    name?: string | null; // String
  }
  RecordTypeWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  RecordWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  RoomCreateInput: { // input type
    name?: string | null; // String
    records?: NexusGenInputs['RecordCreateManyWithoutRoomInput'] | null; // RecordCreateManyWithoutRoomInput
  }
  RoomCreateOneWithoutRecordsInput: { // input type
    connect?: NexusGenInputs['RoomWhereUniqueInput'] | null; // RoomWhereUniqueInput
    create?: NexusGenInputs['RoomCreateWithoutRecordsInput'] | null; // RoomCreateWithoutRecordsInput
  }
  RoomCreateWithoutRecordsInput: { // input type
    name?: string | null; // String
  }
  RoomWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  SettingCreateOneWithoutUserInput: { // input type
    connect?: NexusGenInputs['SettingWhereUniqueInput'] | null; // SettingWhereUniqueInput
    create?: NexusGenInputs['SettingCreateWithoutUserInput'] | null; // SettingCreateWithoutUserInput
  }
  SettingCreateWithoutUserInput: { // input type
    cellSize?: number | null; // Float
    id: number; // Int!
    markSize?: number | null; // Float
  }
  SettingWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserCreateInput: { // input type
    email?: string | null; // String
    name?: string | null; // String
    password?: string | null; // String
    setting?: NexusGenInputs['SettingCreateOneWithoutUserInput'] | null; // SettingCreateOneWithoutUserInput
  }
  UserOrderByInput: { // input type
    email?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    id?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    name?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
    password?: NexusGenEnums['OrderByArg'] | null; // OrderByArg
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
  OrderByArg: prisma.OrderByArg
}

export interface NexusGenRootTypes {
  Mutation: {};
  Query: {};
  Record: prisma.Record;
  RecordType: prisma.RecordType;
  Room: prisma.Room;
  User: prisma.User;
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  RecordCreateInput: NexusGenInputs['RecordCreateInput'];
  RecordCreateManyWithoutRoomInput: NexusGenInputs['RecordCreateManyWithoutRoomInput'];
  RecordCreateManyWithoutTypeInput: NexusGenInputs['RecordCreateManyWithoutTypeInput'];
  RecordCreateWithoutRoomInput: NexusGenInputs['RecordCreateWithoutRoomInput'];
  RecordCreateWithoutTypeInput: NexusGenInputs['RecordCreateWithoutTypeInput'];
  RecordTypeCreateInput: NexusGenInputs['RecordTypeCreateInput'];
  RecordTypeCreateOneWithoutRecordsInput: NexusGenInputs['RecordTypeCreateOneWithoutRecordsInput'];
  RecordTypeCreateWithoutRecordsInput: NexusGenInputs['RecordTypeCreateWithoutRecordsInput'];
  RecordTypeWhereUniqueInput: NexusGenInputs['RecordTypeWhereUniqueInput'];
  RecordWhereUniqueInput: NexusGenInputs['RecordWhereUniqueInput'];
  RoomCreateInput: NexusGenInputs['RoomCreateInput'];
  RoomCreateOneWithoutRecordsInput: NexusGenInputs['RoomCreateOneWithoutRecordsInput'];
  RoomCreateWithoutRecordsInput: NexusGenInputs['RoomCreateWithoutRecordsInput'];
  RoomWhereUniqueInput: NexusGenInputs['RoomWhereUniqueInput'];
  SettingCreateOneWithoutUserInput: NexusGenInputs['SettingCreateOneWithoutUserInput'];
  SettingCreateWithoutUserInput: NexusGenInputs['SettingCreateWithoutUserInput'];
  SettingWhereUniqueInput: NexusGenInputs['SettingWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  UserOrderByInput: NexusGenInputs['UserOrderByInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
  OrderByArg: NexusGenEnums['OrderByArg'];
}

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    createOneRecord: NexusGenRootTypes['Record']; // Record!
    createOneRecordType: NexusGenRootTypes['RecordType']; // RecordType!
    createOneRoom: NexusGenRootTypes['Room']; // Room!
    createOneUser: NexusGenRootTypes['User']; // User!
    deleteOneRoom: NexusGenRootTypes['Room'] | null; // Room
  }
  Query: { // field return type
    record: NexusGenRootTypes['Record'] | null; // Record
    records: NexusGenRootTypes['Record'][]; // [Record!]!
    recordType: NexusGenRootTypes['RecordType'] | null; // RecordType
    recordTypes: NexusGenRootTypes['RecordType'][]; // [RecordType!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  Record: { // field return type
    address: string; // String!
    id: number; // Int!
    lat: number; // Float!
    lng: number; // Float!
    name: string; // String!
    type: NexusGenRootTypes['RecordType']; // RecordType!
  }
  RecordType: { // field return type
    color: number[]; // [Int!]!
    id: number; // Int!
    name: string; // String!
    records: NexusGenRootTypes['Record'][]; // [Record!]!
  }
  Room: { // field return type
    id: number; // Int!
    name: string; // String!
    records: NexusGenRootTypes['Record'][]; // [Record!]!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string; // String!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createOneRecord: { // args
      data: NexusGenInputs['RecordCreateInput']; // RecordCreateInput!
    }
    createOneRecordType: { // args
      data: NexusGenInputs['RecordTypeCreateInput']; // RecordTypeCreateInput!
    }
    createOneRoom: { // args
      data: NexusGenInputs['RoomCreateInput']; // RoomCreateInput!
    }
    createOneUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
    deleteOneRoom: { // args
      where: NexusGenInputs['RoomWhereUniqueInput']; // RoomWhereUniqueInput!
    }
  }
  Query: {
    record: { // args
      where: NexusGenInputs['RecordWhereUniqueInput']; // RecordWhereUniqueInput!
    }
    records: { // args
      after?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      before?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    recordType: { // args
      where: NexusGenInputs['RecordTypeWhereUniqueInput']; // RecordTypeWhereUniqueInput!
    }
    recordTypes: { // args
      after?: NexusGenInputs['RecordTypeWhereUniqueInput'] | null; // RecordTypeWhereUniqueInput
      before?: NexusGenInputs['RecordTypeWhereUniqueInput'] | null; // RecordTypeWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      after?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      before?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      orderBy?: NexusGenInputs['UserOrderByInput'] | null; // UserOrderByInput
      skip?: number | null; // Int
    }
  }
  RecordType: {
    records: { // args
      after?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      before?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
  Room: {
    records: { // args
      after?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      before?: NexusGenInputs['RecordWhereUniqueInput'] | null; // RecordWhereUniqueInput
      first?: number | null; // Int
      last?: number | null; // Int
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Mutation" | "Query" | "Record" | "RecordType" | "Room" | "User";

export type NexusGenInputNames = "RecordCreateInput" | "RecordCreateManyWithoutRoomInput" | "RecordCreateManyWithoutTypeInput" | "RecordCreateWithoutRoomInput" | "RecordCreateWithoutTypeInput" | "RecordTypeCreateInput" | "RecordTypeCreateOneWithoutRecordsInput" | "RecordTypeCreateWithoutRecordsInput" | "RecordTypeWhereUniqueInput" | "RecordWhereUniqueInput" | "RoomCreateInput" | "RoomCreateOneWithoutRecordsInput" | "RoomCreateWithoutRecordsInput" | "RoomWhereUniqueInput" | "SettingCreateOneWithoutUserInput" | "SettingCreateWithoutUserInput" | "SettingWhereUniqueInput" | "UserCreateInput" | "UserOrderByInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = "OrderByArg";

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}