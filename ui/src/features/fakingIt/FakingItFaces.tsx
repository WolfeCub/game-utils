import React, {FC, useContext } from 'react';
import Style from './FakingIt.module.scss';
import { useSelector } from '../../app/store';
import { Connection } from '../../App';
import { useForm } from 'react-hook-form';

interface Form {
    face: string;
}

export const FakingItFaces: FC<{}> = () => {
    const { members, currentSelection } = useSelector(o => o.currentRoom.state);

    const connection = useContext(Connection);

    const selections = currentSelection;

    const { handleSubmit, register, errors } = useForm();

    const submit = async ({face}: Form) => {
        await connection.send('MakeSelection', face);
    }

    return (
        <>
            <div className="centeredContainer" style={{width: '65%'}}>
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
                <form className={Style.inputForm} onSubmit={handleSubmit(submit)}>
                    <input type="text" name="face" className={`input ${Style.inputBox}`}
                           ref={register({
                               required: "Required",
                               pattern: {
                                   value: /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/i,
                                   message: "Must be a single emoji"
                               }
                           })}
                    />
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </form>
                { errors.face &&
                  <div className={Style.errorWrapper}>
                      <div className={Style.errorText}>
                          {errors.face.message}
                      </div>
                  </div>
                }
            </div>
        </>
    );
}
