import { PayloadAction, createSlice} from "@reduxjs/toolkit";

export type BoardType = {
    name: string;
    user: string;
    tasks: string[];
    updatedAt: string;
    createdAt: string;
    _id: string;
}
export type UserType = {
    accessToken: string;
    expireIn: number;
    _id: string;
    username: string;
    email: string;
    password: string;
    Board: BoardType[];
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
        Board: [{
            name: "",
            user: "",
            tasks: [],
            updatedAt: "",
            createdAt: "",
            _id: "",
        }],
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
            },
            updateUser: (state, action: PayloadAction<UserType>) => {
                state._id = action.payload._id;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.password = action.payload.password;
                state.Board = action.payload.Board;
            
            }
        },
    });

export const {setUser, getUser, updateUser} = userSlice.actions
export default userSlice.reducer
export const selectUser = (state: any) => state.user