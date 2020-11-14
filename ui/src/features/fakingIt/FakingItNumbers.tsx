import React, {FC, useContext } from 'react';
import Style from './FakingIt.module.scss';
import { useSelector } from '../../app/store';
import { Connection } from '../../App';
import { useForm } from 'react-hook-form';

export const FakingItNumbers: FC<{}> = () => {
    const { members, currentSelection } = useSelector(o => o.currentRoom.state);

    const connection = useContext(Connection);

    const selections = currentSelection;

    const { handleSubmit, register, errors } = useForm();

    const submit = async ({number: num}: { number: string }) => {
        await connection.send('MakeSelection', num);
    }

    const findColor = (name: string) => members.find((p) => p.name === name)?.color;

    return (
        <>
            <div className="centeredContainer" style={{width: '65%'}}>
                <div className={Style.selectionBoxesContainer}>
                    {members.map(player => (
                        <div key={player.name} className={Style.selectionBox}>
                            <div className={Style.selectionName}>{player.name}</div>
                            {selections[player.name] &&
                             <span className={Style.selectionTag} style={{background: findColor(player.name)}}>
                                 {selections[player.name]}
                             </span>
                            }
                        </div>
                    ))}
                </div>
                <form className={Style.inputForm} onSubmit={handleSubmit(submit)}>
                    <input type="number" name="number" className={`input ${Style.inputBox}`}
                           ref={register({required: "Required"})}
                    />
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
}
