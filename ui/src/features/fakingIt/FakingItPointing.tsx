import React, {FC, useContext, useMemo} from 'react';
import Style from './FakingIt.module.scss';
import { useSelector } from '../../app/store';
import { Connection } from '../../App';

export const FakingItPointing: FC<{}> = () => {
    const { members, currentSelection } = useSelector(o => o.currentRoom.state);

    const connection = useContext(Connection);

    const selections = useMemo(() => {
        return Object.entries(currentSelection)
                     .reduce((acc, [k, v]) => {
                         acc[v] ? acc[v].push(k) : acc[v] = [k];
                         return acc
                     }, {} as Record<string, string[]>)
    },[currentSelection]);

    return (
        <div className={`centeredContainer ${Style.selectionBoxesContainer}`}>
            {members.map(player => (
                <div key={player.name} className={Style.selectionBox}
                     onClick={async () => await connection.send('MakeSelection', player.name)}
                >
                    <div className={Style.selectionName}>{player.name}</div>
                    <div className={Style.tagContainer}>
                        {selections[player.name] && selections[player.name].map((selection) => {
                            const color = members.find((p) => p.name === selection)?.color;
                            return (
                                <span key={selection} className={Style.selectionTag}
                                     style={{background: color}}
                                >{selection}</span>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
