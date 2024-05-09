import { createContext, useReducer } from "react";
import TextField from "@/component/TextField";
import Form from "@/component/Form";
import CheckboxField from "@/component/CheckboxField";

import { maxLength, minLength } from "@/utils/validation";
/** 
 * FLOCKING RULE(리팩토링시 규칙)
 * (https://github.com/benchristel/refactoring-workshop/blob/master/docs/refactorings/flocking-rules.md)
 * - 함께 변하는 것은 함께 있어야 한다"는 원칙을 따른다.
 * 1. 가장 비슷한 것을 찾아보세요.
 * 2. 이들 사이의 가장 작은 차이를 선택하세요.
 * 3. 그 차이를 제거할 수 있는 최소한의 변경을 하십시오.
**/ 

export interface Info {
  name: string;
  confirm: boolean;
}

type PartialInfo = {
  [infoKey in keyof Info]: Record<infoKey, Info[infoKey]>;
}[keyof Info];

const defaultInfo: Info = {
  name: "",
  confirm: false,
};

// provider를 사용하여 value를 전달할 수 있도록 한다.
export const InfoContext = createContext({
  value: defaultInfo,
  setValue: (v: PartialInfo) => {},
});

function LessonOne() {
  // const [info, setInfo] = useState<Info>(defaultInfo);

  /** 
   * 문제점: TextField와 CheckboxField에서 setValue 호출시 spread 연산을 이용해야하는 단점이 있다.
   * => TIP) useReducer로 spread dependency를 제거할 수 있다.
   * 
   * "const [state, dispatch] = useReducer(reducer, initialArg, init)""
   * - reducer: (state{이전값}, action{값 변경 동작}) => newState{변경된 값}
   * - initialArg: 초기값
   * - init: 초기값을 만들어주는 함수
   * 
   * - state: 현재 상태값
   * - dispatch: action을 발생시키는 함수
   * */ 

  // partialInfo에 "(e) => setValue({ [id]: e.target.value })"가 들어가게 된다.
  // 그래서, useReducer에서 spread 연산을 대신해준다.
  const [info, setInfo] = useReducer((prevInfo: Info, partialInfo: PartialInfo) => {
    return {
      ...prevInfo,
      ...partialInfo,
    };
  }, defaultInfo);


  const onSubmit = () => {
    if (info.confirm) {
      alert(`name: ${info.name}`);
    }
  };

  /** 
   * 1번 룰(유사점 찾기): TextField와 CheckboxField는 모두 value와 setValue를 props로 받는다.
   * 2번 룰(가장 작은 차이 선택): TextField는 name을 받고, CheckboxField는 confirm을 받는다.
   * 3번 룰(최소한의 변경): 차이가 나는 부분을 제거한다
   * 
   * 3-1. 둘 다 같은 data 객체를 받도록 수정한다.
   * 3-2. 중복되는 부분을 제거하고, 공통된 부분을 추출한다.(value, setValue)
   * */ 



  return (
    <Form onSubmit={onSubmit}>
      <InfoContext.Provider value={{ value: info, setValue: setInfo }}>
        <TextField id="name" label="이름" validate={[minLength(2), maxLength(6)]} />
        <CheckboxField id="confirm" label="위 내용이 제출됩니다 동의하십니까?" />
      </InfoContext.Provider>
    </Form>
  );
}

export default LessonOne;
