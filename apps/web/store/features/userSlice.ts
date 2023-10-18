import { PayloadAction, createSlice} from "@reduxjs/toolkit";


export type UserType = {
    accessToken: string;
    expireIn: number;
    _id: string;
    username: string;
    email: string;
    password: string;
    Board: string[];
    createdAt: string;
    updatedAt: string;
    };

    const INITIAL_STATE: UserType = {
        accessToken: "",
        expireIn: 0,
        _id: "",
        username: "",
        email: "",
        password: "",
        Board: [],
        createdAt: "",
        updatedAt: "",
    };

    export const userSlice = createSlice({
        name: "user",
        initialState: INITIAL_STATE,
        reducers: {
            setUser: (state, action: PayloadAction<UserType>) => {
                state._id = action.payload._id;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.password = action.payload.password;
                state.Board = action.payload.Board;
                state.createdAt = action.payload.createdAt;
                state.updatedAt = action.payload.updatedAt;
                state.accessToken = action.payload.accessToken;
                state.expireIn = action.payload.expireIn;
            },
            getUser: (state) => {
                return state;
            }
        },
    });

export const {setUser, getUser} = userSlice.actions
export default userSlice.reducer
export const selectUser = (state: any) => state.user