import DataBase from "../../DataBase.ts";
import { IPersonInput, IHasId } from "../../models.ts";

console.log("server is creating GraphQL resolvers");

const PersonApi = {
  Schema: {
    Query: `
        persons: [Person]
        person(id: Int!): Person
        `,
    Mutation: `
        upsertPerson(input: PersonInput!): Person
        removePerson(id: Int!): Person
        `,
    Type: `
        type Person {
            id: Int!
            familyName: String!
            nickName: String!
        }
        `,
    Input: `
        input PersonInput {
            id: Int
            familyName: String!
            nickName: String!
        }
        `,
  },
  Resolvers: {
    Query: {
      persons: () => DataBase.getPersons(),
      person: ({ id }: IHasId) => DataBase.getPerson(id),
    },
    Mutation: {
      upsertPerson: (data: IPersonInput) => {
        return DataBase.upsertPerson({
          ...data.input,
          id:
            data.input.id !== undefined
              ? data.input.id
              : DataBase.items.persons.length,
        });
      },
      removePerson: ({ id }: IHasId) => {
        return DataBase.removePerson(id);
      },
    },
  },
};
export default PersonApi;
