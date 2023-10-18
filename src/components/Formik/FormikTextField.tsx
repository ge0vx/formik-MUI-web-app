import * as React from "react";
import { TextField } from "@material-ui/core";
// import { FormControl } from '@material-ui/core';

// import FormLabel from '@material-ui/core/FormLabel';

// const inputLabelProps = {
//   component: FormLabel
// };

interface IProps {
  field: any;
  form: any;
}

const FormikTextField: React.SFC<IProps> = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  // console.log(rest);
  return (
    <TextField
      {...fields}
      {...props}
      //value={rest.values[props.name]}
      // InputLabelProps={inputLabelProps}
      // component={FormControl}
      // value={rest.values[props.name]}
      error={Boolean(touched[fields.name] && errors[fields.name])}
      //label={(touched[field.name] && errors[field.name]) || label}
      helperText={touched[fields.name] && errors[fields.name]}
    />
  );
};

export default FormikTextField;
