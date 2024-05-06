import React from "react";
// import TextArea from "./components/TextArea";
// import Select from "./components/Select";
// import Radio from "./components/Radio";
// import DateSelector from "./components/DateSelector";
import InputField from "./InputField";
import RadioButton from "./RadioButton";
/// decide which of the differnet form fields
//are to be rendered based on the one particular prop
import DropDown from "./DropDown";
import TextArea from "./TextArea";
import CheckBoxField from "./CheckBoxField";
import NestedInputField from "./NestedInputField";
import NestedDropDown from "./NestedDropDown";
import ArrayField from "./ArrayField";
import FileFieldInput from "./FilleFieldInput";
const FormikControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputField {...rest} />;
    case "nestedinput":
      return <NestedInputField {...rest} />;
    case "textarea":
      return <TextArea {...rest} />;
    case "select":
      return <DropDown {...rest} />;
    case "nestedselect":
      return <NestedDropDown {...rest} />;
    case "radio":
      return <RadioButton {...rest} />;
    case "checkbox":
      return <CheckBoxField {...rest} />;
    // case "date":
    //   return <DateSelector {...rest} />;
    case "arrayfield":
      return <ArrayField {...rest} />;
    case "filefield":
      return <FileFieldInput {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
