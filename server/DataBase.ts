import { IPerson, IRoom } from "./models.ts";

interface IDataBaseItems {
  rooms: IRoom[];
  persons: IPerson[];
}

type FieldErrorType = Record<string, string | FieldErrorType[]>;

export class DatabaseError extends Error {
  public readonly fields: FieldErrorType;
  constructor(fields: FieldErrorType) {
    super("Database has reached an error");
    this.fields = fields;
  }
}
class DataBaseClass {
  public items: IDataBaseItems = {
    persons: [
      {
        id: 0,
        familyName: "alan",
        nickName: "Walker",
      },
      {
        id: 1,
        familyName: "Mike",
        nickName: "Horn",
      },
      {
        id: 2,
        familyName: "Stephen",
        nickName: "Stephen",
      },
    ],
    rooms: [
      {
        id: 0,
        name: "room #1",
        persons: [0, 1, 2],
      },
      {
        id: 1,
        name: "room #2",
        persons: [1, 2],
      },
    ],
  };

  public getPersons() {
    return this.items.persons || [];
  }

  public getPerson(id: number) {
    return this.getPersons().find((i) => i.id === id);
  }

  private checkPerson({ familyName, nickName }: IPerson): FieldErrorType {
    const errors: FieldErrorType = {};
    if (!familyName) {
      errors["familyName"] = "le nom de famille doit être renseigné.";
    }
    if (!nickName) {
      errors["nickName"] = "le prénom doit être renseigné.";
    }
    return errors;
  }

  public upsertPerson(input: IPerson) {
    const item = { ...input };

    const errors = this.checkPerson(input);
    if (Object.keys(errors).length != 0) {
      throw new DatabaseError(errors);
    }

    const index = this.items.persons.findIndex((i) => i.id === input.id);
    if (index >= 0) {
      DataBase.items.persons.splice(index, 1, item);
    } else {
      DataBase.items.persons.push(item);
    }
    return item;
  }

  public removePerson(id: number) {
    const index = this.items.persons.findIndex((i) => i.id === id);

    if (index < 0) {
      return null;
    }

    const item = this.getPerson(id);
    this.items.persons.splice(index, 1);
    return item;
  }

  public getRooms() {
    return this.items.rooms || [];
  }

  public getRoom(id: number) {
    return this.getRooms().find((i) => i.id === id);
  }

  private checkRoom({ name, persons }: IRoom) {
    const errors: Record<string, string> = {};
    if (!name) {
      errors["name"] = "le nom de la salle doit être renseigné.";
    }
    if (!persons) {
      errors["persons"] = "les participants doivent être renseigné.";
    }
    return errors;
  }
  public upsertRoom(input: IRoom) {
    const item = { ...input };

    const errors = this.checkRoom(item);
    if (Object.keys(errors).length != 0) {
      throw new DatabaseError(errors);
    }

    const index = this.items.rooms.findIndex((i) => i.id === input.id);
    if (index >= 0) {
      DataBase.items.rooms.splice(index, 1, item);
    } else {
      DataBase.items.rooms.push(item);
    }
    return item;
  }

  public removeRoom(id: number) {
    const index = this.items.rooms.findIndex((i) => i.id === id);

    if (index < 0) {
      return null;
    }

    const item = this.getRoom(id);
    this.items.rooms.splice(index, 1);
    return item;
  }
}

const DataBase = new DataBaseClass();
export default DataBase;
