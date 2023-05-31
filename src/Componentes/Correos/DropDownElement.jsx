import { Dropdown, DropdownItem, Text } from "@tremor/react";

export const DropDownElement = ({
  title,
  placeholder,
  options,
  name,
  handleChange,
}) => {
  const changeValue = (value) => {
    const e = {
      target: {
        name: name,
        value: value,
      },
    };

    handleChange(e);
  };
  return (
    <div className="min-w-[10rem] w-1/5">
      <Text>{title}</Text>
      <Dropdown
        className="mt-2"
        onValueChange={changeValue}
        placeholder={placeholder}
        id={`dropdown_${title}`}
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
