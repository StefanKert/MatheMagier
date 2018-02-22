import * as React from 'react';

export interface AnswerProps {
    selectedNumbers: number[];
    unselectNumber(num: number): void;
}

export const Answer = (props: AnswerProps) => {
    return (
        <div className="col-3">
            {props.selectedNumbers.map((num, i) =>
                <span key={i} onClick={() => props.unselectNumber(num)}>{num}</span>
            )}
        </div>
    );
};
