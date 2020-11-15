import React, {FC, useContext } from 'react';
import Style from './FakingIt.module.scss';
import { useSelector } from '../../app/store';
import { Connection } from '../../App';
import { useForm } from 'react-hook-form';

interface Form {
    face: string;
}

const emojis = ['🙂', '😳', '😓', '🤣', '😍', '😭', '😮', '😡', '😐', '🤮', '😱'];

export const FakingItFaces: FC<{}> = () => {
    const { members, currentSelection } = useSelector(o => o.currentRoom.state);

    const connection = useContext(Connection);

    const selections = currentSelection;

    const submit = async (face: string | undefined) => {
        await connection.send('MakeSelection', face);
    }

    return (
        <>
            <div className='centeredContainer' style={{width: '65%'}}>
                <div className={Style.selectionBoxesContainer}>
                    {members.map(player => (
                        <div key={player.name} className={Style.selectionBox}>
                            <div className={Style.selectionName}>{player.name}</div>
                            <div style={{fontSize: '130%'}}>
                                {selections[player.name]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='bottomCentered'>
                {emojis.map(o => (
                    <span className='noSelect'
                          style={{fontSize: '200%'}}
                          onClick={() => submit(o)}>
                        {o}
                    </span>
                ))}
            </div>
        </>
    );
}
