import DataBase from "../../DataBase.ts";
import { IRoomInput, IHasId } from "../../models.ts";

console.log("server is creating GraphQL resolvers");

const RoomApi = {
  Schema: {
    Query: `
        rooms: [Room]
        room(id: Int!): Room
        `,
    Mutation: `
        upsertRoom(input: RoomInput!): Room
        removeRoom(id: Int!): Room
        `,
    Type: `
        type Room {
            id: Int!
            name: String!
            persons: [Int]!
        }
        `,
    Input: `
        input RoomInput {
            id: Int
            name: String!
            persons: [Int]!
        }
        `,
  },
  Resolvers: {
    Query: {
      rooms: () => DataBase.getRooms(),
      room: ({ id }: IHasId) => DataBase.getRoom(id),
    },
    Mutation: {
      upsertRoom: (data: IRoomInput) => {
        return DataBase.upsertRoom({
          ...data.input,
          id:
            data.input.id !== undefined
              ? data.input.id
              : DataBase.items.rooms.length,
        });
      },
      removeRoom: ({ id }: IHasId) => {
        return DataBase.removeRoom(id);
      },
    },
  },
};

export default RoomApi;
