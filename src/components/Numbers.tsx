import * as React from 'react';
import * as _ from 'lodash';

export interface NumbersProps {
    usedNumbers: number[]; 
    selectedNumbers: number[];
    selectNumber(num: number): void;
}

export const Numbers = (props: NumbersProps) => {
    const numberClassName = (num: number) => {
        if (props.selectedNumbers.indexOf(num) >= 0) {
            return 'selected';
        }
        if (props.usedNumbers.indexOf(num) >= 0) {
            return 'used';
        }

        return '';
    };

    return (
        <div className="card text-center">
            <div>
                {_.range(1, 10).map((num: number, i: number) => <span key={i} className={numberClassName(num)} onClick={() => props.selectNumber(num)}>{num}</span>)}
            </div>
        </div>
    );
};
