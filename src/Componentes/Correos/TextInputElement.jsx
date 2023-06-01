import { Text, TextInput } from "@tremor/react";

export const TextInputElement = ({ title, placeholder }) => {
  return (
    <div className="w-40">
      <Text>{title}</Text>
      <TextInput className="mt-2" placeholder={placeholder} />
    </div>
  );
};
