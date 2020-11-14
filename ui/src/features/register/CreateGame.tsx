import React, { FC, useState } from 'react';
import { pokemon } from './pokemon';
import { adjectives } from './adjectives';
import Style from './Register.module.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../app/modalSlice';

const generateSlug = () => {
    const first = adjectives[Math.floor(Math.random() * adjectives.length)];
    const second = adjectives[Math.floor(Math.random() * adjectives.length)];
    const third = pokemon[Math.floor(Math.random() * pokemon.length)];

    return `${first}-${second}-${third}`;
};

export const CreateGame: FC<{}> = () => {
    const dispatch = useDispatch();
    const [slug, setSlug] = useState('');

    const submit = () => {
        window.location.href = `/${slug}`;
    };

    return (
        <div className={`centeredContainer ${Style.createRoomContainer}`}>
            <div className={Style.itemContainer}>
                <h1 className="title">Create Room</h1>
            </div>
            <div className={Style.slugContainer}>
                {slug}
            </div>
            <div className={Style.itemContainer}>
                <button className="button is-info"
                        onClick={() => setSlug(generateSlug())}>
                    New
                </button>
                <button className="button is-primary"
                        onClick={submit}>
                    Create
                </button>
            </div>
        </div>
    );
}
