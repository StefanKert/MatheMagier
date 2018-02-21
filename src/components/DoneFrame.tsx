import * as React from "react";
import * as _ from "lodash";

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
