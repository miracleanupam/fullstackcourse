import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return <p>{props.course}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.detail.name} {props.detail.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part detail={props.parts[0]} />
      <Part detail={props.parts[1]} />
      <Part detail={props.parts[2]} />
    </div>
  );
};

const Total = (props) => {
  return (
    <p>
      Number of exercises:{" "}
      {props.parts[0].exercises +
        props.parts[1].exercises +
        props.parts[2].exercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack Application Development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ]
  };


  // Instead of passing the entile course object which will make
  // the logic in smaller component messy
  // I am just passing the required values from course object
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
