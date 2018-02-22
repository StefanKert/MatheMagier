import * as React from 'react';
import * as _ from 'lodash';

export interface StarsProps {
    numberOfStars: number;
}

export const Stars = (props: StarsProps) => {
    return (
        <div className="col-5">
            {_.range(props.numberOfStars).map(i =>
                <i key={i} className="fa fa-star"/>
            )}
        </div>
    );
};