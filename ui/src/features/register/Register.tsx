import React, { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Connection } from '../../App';
import { AppRouteParams } from '../../Router';
import Style from './Register.module.scss';
import { CreateGame } from './CreateGame';

interface FormValues {
    userName: string,
}

export const Register: FC<{}> = () => {
    const connection = useContext(Connection);
    const { handleSubmit, register, errors } = useForm();
    const { roomId } = useParams<AppRouteParams>();

    const submit = async (form: FormValues) => {
        await connection.send('Join', form.userName, roomId);
    }

    if (!roomId) {
        return <CreateGame />;
    }

    return (
        <>
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
