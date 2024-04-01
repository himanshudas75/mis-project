import React from "react";
// import TextArea from "./components/TextArea";
// import Select from "./components/Select";
// import Radio from "./components/Radio";
// import CheckBox from "./components/CheckBox";
// import DateSelector from "./components/DateSelector";
import InputField from "./InputField";
import RadioButton from "./RadioButton";
/// decide which of the differnet form fields
//are to be rendered based on the one particular prop
import DropDown from "./DropDown";
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputField {...rest} />;
    // case "textarea":
    //   return <TextArea {...rest} />;
    case "select":
      return <DropDown {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    // case "checkbox":
    //   return <CheckBox {...rest} />;
    // case "date":
    //   return <DateSelector {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
