import React, { useState } from "react";
import ReactDOM from "react-dom";

const ReviewButton = ({ name, clickHandler }) => (
  <button onClick={clickHandler}>{name}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const score_for = {
    good: 1,
    neutral: 0,
    bad: -1,
  };

  const total = good + bad + neutral;

  const getAverage = () => {
    if (total === 0) {
      return 0;
    } else {
      // Since the score for neutral is 0, Its calculation can be omitted
      return (good * score_for.good + bad * score_for.bad) / total;
    }
  };

  const getPositive = () => {
    if (total === 0) {
      return 0;
    } else {
      return good / total;
    }
  };

  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>Average: {getAverage()}</p>
      <p>Positive: {getPositive()} %</p>
    </div>
  );
};

const App = () => {
  // State for the three buttons
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <p>Give Feedback</p>
      <ReviewButton name="Good" clickHandler={() => setGood(good + 1)} />
      <ReviewButton
        name="Neutral"
        clickHandler={() => setNeutral(neutral + 1)}
      />
      <ReviewButton name="Bad" clickHandler={() => setBad(bad + 1)} />

      <p>Statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
