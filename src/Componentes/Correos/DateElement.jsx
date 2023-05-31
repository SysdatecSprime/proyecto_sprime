import { DateRangePicker, Text } from "@tremor/react";

const now = new Date();

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day < 10 ? `0${day}` : day}${
    month < 10 ? `0${month}` : month
  }${year}`;
};

export const DateElement = ({ title, placeholder, name, handleChange }) => {
  const changeValue = (value) => {
    const e = {
      target: {
        name: name,
        value: formatDate(value[0]),
      },
    };

    handleChange(e);
  };

  return (
    <div className="min-w-[10rem] w-1/5">
      <Text>{title}</Text>
      <DateRangePicker
        placeholder={placeholder}
        className="mt-2"
        maxDate={now}
        enableDropdown={false}
        onValueChange={changeValue}
      />
    </div>
  );
};
