import { ICat } from './categories';

export interface IMagnet
{
    id: number,
    title: string,
    content: Array<{}>,
    isPinned: boolean,
    createdAt: string,
    modifiedAt: string,
    icon: string,
    category:number|ICat
}
/*
export const OldMagnets: Array<IMagnet> = [
    {
        id:0,
        title: "Listas de canciones",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:1,
        title: "Fechas de cumpleaños",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:2,
        title: "Best frameworks",
        content: [],
        isPinned: false,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:3,
        title: "Home",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:4,
        title: "Body",
        content: [],
        isPinned: false,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:5,
        title: "Work",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:6,
        title: "Home",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:7,
        title: "Cat",
        content: [],
        isPinned: false,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:8,
        title: "Upper Chest",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:9,
        title: "Abs",
        content: [],
        isPinned: true,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    },
    {
        id:10,
        title: "Legs",
        content: [],
        isPinned: false,
        createdAt: "25-04-2020",
        modifiedAt: "26-04-2020",
        icon: ""
    }
];*/