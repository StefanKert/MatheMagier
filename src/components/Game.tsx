import * as React from 'react';
import * as _ from 'lodash';

import { Stars } from './Stars';
import { Button } from './Button';
import { Numbers } from './Numbers';
import { DoneFrame } from './DoneFrame';
import { Answer } from './Answer';
import { Timer } from './Timer';
import { StartTimerButton } from './StartTimerButtonProps';

export interface GameState {
    selectedNumbers: number[];
    usedNumbers: number[];
    answerIsCorrect: boolean | null;
    randomNumberOfStars: number;
    redraws: number;
    doneStatus: string;
    timerStarted: boolean;
}

export class Game extends React.Component<{}, GameState> {
    static randomNumber = () => 1 + Math.floor((Math.random() * 9));
    static initialState(): GameState {
        return {
            selectedNumbers: [],
            randomNumberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            usedNumbers: [],
            redraws: 5,
            doneStatus: '',
            timerStarted: false
        };
    }

    constructor(props: {}) {
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
        var listSize = arr.length, combinationsCount = (1 << listSize);
        for (var i = 1; i < combinationsCount; i++) {
            var combinationSum = 0;
            for (var j = 0; j < listSize; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    }

    resetGame = () => {
        this.setState(Game.initialState());
    }

    selectNumber = (clickedNumber: number) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }

        this.setState((prevState: GameState) => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
        }));
    }

    unselectNumber = (clickedNumber: number) => {
        this.setState((prevState: GameState) => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(num => num !== clickedNumber)
        }));
    }

    checkAnswer = () => {
        this.setState((prevState: GameState) => ({
            answerIsCorrect: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    }

    acceptAnswer = () => {
        this.setState((prevState: GameState) => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
        }), this.updateDoneStatus);
    }

    redraw = () => {
        if (this.state.redraws === 0) {
            return;
        }

        this.setState((prevState: GameState) => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber(),
            redraws: (prevState.redraws - 1)
        }), this.updateDoneStatus);
    }

    possibleSolutions(state: GameState) {
        const possibleNumbers = _.range(1, 10).filter(num => state.usedNumbers.indexOf(num) === -1);
        return this.possibleCombinationSum(possibleNumbers, state.randomNumberOfStars);
    }

    updateDoneStatus() {
        this.setState((prevState: GameState) => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Done. nice!' };
            }
            if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game Over!' };
            }

            return { doneStatus: '' };
        });
    }

    startTimer = () => {
        this.setState((prevState: GameState) => ({
            timerStarted: true
        }));
    }

    render() {
        const { selectedNumbers, randomNumberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus, timerStarted } = this.state;

        return (
            <div className="container col-sm-10 col-md-8 col-lg-6">
                <h3>Mathe-Magier</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers} redraws={redraws} redraw={this.redraw} acceptAnswer={this.acceptAnswer} checkAnswer={this.checkAnswer} answerIsCorrect={answerIsCorrect} />
                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber} />
                    {timerStarted ?
                        <Timer start={new Date()} /> :
                        <StartTimerButton startTimer={this.startTimer} />
                    }
                </div>
                <br />
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} /> :
                    <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers} selectNumber={this.selectNumber} />
                }
            </div>
        );
    }
}