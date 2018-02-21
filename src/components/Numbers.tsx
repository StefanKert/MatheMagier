import * as React from "react";
import * as _ from "lodash";

export interface NumbersProps {
    usedNumbers: number[]; 
    selectedNumbers: number[];
    selectNumber(number: number): void;
}

export const Numbers = (props: NumbersProps) => {
    const numberClassName = (number: number) => {
        if (props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
    }

    return (
        <div className="card text-center">
            <div>
                {_.range(1, 10).map((number: number, i: number) => <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>{number}</span>)}
            </div>
        </div>
    );
}
