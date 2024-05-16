import { memo, useEffect, useState } from "react";

const targetURL =
    "https://raw.githubusercontent.com/jason-chao/wordle-solver/main/english_words_original_wordle.txt";

const Word = ({ name, highlight = "" }) => {
  const letters = name.split("");
  return (
    <li>
      {letters.map((l, i) => (
        <span className={highlight.includes(l) ? "h" : ""} key={i}>
          {l}
        </span>
      ))}
    </li>
  );
}

// 모든 글자가 highlight에 포함되어 있는지 확인
// 모두 포함되어 있다면, 이전 props와 다음 props는 같은 것으로 간주
// 만약 이전 props와 다음 props가 같다면, 렌더링을 하지 않음
const wordMemoFunc = (prev, next) => {
  return prev.name.split("").every(l => {
    return next.highlight.includes(l) === prev.highlight.includes(l);
  });
}

/** 
 * memo?
 * 용법: memo(Component, areEqual)
 * 설명: React.memo는 컴포넌트를 렌더링하는 동안 props가 변경되지 않으면 이전 결과를 재사용합니다.
 * 
 * areEqual: (prevProps, nextProps) => boolean
 * areEqual이 true이면 이전 결과를 재사용합니다.(렌더링을 하지 않음)
 * 
 * 장점: 렌더링 성능을 최적화할 수 있습니다.
 * 유용한 경우: 렌더링이 자주 발생하거나, 렌더링 비용이 큰 컴포넌트
*/
const MemorizedWord = memo(Word, wordMemoFunc);


const Words = ({list, filter}) => {
  return (
    <ul>
      {list.map((name) => (
        <MemorizedWord key={name} name={name} highlight={filter}/>
      ))}
    </ul>
  );
};

function FilterWords() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(targetURL)
      .then((r) => r.text())
      .then((r) => setList(r.split("\n").sort()));
  }, []);
  const [filter, setFilter] = useState("");

  const handleChange = ({target: {value}}) => {
    setFilter(value);
  };
  return (
    <main>
      <label>
        Filter:
        <input type="search" value={filter} onChange={handleChange}/>
      </label>
      <Words list={list} filter={filter}/>
    </main>
  );
}

function App() {
  return <FilterWords/>;
}

export default App;