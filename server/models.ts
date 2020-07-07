export interface IHasId {
  id: number;
}
export interface IPerson extends IHasId {
  familyName: string;
  nickName: string;
}
export interface IPersonInput {
  input: IPerson;
}

export interface IRoom extends IHasId {
  name: string;
  persons: number[];
}
export interface IRoomInput {
  input: IRoom;
}
