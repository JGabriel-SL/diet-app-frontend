import { create } from 'zustand';

export type DataUser = {
    name: string;
    weight: string;
    age: string;
    height: string;
    level: string;
    objective: string;
    gender: string;
}

type DataState = {
    user: DataUser,
    setPageOne: (data: Omit<DataUser, "gender" | "level" | "objective">) => void;
    setPageTwo: (data: Pick<DataUser, "gender" | "level" | "objective">) => void;
}

export const userDataStore = create<DataState>((set) => ({
    user: {
        name: "",
        weight: "",
        age: "",
        height: "",
        level: "",
        objective: "",
        gender: "",
    },
    setPageOne: (data) => set((state) => ({ user : {...state.user, ...data}})),
    setPageTwo: (data) => set((state) => ({ user : {...state.user, ...data}}))
}));