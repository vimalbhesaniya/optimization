'use client';

import * as React from 'react';
import FormControlLabel, { type FormControlLabelProps } from '@mui/material/FormControlLabel';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from 'react-hook-form';

export type FormSwitchFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  label: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  switchProps?: Omit<SwitchProps, 'checked' | 'onChange' | 'name' | 'value' | 'inputRef'>;
  labelProps?: Omit<FormControlLabelProps, 'control' | 'label'>;
};

export function FormSwitchField<TFieldValues extends FieldValues>({
  control,
  name,
  rules,
  label,
  error,
  errorMessage,
  switchProps,
  labelProps,
}: FormSwitchFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field }) => (
        <Box>
          <FormControlLabel
            {...labelProps}
            control={
              <Switch
                {...switchProps}
                checked={Boolean(field.value)}
                onChange={(_, checked) => field.onChange(checked)}
                inputRef={field.ref}
              />
            }
            label={label}
          />
          {error ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
        </Box>
      )}
    />
  );
}

