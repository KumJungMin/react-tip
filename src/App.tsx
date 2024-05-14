import "./App.css";
import React, { useEffect } from "react";

const getUsers = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 1000));

export default function App() {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  useEffect(() => {
    console.log("count1", count1);
    console.log("count2", count2);
  }, [count1, count2]);

  const onClick = async () => {
    await getUsers();
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  };

  return (
    <div className="App">
      <h1>Counter</h1>
      <h2>Count1: {count1}</h2>
      <h2>Count2: {count2}</h2>
      <button onClick={onClick}>Click</button>
    </div>
  );
}
