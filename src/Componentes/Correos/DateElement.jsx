import { DateRangePicker, Text } from "@tremor/react";

const now = new Date();

export const DateElement = ({ title, placeholder }) => {
  return (
    <div className="w-40">
      <Text>{title}</Text>
      <DateRangePicker
        placeholder={placeholder}
        className="mt-2"
        maxDate={now}
        enableDropdown={false}
      />
    </div>
  );
};
