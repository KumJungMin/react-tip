import React, { useContext } from "react";
import type { InfoKey } from '@/view/LessonOne';
import { InfoContext } from '@/view/LessonOne';

const CheckboxField: React.FC<{
  id: InfoKey;   // id 값에 따라 여러 속성값을 받을 수 있도록 수정
  label: string;
}> = ({ label, id }) => {
  const { value, setValue } = useContext(InfoContext);
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
