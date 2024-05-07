import React, { useContext } from "react";

import type { InfoKey } from "@/view/LessonOne";
import { InfoContext } from "@/view/LessonOne";

const TextField: React.FC<{
  id: InfoKey;   // key 값에 따라 여러 속성값을 받을 수 있도록 수정
  label: string;
}> = ({ label, id }) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      <input 
        onChange={(e) => setValue({ ...value, [id]: e.target.value })}
        value={value[id].toString()} 
      />
    </>
  );
};

export default TextField;
