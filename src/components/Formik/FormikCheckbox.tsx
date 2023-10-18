import * as React from 'react';
import { Checkbox } from '@material-ui/core';

interface IProps {
  field: any;
  form: any;
}

const FormikCheckbox: React.SFC<IProps> = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  return <Checkbox {...fields} {...props} />;
};

export default FormikCheckbox;
