import * as React from "react";
import * as _ from "lodash";

export interface AnswerProps {
    selectedNumbers: number[];
    unselectNumber(number: number): void;
}

export const Answer = (props: AnswerProps) => {
    return (
        <div className="col-5">
            {props.selectedNumbers.map((number, i) => <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>)}
        </div>
    );
}
