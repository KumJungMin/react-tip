import React from "react";

import type { Info, InfoKey } from "@/view/LessonOne";

const TextField: React.FC<{
  value: Info;
  id: InfoKey;   // key 값에 따라 여러 속성값을 받을 수 있도록 수정
  setValue: (info: Info) => void;
  label: string;
}> = ({ value, setValue, label, id }) => {
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
