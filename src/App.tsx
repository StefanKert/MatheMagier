import * as React from 'react';

import { Game } from './components/Game';

import './App.css';

export class App extends React.Component {
    render() {
        return (
            <div>
                <Game />
            </div>
        );
    }
}