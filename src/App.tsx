import "./App.css";
import React, { useEffect } from "react";

const getUsers = () =>
  new Promise((resolve) => setTimeout(() => resolve(), 1000));

export default function App() {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  /** 
   * React 18에서 도입된 Automatic Batching은 여러 상태 업데이트를 자동으로 하나의 렌더링 작업으로 결합하여 효율성을 높이는 기능
   * Automatic batching이 활성화되면, useEffect에서 count1과 count2가 동시에 업데이트
   **/
  useEffect(() => {
    console.log("count1", count1);
    console.log("count2", count2);
  }, [count1, count2]);

  /**
   * React 18 이전 버전에서는 이벤트 핸들러 내부의 상태 업데이트만 배치 처리가 됨
   * React 18부터는 비동기 작업 내의 상태 업데이트도 자동으로 배치
   * -> 불필요한 재렌더링을 줄이고 성능을 향상시킬 수 있음
   */ 
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
