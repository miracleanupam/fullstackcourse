import React, { useState } from "react";
import ReactDOM from "react-dom";

// I had extracted the button component from the beginning
const ReviewButton = ({ name, clickHandler }) => (
  <button onClick={clickHandler}>{name}</button>
);

const Stat = ({ name, value }) => (
  <p>
    {name}: {value}
  </p>
);

// I creatd the Statistics component separately form the beginning
const Statistics = ({ good, neutral, bad }) => {
  const score_for = {
    good: 1,
    neutral: 0,
    bad: -1,
  };

  const total = good + bad + neutral;

  const getAverage = () => {
    // We can omit the check for divisible by 0
    // As when no feedback is given, the code will never reach here
    // Since the score for neutral is 0, Its calculation can be omitted
    return (good * score_for.good + bad * score_for.bad) / total;
  };

  const getPositive = () => {
    return good / total;
  };

  if (total === 0) {
    return <p>No feedbacks yet!!</p>;
  }

  return (
    <div>
      <Stat name="Good" value={good} />
      <Stat name="Neutral" value={neutral} />
      <Stat name="Bad" value={bad} />
      <Stat name="Average" value={getAverage()} />
      <Stat name="Positive" value={getPositive()} />
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
