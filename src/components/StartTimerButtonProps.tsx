import * as React from 'react';

export interface StartTimerButtonProps {
    startTimer(): void;
}

export const StartTimerButton = (props: StartTimerButtonProps) => {
    return (
        <div className="col-2 text-center">
            <button className="btn btn-success" onClick={props.startTimer}>
                Start
            </button>
        </div>
    );
};
