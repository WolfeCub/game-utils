import { configureStore, ThunkAction, Action, current } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import counterReducer from '../features/counter/counterSlice';
import currentRoomSlice from './currentRoomSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        currentRoom: currentRoomSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> =
    ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
