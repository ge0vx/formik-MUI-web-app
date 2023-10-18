import * as React from "react";
import { Switch } from "@material-ui/core";

interface IProps {
  field: any;
  form: any;
}

const FormikSwitch: React.SFC<IProps> = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  return <Switch {...fields} {...props} />;
};

export default FormikSwitch;
