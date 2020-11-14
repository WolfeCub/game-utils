import { configureStore, ThunkAction, Action, current } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import currentRoomSlice from './currentRoomSlice';
import modalSlice from './modalSlice';

export const store = configureStore({
    reducer: {
        currentRoom: currentRoomSlice,
        modal: modalSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
