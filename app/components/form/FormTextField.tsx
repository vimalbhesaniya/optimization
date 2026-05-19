'use client';

import * as React from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

export type FormTextFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'ref'
> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: boolean;
  errorMessage?: string;
  onChange?: TextFieldProps['onChange'];
  onBlur?: TextFieldProps['onBlur'];
};

export function FormTextField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  error,
  errorMessage,
  helperText,
  onChange,
  onBlur,
  ...textFieldProps
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          value={field.value ?? ''}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          error={Boolean(error)}
          helperText={error ? errorMessage : helperText}
        />
      )}
    />
  );
}

