"use strict";

// Import necessary modules
const React = require("react");
const ReactDOM = require("react-dom");
const moment = require("moment-timezone"); // Import moment-timezone library

// TimerChar Component
const TimerChar = (props) => {
    const ref = React.useRef(null);
    const colon = props.char === ":";
    
    if (colon) {
        return (
            <h1 className="timer-char colon">:</h1>
        );
    }
    
    const number = parseInt(props.char);
    
    const getCharSlider = () => {
        let options = [];
        for (let i = 0; i <= 9; i++) {
            const classes = classNames("timer-char-slider-option", {
                active: number === i
            });
            options.push(<span key={i} className={classes}>{i}</span>);
        }
        
        const height = ref.current ? ref.current.offsetHeight : 0;
        const top = `${number * height * -1}px`;
        
        return (
            <div className="timer-char-slider" style={{ top }}>
                {options}
            </div>
        );
    };
    
    return (
        <div ref={ref} className="timer-char number">
            {getCharSlider()}
        </div>
    );
};

// Timer Component
const Timer = () => {
    const [date, setDateTo] = React.useState(moment.tz("Asia/Kolkata")); // Set initial time to IST

    React.useEffect(() => {
        const interval = setInterval(() => {
            const istTime = moment.tz("Asia/Kolkata");
            
            if (istTime.seconds() !== date.seconds()) {
                setDateTo(istTime);
            }
        }, 1000); // Update every second
        
        return () => {
            clearInterval(interval);
        };
    }, [date]);

    const formatSegment = (segment) => {
        return segment < 10 ? `0${segment}` : segment;
    };

    const getHours = (hours) => {
        return hours % 12 === 0 ? 12 : hours % 12;
    };

    const getTime = () => {
        const hours = getHours(date.hours());
        const minutes = date.minutes();
        const seconds = date.seconds();
        
        return `${formatSegment(hours)}:${formatSegment(minutes)}:${formatSegment(seconds)}`;
    };

    const getChars = () => {
        return getTime().split("").map((char, index) => (
            <TimerChar key={index} char={char} />
        ));
    };

    return (
        <div id="timer">
            <div id="timer-text">{getChars()}</div>
        </div>
    );
};

// App Component
const App = () => {
    return (
        <div id="app">
            <Timer />
            <a id="youtube-link" href="" target="_blank">
                <i className="fa-brands fa-youtube" />
                <h1 />
            </a>
        </div>
    );
};

// Render the App component
ReactDOM.render(<App />, document.getElementById("root"));
