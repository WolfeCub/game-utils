import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentRoomState {
    userName: string;
    state: ServerState;
}

export enum FakingItMode {
    Pointing = "Pointing",
    Numbers = "Numbers",
    HandsUp = "Hands Up",
    Faces = "Faces"
}

interface ServerState {
    roomId: string;
    roomMode: FakingItMode;
    members: Player[];
    currentSelection: Record<string, string>;
}

interface Player {
    name: string;
    color: string;
}

const initialState: CurrentRoomState = {
    userName: '',
    state: {
        roomId: '',
        roomMode: FakingItMode.Pointing,
        members: [],
        currentSelection: {}
    }
};

export const currentRoomSlice = createSlice({
    name: 'currentRoom',
    initialState,
    reducers: {
        setRoomJoined: (state, action: PayloadAction<{userName: string; roomId: string}>) => {
            state.userName = action.payload.userName;
        },
        setGameState: (state, action: PayloadAction<ServerState>) => {
            state.state = action.payload;
        },
    },
});


export const { setRoomJoined, setGameState } = currentRoomSlice.actions;

export default currentRoomSlice.reducer;
