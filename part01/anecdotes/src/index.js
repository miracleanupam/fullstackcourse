import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ name, clickHandler }) => {
  return <button onClick={clickHandler}>{name}</button>;
};

const Anecdote = ({ text, vote }) => {
  return (
    <div>
      <p>{text}</p>
      <p>It has {vote} votes</p>
    </div>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  // Set votes to array of 0s
  // map function on anecdote will return an array of 0s of anecdotes's length
  const [votes, setVotes] = useState(anecdotes.map((el) => 0));
  const [mostVoted, setMostVoted] = useState(0);

  const getRandomNumber = () => {
    const maxLimit = anecdotes.length;
    return Math.floor(Math.random() * maxLimit);
  };

  const getNextAnecdote = () => {
    let newAnecdoteIndex = getRandomNumber();

    // Check if the random index is already the selected one
    // If so get a different index
    while (newAnecdoteIndex === selected) {
      newAnecdoteIndex = getRandomNumber();
    }

    setSelected(newAnecdoteIndex);
  };

  const handleVote = () => {
    const copyOfVotes = [...votes];
    copyOfVotes[selected] += 1;

    if (mostVoted !== selected) {
      if (copyOfVotes[selected] > copyOfVotes[mostVoted]) {
        setMostVoted(selected);
      }
    }
    setVotes(copyOfVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} vote={votes[selected]} />

      <Button name="Vote" clickHandler={handleVote} />
      <Button name="Next Anecdote" clickHandler={getNextAnecdote} />

      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} vote={votes[mostVoted]} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
