import React from "react";
import type { Info } from "@/view/LessonOne";
import useInput from "@/hooks/useInput";

export type StringKeys = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

const CheckboxField: React.FC<{
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
        onChange={(e) => onChange(e.target.checked)}
        value={value[id].toString()}
        type={"checkbox"}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
