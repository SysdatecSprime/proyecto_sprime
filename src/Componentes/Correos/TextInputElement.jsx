import { Text, TextInput } from "@tremor/react";

export const TextInputElement = ({
  title,
  placeholder,
  name,
  handleChange,
}) => {
  return (
    <div className="min-w-[10rem] w-1/5">
      <Text>{title}</Text>
      <TextInput
        className="mt-2"
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};
