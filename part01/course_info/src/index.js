import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <p>{props.course}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.numExercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.part1} numExercises={props.exercises1} />
      <Part name={props.part2} numExercises={props.exercises2} />
      <Part name={props.part3} numExercises={props.exercises3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises: {props.total}</p>
  );
};

const App = () => {
  const course = "Half Stack Application Development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
