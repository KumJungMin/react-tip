import React, { useContext } from "react";
import { Info, InfoContext } from "@/view/LessonOne";
import type { PartialInfo } from "@/view/LessonOne";

const useInput = ({
  id,
  validate,
}: {
  id: keyof Info;
  validate: any;
}) => {
  const { value, setValue } = useContext(InfoContext);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const errors: (string | undefined)[] = validate.map(
      (validationFunc: any) => {
        if (value[id]) return validationFunc(value[id]);
      }
    );

    const err = errors.find((error) => error);
    setError(err);
  }, [value[id]]);

  const onChange = (v: any) => {
    setValue({ [id]: v } as PartialInfo);
  };

  return { error, value: value[id], onChange };
};

export default useInput;
