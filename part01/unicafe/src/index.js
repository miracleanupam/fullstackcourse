import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const ReviewButton = ({ name, clickHandler }) => <button onClick={clickHandler}>{name}</button>

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>bad: {bad}</p>
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
      <ReviewButton name="Neutral" clickHandler={() => setNeutral(neutral + 1)} />
      <ReviewButton name="Bad" clickHandler={() => setBad(bad + 1)} />

      <p>Statistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));