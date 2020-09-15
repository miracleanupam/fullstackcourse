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
      <Part name={props.part1.name} numExercises={props.part1.exercises} />
      <Part name={props.part2.name} numExercises={props.part2.exercises} />
      <Part name={props.part3.name} numExercises={props.part3.exercises} />
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

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  };

  const part2 = {
    name: "Using props to pass data",
    exercises: 7
  };

  const part3 = {
    name: "State of a component",
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
