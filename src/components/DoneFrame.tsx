import * as React from 'react';

export interface DoneFrameProps {
    doneStatus: string;
    resetGame(): void;
}

export const DoneFrame = (props: DoneFrameProps) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-secondary" onClick={props.resetGame}>Play again</button>
        </div>
    );
};
