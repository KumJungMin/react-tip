import React from "react";

const TextField: React.FC<{
  value: string;
  setValue: (v: string) => void;
  label: string;
}> = ({ value, setValue, label }) => {
  return (
    <>
      {label}
      <input onChange={(e) => setValue(e.target.value)} value={value} />
    </>
  );
};

export default TextField;
