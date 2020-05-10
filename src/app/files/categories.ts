import { IMagnet } from './magnets';

export interface ICat{
  id: number,
  name: string,
  magnets?:Array<IMagnet>,
  icon: string,
}
/*
export const OldCategories:Array<ICat> = [
    {
      id: "0",
      name:"Uncategorized",
      magnetsIds: [0,1],
      icon:""
    },
    {
      id: "1",
      name:"Programming",
      magnetsIds: [2],
      icon:""
    },
    {
      id: "2",
      name:"To do",
      magnetsIds: [3,4,5],
      icon:""
    },
    {
      id: "3",
      name:"Shopping list",
      magnetsIds: [6,7],
      icon:""
    },
    {
      id: "4",
      name:"Workouts",
      magnetsIds: [8,9,10],
      icon: ""
    },
  ]*/