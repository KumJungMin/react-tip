import React from "react";

const Form: React.FC<{
  onSubmit: () => void;
  children: React.ReactElement | React.ReactElement[];
}> = ({ onSubmit, children }) => {
  return (
    <div
      style={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      {children}
      <button type={"submit"} onClick={onSubmit}>
        제출
      </button>
    </div>
  );
};

export default Form;
