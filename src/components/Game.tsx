import * as React from "react";
import * as _ from "lodash";

import { Stars } from "./Stars";
import { Button } from "./Button";
import { Numbers } from "./Numbers";
import { DoneFrame } from "./DoneFrame";
import { Answer } from "./Answer";
import { inherits } from "util";

export interface GameProps {
    selectedNumbers: number[];
    usedNumbers: number[];
    answerIsCorrect: boolean;
    randomNumberOfStars: number;
    redraws: number;
    doneStatus: string;
}

export class Game extends React.Component<any, GameProps> {
    static randomNumber = () => 1 + Math.floor((Math.random() * 9))
    static initialState(): GameProps {
        return {
            selectedNumbers: [],
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: null
        };
    }

    constructor(props: any) {
        super(props);
        this.state = Game.initialState();
    }

    possibleCombinationSum(arr: number[], n: number): boolean {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        var listSize = arr.length, combinationsCount = (1 << listSize)
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }

    resetGame() {
        this.setState(Game.initialState());
    }

    selectNumber(clickedNumber: number) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }

        this.setState((prevState: GameProps) => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    }

    unselectNumber(clickedNumber: number) {
        this.setState((prevState: GameProps) => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    }

    checkAnswer() {
        this.setState((prevState: GameProps) => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    }

    acceptAnswer() {
        this.setState((prevState: GameProps) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus);
    }

    redraw() {
        if (this.state.redraws === 0) {
            return;
        }

        this.setState((prevState: GameProps) => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    }

    possibleSolutions(state: GameProps) {
        const possibleNumbers = _.range(1, 10).filter(number => state.usedNumbers.indexOf(number) === -1);
        return this.possibleCombinationSum(possibleNumbers, state.randomNumberOfStars);
    }

    updateDoneStatus() {
        this.setState((prevState: GameProps) => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' }
            }
        })
    }

    render() {
        const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus } = this.state;

        return (
            <div className="container col-4">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers} redraws={redraws} redraw={this.redraw.bind(this)} acceptAnswer={this.acceptAnswer.bind(this)} checkAnswer={this.checkAnswer.bind(this)} answerIsCorrect={answerIsCorrect} />
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber.bind(this)} />
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame.bind(this)} doneStatus={doneStatus} /> :
                    <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} selectNumber={this.selectNumber.bind(this)} />
                }
            </div>
        )
    }
}