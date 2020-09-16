import React from "react";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <ul>
        {parts.map((part) => (
          <li key={part.id}>
            <Part name={part.name} exercises={part.exercises} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// array.reduce takes first two elements of array and applies
// the function, result is kept in 'sum' when initial value for
// sum is not provided. I have provided the initial value as 0
// Now reduce will take each element of the array one at a time
// and apply the function and update 'sum' with result
const Total = ({ parts }) => {
  return (
    <h4>
      Total of{" "}
      {parts.reduce((sum, part) => {
        return sum + part.exercises;
      }, 0)}{" "}
      exercises
    </h4>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
