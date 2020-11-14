import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Connection } from '../../App';
import { setRoomJoined } from '../../app/currentRoomSlice';
import { AppRouteParams } from '../../Router';
import Style from './Register.module.scss';

interface Props {
    nameTaken: boolean;
}

interface FormValues {
    userName: string,
}

export const Register: FC<Props> = ({nameTaken}) => {
    const dispatch = useDispatch();
    const connection = useContext(Connection);
    const { handleSubmit, register, errors } = useForm();
    const { roomId } = useParams<AppRouteParams>();

    const submit = async (form: FormValues) => {
        await connection.send('Join', form.userName, roomId);
        dispatch(setRoomJoined({userName: form.userName, roomId: roomId}));
    }

    return (
        <>
            {nameTaken && <NameTakenNotification />}
            <div className="centeredContainer">
                <h1 className="title">Join</h1>

                <form onSubmit={handleSubmit(submit)}>
                    <div className="field">
                        <div className="control">
                            <input className="input" type="text"
                                   placeholder="Enter a name"
                                   name="userName"
                                   ref={register({
                                       required: "Required",
                                       pattern: {
                                           value: /^[^ ]+$/i,
                                           message: "No spaces allowed"
                                       }
                                   })}
                            />
                        </div>
                    </div>
                    { errors.userName &&
                      <div className={Style.errorText}>
                          {errors.userName.message}
                      </div>
                    }
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" type="submit"
                            >Join</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

const NameTakenNotification: FC<{}> = () => {
    return <div className="notification is-danger"
                style={{position: 'absolute', top: '10px', right: '10px'}}>
        Username is already taken!
    </div>;
}
