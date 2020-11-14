import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';

interface ModalState {
    show: boolean;
    mode: string;
    text: string;
}

const initialState: ModalState = {
    show: false,
    mode: '',
    text: '',
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<ModalState>) => {
            state.text = action.payload.text;
            state.mode = action.payload.mode;
            state.show = action.payload.show;
        },
        setModalShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
    },
});

export const { setModal, setModalShow } = modalSlice.actions;

export const openModal = (text: string, mode: string): AppThunk => (dispatch) => {
    dispatch(setModal({text, mode, show: true}));
    setTimeout(() => {
        dispatch(setModalShow(false));
    }, 3000);
};

export default modalSlice.reducer;
