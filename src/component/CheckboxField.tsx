import React, { useContext } from "react";
import type { Info } from "@/view/LessonOne";
import { InfoContext } from '@/view/LessonOne';

const CheckboxField: React.FC<{
  id: keyof Omit<Info, "name">;
  label: string;
}> = ({ label, id }) => {
  const { value, setValue } = useContext(InfoContext);
  return (
    <>
      {label}
      {/* setValue 호출시 spread 연산을 이용해야하는 단점이 있음 */}
      <input
        onChange={(e) => setValue({ [id]: e.target.checked })}
        value={value[id].toString()}
        type={"checkbox"}
      />
    </>
  );
};

export default CheckboxField;
