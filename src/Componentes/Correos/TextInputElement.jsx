import { Text, TextInput } from "@tremor/react";

export const TextInputElement = ({ title, name, handleChange, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{title}</label>
      <input
        type="text"
        id={name}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="border border-gray-300 px-2 py-1 rounded-md"
      />
    </div>
  );
};

