import { buildSchema, graphql } from "https://cdn.pika.dev/graphql@^15.1.0";
import PersonApi from "./PersonApi/index.ts";
import RoomApi from "./RoomApi/index.ts";

console.log("server is creating GraphQL type definitions");

// @ts-ignore
const schema = buildSchema(`
schema{
  query: Query  
  mutation: Mutation
}
type Query {
  ${RoomApi.Schema.Query}
  ${PersonApi.Schema.Query}
}
type Mutation {
  ${RoomApi.Schema.Mutation}
  ${PersonApi.Schema.Mutation}
}
${RoomApi.Schema.Type}
${RoomApi.Schema.Input}
${PersonApi.Schema.Type}
${PersonApi.Schema.Input}
`);

const resolvers = {
  ...RoomApi.Resolvers.Query,
  ...RoomApi.Resolvers.Mutation,
  ...PersonApi.Resolvers.Query,
  ...PersonApi.Resolvers.Mutation,
};

const executeSchema = async ({ query, variables }: any) => {
  return (await graphql(
    schema,
    query,
    resolvers,
    undefined,
    variables,
    undefined,
    undefined,
    undefined
  )) as object;
};
export default executeSchema;
