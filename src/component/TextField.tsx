import React, { useContext } from "react";

import type { Info } from "@/view/LessonOne";
import { InfoContext } from "@/view/LessonOne";

const TextField: React.FC<{
  id: keyof Omit<Info, "confirm">; // boolean값을 가지는 confirm을 제외한 나머지 속성값을 받을 수 있도록 수정
  label: string;
}> = ({ label, id }) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      {/* setValue 호출시 spread 연산을 이용해야하는 단점이 있음 */}
      <input 
        onChange={(e) => setValue({ [id]: e.target.value })}
        value={value[id].toString()} 
      />
    </>
  );
};

export default TextField;
