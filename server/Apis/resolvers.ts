import DataBase from "../DataBase.ts";
import { IPersonInput, IRoomInput, IHasId, IPerson, IRoom } from "../models.ts";

console.log("server is creating GraphQL resolvers");

const queries = {
  persons: () => DataBase.getPersons(),
  person: ({ id }: IHasId) => DataBase.getPerson(id),
  rooms: () => DataBase.getRooms(),
  room: ({ id }: IHasId) => DataBase.getRoom(id),
};

const mutations = {
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
};

export default {
  ...queries,
  ...mutations,
};
