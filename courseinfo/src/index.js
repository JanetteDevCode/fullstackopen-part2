import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const rows = () => {
    return parts.map((part) => {
      return (
        <Part key={part.id} part={part} />
      );
    });
  };
  return (
    <div>
      {rows()}
    </div>
  );
};

const Total = ({ exercises }) => {
  const sumOfExercises = () => {
    return exercises.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    });
  };
  return (
    <h2>
      total of {sumOfExercises()} exercises
    </h2>
  );
};

const Course = ({ course }) => {
  const exercises = () => {
    return course.parts.map((part) => {
      return part.exercises
    });
  };
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exercises()} />
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  };
  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));