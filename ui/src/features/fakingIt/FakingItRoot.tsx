import React, { FC, useContext, useState } from 'react';
import { Connection } from '../../App';
import { FakingItMode } from '../../app/currentRoomSlice';
import { useSelector } from '../../app/store';
import { FakingItPointing } from './FakingItPointing';
import { FakingItNumbers } from './FakingItNumbers';
import { FakingItHandsUp } from './FakingItHandsUp';
import { FakingItFaces } from './FakingItFaces';

const tabs: Record<FakingItMode, FC> = {
    [FakingItMode.Pointing]: FakingItPointing,
    [FakingItMode.Numbers]: FakingItNumbers,
    [FakingItMode.HandsUp]: FakingItHandsUp,
    [FakingItMode.Faces]: FakingItFaces
};

export const FakingItRoot: FC<{}> = () => {
    const connection = useContext(Connection);

    const tab = useSelector(o => o.currentRoom.state.roomMode);

    const [mobileCss, setMobileCss] = useState('');
    const mobileToggle = () => setMobileCss(mobileCss === '' ? 'is-active' : '');

    const Component = tabs[tab];
    return (
        <>
            <nav className='navbar is-info' role='navigation' aria-label='main navigation'>
                <a role='button' className={`navbar-burger ${mobileCss}`}
                    onClick={mobileToggle}>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                    <span aria-hidden='true'></span>
                </a>
                <div className={`navbar-menu ${mobileCss}`}>
                    <div className='navbar-start'>
                        {Object.keys(tabs).map((val) => (
                            <a key={val} onClick={async () => await connection.send('SetMode', val)}
                               className={`navbar-item ${tab === val ? 'is-active' : ''}`}>
                                {val}
                            </a>))}
                    </div>
                </div>
            </nav>
            <Component />
        </>
    );
}
