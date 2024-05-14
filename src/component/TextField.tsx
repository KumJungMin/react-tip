import React from "react";

import type { Info } from "@/view/LessonOne";
import useInput from "@/hooks/useInput";

type StringKeys = {
  // [K in keyof Info] 는 Info의 key값을 순회한다.
  // [K in keyof Info]: Info[K] 는 Info의 key값을 순회하면서 해당 key값에 해당하는 value값을 반환한다.

  //[K in keyof Info]:Info[K] extends string ? K : never; 
  // Info의 key값을 순회하면서 해당 key값에 해당하는 value값이 string이면 key값을 반환하고, 아니면 never를 반환한다.
  // extends란, Info[K]가 string을 상속받는다면, Info[K]는 string이다.
  // 따라서, Info[K]가 string이면, K를 반환하고, 아니면 never를 반환한다.

  [K in keyof Info]: Info[K] extends string ? K : never;
}[keyof Info];

// type StringKeys = {
//   name: "name";
//   confirm: never;
// }[keyof Info];

 // [keyof Info]에는 name | confirm가 들어가게 된다.
  // {name: "name", confirm: never}[name | confirm]은 
  // "name"만 반환하게 된다.

const TextField: React.FC<{
  id: StringKeys;
  label: string;
  validate?: any;
}> = ({ label, id, validate }) => {
  const { error, value, onChange } = useInput({ id, validate });


  return (
    <>
      {label}
      {/* setValue 호출시 spread 연산을 이용해야하는 단점이 있음 */}
      <input 
        data-testid={id}
        onChange={(e) => onChange(e.target.value)}
        value={value[id].toString()} 
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default TextField;
