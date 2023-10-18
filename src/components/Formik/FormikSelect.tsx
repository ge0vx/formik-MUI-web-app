import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

interface IOption {
  value: string;
  name: string;
}

interface IProps {
  field: any;
  form: any;
  label: string;
  options: IOption[];
  className: string;
}

const FormikSelect: React.SFC<IProps> = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  options,
  ...props
}) => {
  return (
    <FormControl
      className={props.className}
      error={Boolean(touched[fields.name] && errors[fields.name])}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select {...fields} {...props} onBlur={event => fields.onBlur}>
        {options.map(({ value: optionValue, name }) => (
          <MenuItem key={name} value={optionValue}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormikSelect;
