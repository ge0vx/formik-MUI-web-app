import * as React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  StyleRulesCallback,
  withStyles,
  WithStyles
} from '@material-ui/core';
import classNames from 'classnames';

interface IControl {
  value: string;
  label: string;
  disabled: boolean;
}

interface IProps extends WithStyles<Classes> {
  field: any;
  form: any;
  label: string;
  controls: IControl[];
  className: string;
  horizontal?: boolean;
}

type Classes = 'root' | 'horizonal';

const styles: StyleRulesCallback<Classes> = theme => ({
  root: {
    width: '100%'
  },
  horizonal: {
    flexDirection: 'row'
  }
});

const FormikRadioGroup: React.SFC<IProps> = ({
  field: { ...fields },
  form: { touched, errors, ...rest },
  classes,
  horizontal,
  ...props
}) => {
  return (
    <FormControl
      component="fieldset"
      className={classNames({ [classes.root]: horizontal })}
      error={Boolean(touched[fields.name] && errors[fields.name])}
    >
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        {...fields}
        {...props}
        className={classNames({ [classes.horizonal]: horizontal })}
      >
        {props.controls.map(({ value, disabled, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            disabled={disabled}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default withStyles(styles)(FormikRadioGroup);
