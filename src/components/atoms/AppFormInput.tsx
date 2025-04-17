import React from 'react';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import AppInput, {IAppTextInputProps} from './AppInput';
import Logger from '@helpers/logger';


interface TextInputProps extends IAppTextInputProps, UseControllerProps {
  name: string;
  defaultValue?: string;
}
const ControlledInput: React.FC<TextInputProps> = props => {
  const {formState} = useFormContext();
  const {name, rules, defaultValue, ...inputProps} = props;
  const {field} = useController({name, rules, defaultValue});
  const hasError = Boolean(formState?.errors[name]);
  const errMessage = formState?.errors[name]?.message;
  const errorMessage =
    typeof errMessage === 'string' ? errMessage : JSON.stringify(errMessage);
  return (
    <AppInput
      error={hasError ? errorMessage : ''}
      variant="outlined"
      autoCapitalize="none"
      textAlign="left"
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      defaultValue={defaultValue}
      {...inputProps}
    />
  );
};

export const AppFormInput: React.FC<TextInputProps> = props => {
  const formContext = useFormContext();

  if (!formContext) {
    Logger.error('TextInput must be wrapped by the FormProvider');
    return null;
  }
  if (!props.name) {
    Logger.error('Name must be defined for TextInput');
    return null;
  }

  return <ControlledInput {...props} />;
};
