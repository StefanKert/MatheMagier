import * as React from 'react';

export interface ButtonProps {
    answerIsCorrect: boolean | null;
    selectedNumbers: number[];
    redraws: number;
    redraw(): void;
    acceptAnswer(): void;
    checkAnswer(): void;
}

export const Button = (props: ButtonProps) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button onClick={props.acceptAnswer} className="btn btn-success"><i className="fa fa-check"/></button>;
            break;
        case false:
            button = <button className="btn btn-danger"><i className="fa fa-times"/></button>;
            break;
        default:
            button = <button className="btn" onClick={props.checkAnswer} disabled={props.selectedNumbers.length === 0}>=</button>;
    }

    return (
        <div className="col-2 text-center">
            {button}
            <br /><br />
            <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redraws === 0}>
                <i className="fa fa-sync"/> {props.redraws}
            </button>
        </div>
    );
};
