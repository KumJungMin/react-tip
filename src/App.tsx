import { useTransition,  memo, useEffect, useState  } from "react";
import './App.css'

const targetURL =
  "https://raw.githubusercontent.com/jason-chao/wordle-solver/main/english_words_original_wordle.txt";

function countLetters(str) {
  return str.split("").reduce((cs, l) => {
    cs[l] = (cs[l] || 0) + 1;
    return cs;
  }, {});
}
function isMatch(word, letterCounts) {
  const ws = word.split("");
  return Object.entries(letterCounts).every(
    ([l, c]) => ws.filter((w) => w == l).length >= c
  );
}

function Word({ name, highlight = "" }) {
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

const Words = memo(({ list, filter }) => {
  const counts = countLetters(filter);
  const filteredList = list.filter((name) => isMatch(name, counts));
  return (
    <ul>
      {filteredList.map((name) => (
        <Word key={name} name={name} highlight={filter} />
      ))}
    </ul>
  );
});

function FilterWords() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(targetURL)
      .then((r) => r.text())
      .then((r) => setList(r.split("\n").sort()));
  }, []);
  const [filter, setFilter] = useState("");
  const [deferedFilter, setDeferedFilter] = useState(""); // deferedFilter: 지연된 필터

  const [isPending, startTransition] = useTransition();

  /** 
   * 문제1: handleChange로 filter값을 변경하는데, 이때 input, words가 re-rendering 됨
   * 해결책: input의 렌더링을 유지하고, Words의 렌더링을 지연시키기 -> useTransition 쓰기!
   * */ 
  const handleChange = ({ target: { value } }) => {
    setFilter(value);

    startTransition(() => {
      /** 
       * startTransition에 우선순위를 낮추고 싶은 코드를 넣어줌
       * setDeferedFilter는 우선순위가 낮아서 렌더링이 지연됨 + 대신 전체 렌더링 시간이 줄어듦!
       * */
      setDeferedFilter(value);
    });
  };
  return (
    <main>
      <label>
        Filter:
        <input type="search" value={filter} onChange={handleChange} />
      </label>
      {isPending ? (
        <p>Loading</p>
      ) : (
        <Words list={list} filter={deferedFilter} />
      )}
    </main>
  );
}

export default function App() {
  return <FilterWords />;
}
