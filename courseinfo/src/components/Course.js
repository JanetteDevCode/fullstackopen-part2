import React from 'react';

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
      return accumulator + currentValue;
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
      return part.exercises;
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

export default Course;