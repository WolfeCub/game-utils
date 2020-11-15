import React, { Context, FC, useEffect, useState } from 'react';
import { Register } from './features/register/Register';
import { LogLevel, HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useSelector } from './app/store';
import { FakingItRoot } from './features/fakingIt/FakingItRoot';
import { useDispatch } from 'react-redux';
import { setGameState } from './app/currentRoomSlice';
import { openModal } from './app/modalSlice';

const signalrEndpoint = `${process.env.REACT_APP_SERVER_URL}/hub/fakingIt`;

const connection = new HubConnectionBuilder()
    .withUrl(signalrEndpoint)
    .configureLogging(LogLevel.Information)
    .build();

export const Connection = React.createContext(connection);

const App: FC<{}> = () => {
    const dispatch = useDispatch();

    const [conn, setConn] = useState<HubConnection | null>(null);

    const roomId = useSelector(o => o.currentRoom.state.roomId);

    useEffect(() => {
        (async () => {
            await connection.start();

            connection.on('UpdateState', (content) => dispatch(setGameState(content)));
            connection.on('UsernameTaken', () => {
                dispatch(openModal('Username is already taken!', 'is-danger'));
            });

            setConn(connection);
        })()
    }, []);

    if (conn === null) return null;

    return (
        <>
            <Modal />
            <Connection.Provider value={conn}>
                {roomId === ''
                ? <Register />
                : <FakingItRoot />
                }

            </Connection.Provider>
        </>
    );
}

const Modal: FC<{}> = () => {
    const modal = useSelector(o => o.modal);

    console.log(modal);
    if (!modal.show) return null;

    return (
        <div className={`notification ${modal.mode}`}
             style={{position: 'absolute', top: '10px', right: '10px', zIndex: 100}}>
            {modal.text}
        </div>
    );
}

export default App;
