import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentRoomState {
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
        setGameState: (state, action: PayloadAction<ServerState>) => {
            state.state = action.payload;
        },
    },
});


export const { setGameState } = currentRoomSlice.actions;

export default currentRoomSlice.reducer;
