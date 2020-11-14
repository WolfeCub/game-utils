import React, { Context, FC, useEffect, useState } from 'react';
import { Register } from './features/register/Register';
import { LogLevel, HubConnectionBuilder, HubConnection } from '@microsoft/signalr';
import { useSelector } from './app/store';
import { FakingItRoot } from './features/fakingIt/FakingItRoot';
import { useDispatch } from 'react-redux';
import { setGameState } from './app/currentRoomSlice';
import { useParams } from 'react-router-dom';
import { AppRouteParams } from './Router';

const signalrEndpoint = 'https://localhost:5001/hub/fakingIt';

const connection = new HubConnectionBuilder()
    .withUrl(signalrEndpoint)
    .configureLogging(LogLevel.Information)
    .build();

export const Connection = React.createContext(connection);

const App: FC<{}> = () => {
    const dispatch = useDispatch();

    const [conn, setConn] = useState<HubConnection | null>(null);

    const [showTaken, setShowTaken] = useState(false);

    const userName = useSelector(o => o.currentRoom.userName);

    useEffect(() => {
        (async () => {
            await connection.start();

            connection.on('UpdateState', (content) => dispatch(setGameState(content)));
            connection.on('UsernameTaken', () => {
                setShowTaken(true);
                setTimeout(() => setShowTaken(false), 3000);
            });

            setConn(connection);
        })()
    }, []);

    if (conn === null) return null;

    return (
        <Connection.Provider value={conn}>
            {userName === ''
            ? <Register nameTaken={showTaken} />
            : <FakingItRoot />
            }

        </Connection.Provider>
    );
}

export default App;
