import React, { useContext, useEffect, useState } from "react";
import type { Info } from "@/view/LessonOne";
import { InfoContext } from '@/view/LessonOne';

type StringKeys = {
  [K in keyof Info]: Info[K] extends boolean ? K : never;
}[keyof Info];

type CustomError = undefined | string;

const CheckboxField: React.FC<{
  id: StringKeys;
  label: string;
  validate?: any;
}> = ({ label, id, validate }) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = useState<CustomError>();

  useEffect(() => {
    const errors: CustomError[] = validate.map(
    (validationFunc: any) => {
      if (value[id]) return validationFunc(value[id]);
    }
  );
    const err = errors.find(Boolean);
    setError(err);
  }, [value[id]]);

  return (
    <>
      {label}
      {/* setValue 호출시 spread 연산을 이용해야하는 단점이 있음 */}
      <input
        data-testid={id}
        onChange={(e) => setValue({ [id]: e.target.checked })}
        value={value[id].toString()}
        type={"checkbox"}
      />
      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
};

export default CheckboxField;
