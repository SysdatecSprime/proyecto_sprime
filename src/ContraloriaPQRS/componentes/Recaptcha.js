import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

function onChange(value) {
  console.log("Captcha value", value);
}

const Verificador = (props) => {
  return (
    <ReCAPTCHA
      sitekey="6LeFnLQmAAAAAPBVjnn7gZ04TNvPy4YoJ7AzVIo8"
      onChange={props.onChangeCaptcha}
    />
  );
};
export default Verificador;
