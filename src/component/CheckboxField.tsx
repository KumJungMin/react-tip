import React from "react";
import type { Info, InfoKey } from '@/view/LessonOne';

const CheckboxField: React.FC<{
  value: Info;
  id: InfoKey;   // id 값에 따라 여러 속성값을 받을 수 있도록 수정
  setValue: (info: Info) => void;
  label: string;
}> = ({ label, value, setValue, id }) => {
  return (
    <>
      {label}
      <input
        onChange={(e) => setValue({ ...value, [id]: e.target.value })}
        value={value[id].toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
