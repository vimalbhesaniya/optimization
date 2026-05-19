'use client';

import * as React from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

export type SelectOption = { value: string; label: string };

export type FormSelectFieldProps<TFieldValues extends FieldValues> = Omit<
  TextFieldProps,
  'select' | 'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur' | 'ref'
> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  options: SelectOption[];
  error?: boolean;
  errorMessage?: string;
};

export function FormSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  options,
  error,
  errorMessage,
  helperText,
  ...textFieldProps
}: FormSelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...textFieldProps}
          {...field}
          select
          value={field.value ?? ''}
          error={Boolean(error)}
          helperText={error ? errorMessage : helperText}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}

