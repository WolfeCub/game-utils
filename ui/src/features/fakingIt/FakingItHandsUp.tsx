import React, {FC, useContext } from 'react';
import Style from './FakingIt.module.scss';
import { useSelector } from '../../app/store';
import { Connection } from '../../App';
import { useForm } from 'react-hook-form';

export const FakingItHandsUp: FC<{}> = () => {
    const { members, currentSelection } = useSelector(o => o.currentRoom.state);

    const connection = useContext(Connection);

    const selections = currentSelection;

    const createSubmit = (value: string) => async () => await connection.send('MakeSelection', value);

    const findColor = (value: string) => value === "Up" ? "blue" : "red";

    return (
        <>
            <div className="centeredContainer" style={{width: '65%'}}>
                <div className={Style.selectionBoxesContainer}>
                    {members.map(player => {
                        const value = selections[player.name];
                        return (
                            <div key={player.name} className={Style.selectionBox}>
                                <div className={Style.selectionName}>{player.name}</div>
                                {value &&
                                 <span className={Style.selectionTag} style={{background: findColor(value)}}>
                                     {value}
                                 </span>}
                            </div>
                    )})}
                </div>
                <div className={Style.inputForm}>
                    <button className="button is-info" onClick={createSubmit("Up")}>
                        Up
                    </button>
                    <button className="button is-danger" onClick={createSubmit("Down")}>
                        Down
                    </button>
                </div>
            </div>
        </>
    );
}
