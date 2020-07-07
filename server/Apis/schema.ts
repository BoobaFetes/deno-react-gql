import { buildSchema } from "https://cdn.pika.dev/graphql@^15.1.0";

console.log("server is creating GraphQL type definitions");

// @ts-ignore
const schema = buildSchema(`
schema{
  query: Query  
  mutation: Mutation
}
type Query {
  persons: [Person]
  person(id: Int!): Person
  rooms: [Room]
  room(id: Int!): Room
}
type Mutation {
  upsertPerson(input: PersonInput!): Person
  removePerson(id: Int!): Person

  upsertRoom(input: RoomInput!): Room
  removeRoom(id: Int!): Room
}
type Person {
  id: Int!
  familyName: String!
  nickName: String!
}
input PersonInput {
  id: Int
  familyName: String!
  nickName: String!
}
type Room {
  id: Int!
  name: String!
  persons: [Int]!
}
input RoomInput {
  id: Int
  name: String!
  persons: [Int]!
}
`);
// type Mutation {
//   addPerson(input: PersonInput): Person!
//   addRoom(input: RoomInput): Room!
// }

export default schema;
