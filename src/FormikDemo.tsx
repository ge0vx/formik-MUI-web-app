import * as React from 'react';
import { withFormik, Form, Field, FormikProps } from 'formik';
import * as yup from 'yup';
import {
  Button,
  FormControlLabel,
  Paper,
  FormGroup,
  WithStyles,
  StyleRulesCallback,
  withStyles,
  Grid
} from '@material-ui/core';
import { compose } from 'redux';

import {
  FormikTextField,
  FormikCheckbox,
  FormikSelect,
  FormikSwitch,
  FormikRadioGroup
} from './components/Formik';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(3)
    .max(16)
    .required(),
  checkbox: yup.boolean(),
  switch: yup.boolean(),
  gender: yup.string().required(),
  select: yup.string().required()
});

type Classes = 'root' | 'field';

const styles: StyleRulesCallback<Classes> = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  field: {
    width: '100%'
  }
});

interface IFormValues {
  email: string;
  password: string;
  checkbox: boolean;
  switch: boolean;
  select: string;
  gender: string;
  selectBool: boolean;
}

const defaultValues: IFormValues = {
  email: '',
  password: '',
  checkbox: true,
  switch: true,
  select: 'first',
  selectBool: false,
  gender: ''
};

interface IProps extends FormikProps<IFormValues>, WithStyles<Classes> {}

const FormikDemo: React.SFC<IProps> = ({ values, classes, resetForm }) => (
  <Paper>
    <FormGroup>
      <Form>
        <Grid container spacing={16} className={classes.root}>
          <Grid item xs={6}>
            <Field
              className={classes.field}
              name="email"
              label="Email"
              component={FormikTextField}
            />
          </Grid>

          <Grid item xs={6}>
            <Field
              name="password"
              type="password"
              label="Password"
              className={classes.field}
              component={FormikTextField}
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Field
                  name="checkbox"
                  type="checkbox"
                  label="Checkbox"
                  component={FormikCheckbox}
                  checked={values.checkbox}
                />
              }
              label="Checkbox"
            />
          </Grid>

          <Grid item xs={6}>
            <Field
              className={classes.field}
              name="select"
              label="Select"
              component={FormikSelect}
              options={[
                { value: 'first', name: 'First' },
                { value: 'second', name: 'Second' }
              ]}
            />
          </Grid>

          <Grid item xs={12}>
            <Field
              className={classes.field}
              name="selectBool"
              label="Select with Boolean"
              component={FormikSelect}
              options={[
                { value: true, name: 'True' },
                { value: false, name: 'False' }
              ]}
            />
          </Grid>

          <Grid item xs={6}>
            <Field
              name="switch"
              type="checkbox"
              label="Switch"
              component={FormikSwitch}
              checked={values.switch}
            />
          </Grid>

          <Grid item xs={6}>
            <Field
              className={classes.field}
              name="gender"
              label="Gender"
              component={FormikRadioGroup}
              controls={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ]}
              horizontal={true}
            />
          </Grid>

          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button
                type="submit"
                className={classes.field}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                className={classes.field}
                variant="contained"
                color="default"
                onClick={() => {
                  resetForm(defaultValues);
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </FormGroup>
  </Paper>
);

const enhance = compose(
  withStyles(styles),
  withFormik<IProps, IFormValues>({
    mapPropsToValues: props => defaultValues,

    validationSchema,

    handleSubmit: (values, props) => {
      console.log('values', values);
    }
  })
);

export default enhance(FormikDemo);
