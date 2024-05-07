import { useState, createContext } from "react";
import TextField from "@/component/TextField";
import Form from "@/component/Form";
import CheckboxField from "@/component/CheckboxField";

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
  password: string;
  confirm: boolean;
}

export type InfoKey = keyof Info;

const defaultInfo: Info = {
  name: "",
  password: "",
  confirm: false,
};

// provider를 사용하여 value를 전달할 수 있도록 한다.
export const InfoContext = createContext({
  value: defaultInfo,
  setValue: (v: Info) => {},
});

function LessonOne() {
  const [info, setInfo] = useState<Info>(defaultInfo);

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
        <TextField id="name" label="이름" />
        <CheckboxField id="confirm" label="위 내용이 제출됩니다 동의하십니까?" />
      </InfoContext.Provider>
    </Form>
  );
}

export default LessonOne;
