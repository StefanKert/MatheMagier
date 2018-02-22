import * as React from 'react';

export interface TimerProps {
    start: Date;
}

interface TimerState {
    elapsed: number;
}

export class Timer extends React.Component<TimerProps, TimerState> {
    private timer: number;
    constructor(props: TimerProps) {
        super(props);
        this.state = { elapsed: 0 };
    }

    tick = () => {
        this.setState((prevState: TimerState) => ({ elapsed: new Date().valueOf() - this.props.start.valueOf() }));
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick, 50);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        var seconds = (elapsed / 10).toFixed(1);
        return (
            <div className="col-2">
                <h4>{seconds}</h4>
            </div>
        );
    }
}