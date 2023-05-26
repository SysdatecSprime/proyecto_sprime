import { Dropdown, DropdownItem, Text } from "@tremor/react";

export const DropDownElement = ({ title, placeholder, options }) => {
  return (
    <div className="w-40">
      <Text>{title}</Text>
      <Dropdown
        className="mt-2"
        onValueChange={(value) => console.log("The selected value is", value)}
        placeholder={placeholder}
      >
        {options?.map((option, idx) => (
          <DropdownItem
            key={`${title}_${option}_${idx}`}
            value={option}
            text={option}
          />
        ))}
      </Dropdown>
    </div>
  );
};