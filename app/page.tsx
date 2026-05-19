'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';

import { FormSelectField } from './components/form/FormSelectField';
import { FormSwitchField } from './components/form/FormSwitchField';
import { FormTextField } from './components/form/FormTextField';

type EmployeeDraftForm = {
  id: string;
  send_invitation: boolean;
  document_details: unknown[];
  basic_details: {
    title: 'mr.' | 'mrs.' | 'ms.' | 'dr.' | 'other';
    first_name: string;
    middle_name: string | null;
    last_name: string;
    nick_name: string | null;
    gen_employee_full_name: string;
    email: string | null;
    mobile_no: string | null;
    gender: 'male' | 'female' | 'other';
    joining_date: string | null;
    on_book_joining_date: string | null;
    date_of_birth: string | null;
    confirmation_date: string | null;
    notice_period_days: number | null;
    avatar: string | null;
  };
  work_details: {
    grade_id: string | null;
    company_id: string | null;
    punch_code: string | null;
    work_type_id: string | null;
    department_id: string | null;
    employee_code: string | null;
    leave_plan_id: string | null;
    shift_type_id: string | null;
    skill_type_id: string | null;
    assigned_roles: string[];
    designation_id: string | null;
    contract_number: string | null;
    business_unit_id: string | null;
    employee_code_id: string | null;
    holiday_group_id: string | null;
    overtime_rule_id: string | null;
    contract_end_date: string | null;
    sub_department_id: string | null;
    bank_shift_type_id: string | null;
    employee_code_type: 'auto' | 'manual' | string;
    weekly_off_type_id: string | null;
    reporting_manager_id: string | null;
    contract_register_number: string | null;
    business_unit_location_id: string | null;
    attendance_penalty_rule_id: string | null;
  };
};

const employeeDraftDefaults: EmployeeDraftForm = {
  id: '019dc333-f122-74c6-906a-1e5be5bd92b3',
  send_invitation: true,
  document_details: [],
  basic_details: {
    email: null,
    title: 'mrs.',
    avatar: null,
    gender: 'other',
    last_name: 'Dhula',
    mobile_no: '917676577866',
    nick_name: null,
    first_name: 'Chirag',
    middle_name: null,
    joining_date: '2026-04-01',
    date_of_birth: '2008-04-01',
    confirmation_date: '2026-04-01',
    notice_period_days: 30,
    on_book_joining_date: null,
    gen_employee_full_name: 'Chirag Dhula',
  },
  work_details: {
    grade_id: null,
    company_id: '1b97cb52-a7f9-4720-a58c-ba78067fdbaa',
    punch_code: '55555',
    work_type_id: '20b8c186-377b-4d8c-98b2-fb73a45c6f6a',
    department_id: '0da8f641-f951-4584-a901-45cc7b990ee6',
    employee_code: 'OZE12',
    leave_plan_id: 'c58c604f-8aa4-4ef3-a025-fc1a45300439',
    shift_type_id: '7620b4fc-bb28-415c-a3ff-65d91a425d0d',
    skill_type_id: 'd31dad5e-fa0f-4a1b-b8e6-a749911989b2',
    assigned_roles: [],
    designation_id: '9298036e-d689-4992-b97d-f641af8f634c',
    contract_number: null,
    business_unit_id: '5b845969-e1ce-4cd5-8f3d-a0e362d82d3f',
    employee_code_id: 'bad5fc9b-b584-4d25-ab92-65f658fdfd72',
    holiday_group_id: '60145850-8186-4126-9eff-8d524d88181a',
    overtime_rule_id: null,
    contract_end_date: null,
    sub_department_id: '036f6a7e-77de-4c4b-a470-c98d339715f0',
    bank_shift_type_id: 'ee367252-cedc-412f-804c-17dca59fd5dc',
    employee_code_type: 'auto',
    weekly_off_type_id: '49a731c3-7b09-4d36-afcd-1e84b78b7c3a',
    reporting_manager_id: null,
    contract_register_number: null,
    business_unit_location_id: 'f7f7573d-ca3c-4ebc-908b-9aba2f98aaff',
    attendance_penalty_rule_id: null,
  },
};

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
    setValue,
    getValues,
  } = useForm<EmployeeDraftForm>({
    defaultValues: employeeDraftDefaults,
    mode: 'all',
  });

  const fullNameManuallyEditedRef = React.useRef(false);
  const fullNameDebounceRef = React.useRef<number | null>(null);

  const scheduleAutoFullName = React.useCallback(() => {
    if (fullNameManuallyEditedRef.current) return;

    if (fullNameDebounceRef.current) {
      window.clearTimeout(fullNameDebounceRef.current);
    }

    fullNameDebounceRef.current = window.setTimeout(() => {
      const { first_name, middle_name, last_name, gen_employee_full_name } = getValues().basic_details;

      const autoFullName = [first_name, middle_name, last_name]
        .filter((p) => Boolean((p ?? '').toString().trim()))
        .map((p) => (p ?? '').toString().trim())
        .join(' ');

      if ((gen_employee_full_name ?? '') === autoFullName) return;

      setValue('basic_details.gen_employee_full_name', autoFullName, {
        shouldDirty: true,
        shouldTouch: false,
        shouldValidate: false,
      });
    }, 120);
  }, [getValues, setValue]);

  React.useEffect(() => {
    return () => {
      if (fullNameDebounceRef.current) {
        window.clearTimeout(fullNameDebounceRef.current);
      }
    };
  }, []);

  const onSubmit = React.useCallback((values: EmployeeDraftForm) => {
    // per requirement: just console.log
    console.log('Employee form submit:', values);
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Employee Form
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Draft ID: {employeeDraftDefaults.id}
              </Typography>
            </Box>

            <Divider />

            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                    Basic details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormSelectField
                        control={control}
                        name="basic_details.title"
                        label="Title"
                        fullWidth
                        options={[
                          { value: 'mr.', label: 'Mr.' },
                          { value: 'mrs.', label: 'Mrs.' },
                          { value: 'ms.', label: 'Ms.' },
                          { value: 'dr.', label: 'Dr.' },
                          { value: 'other', label: 'Other' },
                        ]}
                        rules={{ required: 'Title is required' }}
                        error={Boolean(errors.basic_details?.title)}
                        errorMessage={errors.basic_details?.title?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.first_name"
                        label="First name"
                        fullWidth
                        rules={{ required: 'First name is required' }}
                        onChange={scheduleAutoFullName}
                        error={Boolean(errors.basic_details?.first_name)}
                        errorMessage={errors.basic_details?.first_name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.middle_name"
                        label="Middle name"
                        fullWidth
                        onChange={scheduleAutoFullName}
                        error={Boolean(errors.basic_details?.middle_name)}
                        errorMessage={errors.basic_details?.middle_name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.last_name"
                        label="Last name"
                        fullWidth
                        rules={{ required: 'Last name is required' }}
                        onChange={scheduleAutoFullName}
                        error={Boolean(errors.basic_details?.last_name)}
                        errorMessage={errors.basic_details?.last_name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.gen_employee_full_name"
                        label="Full name"
                        fullWidth
                        rules={{ required: 'Full name is required' }}
                        onChange={() => {
                          fullNameManuallyEditedRef.current = true;
                        }}
                        error={Boolean(errors.basic_details?.gen_employee_full_name)}
                        errorMessage={errors.basic_details?.gen_employee_full_name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.email"
                        label="Email"
                        type="email"
                        fullWidth
                        error={Boolean(errors.basic_details?.email)}
                        errorMessage={errors.basic_details?.email?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.mobile_no"
                        label="Mobile no"
                        fullWidth
                        rules={{
                          required: 'Mobile number is required',
                          minLength: { value: 8, message: 'Too short' },
                        }}
                        error={Boolean(errors.basic_details?.mobile_no)}
                        errorMessage={errors.basic_details?.mobile_no?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormSelectField
                        control={control}
                        name="basic_details.gender"
                        label="Gender"
                        fullWidth
                        options={[
                          { value: 'male', label: 'Male' },
                          { value: 'female', label: 'Female' },
                          { value: 'other', label: 'Other' },
                        ]}
                        rules={{ required: 'Gender is required' }}
                        error={Boolean(errors.basic_details?.gender)}
                        errorMessage={errors.basic_details?.gender?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.date_of_birth"
                        label="Date of birth"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={Boolean(errors.basic_details?.date_of_birth)}
                        errorMessage={errors.basic_details?.date_of_birth?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.joining_date"
                        label="Joining date"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        rules={{ required: 'Joining date is required' }}
                        error={Boolean(errors.basic_details?.joining_date)}
                        errorMessage={errors.basic_details?.joining_date?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.confirmation_date"
                        label="Confirmation date"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={Boolean(errors.basic_details?.confirmation_date)}
                        errorMessage={errors.basic_details?.confirmation_date?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.notice_period_days"
                        label="Notice period (days)"
                        type="number"
                        fullWidth
                        rules={{
                          min: { value: 0, message: 'Must be >= 0' },
                          max: { value: 365, message: 'Must be <= 365' },
                        }}
                        error={Boolean(errors.basic_details?.notice_period_days)}
                        errorMessage={errors.basic_details?.notice_period_days?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.nick_name"
                        label="Nick name"
                        fullWidth
                        error={Boolean(errors.basic_details?.nick_name)}
                        errorMessage={errors.basic_details?.nick_name?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                      <FormTextField
                        control={control}
                        name="basic_details.on_book_joining_date"
                        label="On book joining date"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={Boolean(errors.basic_details?.on_book_joining_date)}
                        errorMessage={errors.basic_details?.on_book_joining_date?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                    Work details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.company_id"
                        label="Company ID"
                        fullWidth
                        rules={{ required: 'Company ID is required' }}
                        error={Boolean(errors.work_details?.company_id)}
                        errorMessage={errors.work_details?.company_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.employee_code"
                        label="Employee code"
                        fullWidth
                        rules={{ required: 'Employee code is required' }}
                        error={Boolean(errors.work_details?.employee_code)}
                        errorMessage={errors.work_details?.employee_code?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.punch_code"
                        label="Punch code"
                        fullWidth
                        error={Boolean(errors.work_details?.punch_code)}
                        errorMessage={errors.work_details?.punch_code?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.work_type_id"
                        label="Work type ID"
                        fullWidth
                        error={Boolean(errors.work_details?.work_type_id)}
                        errorMessage={errors.work_details?.work_type_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.department_id"
                        label="Department ID"
                        fullWidth
                        error={Boolean(errors.work_details?.department_id)}
                        errorMessage={errors.work_details?.department_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.sub_department_id"
                        label="Sub-department ID"
                        fullWidth
                        error={Boolean(errors.work_details?.sub_department_id)}
                        errorMessage={errors.work_details?.sub_department_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.designation_id"
                        label="Designation ID"
                        fullWidth
                        error={Boolean(errors.work_details?.designation_id)}
                        errorMessage={errors.work_details?.designation_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.leave_plan_id"
                        label="Leave plan ID"
                        fullWidth
                        error={Boolean(errors.work_details?.leave_plan_id)}
                        errorMessage={errors.work_details?.leave_plan_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.shift_type_id"
                        label="Shift type ID"
                        fullWidth
                        error={Boolean(errors.work_details?.shift_type_id)}
                        errorMessage={errors.work_details?.shift_type_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.bank_shift_type_id"
                        label="Bank shift type ID"
                        fullWidth
                        error={Boolean(errors.work_details?.bank_shift_type_id)}
                        errorMessage={errors.work_details?.bank_shift_type_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.skill_type_id"
                        label="Skill type ID"
                        fullWidth
                        error={Boolean(errors.work_details?.skill_type_id)}
                        errorMessage={errors.work_details?.skill_type_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.holiday_group_id"
                        label="Holiday group ID"
                        fullWidth
                        error={Boolean(errors.work_details?.holiday_group_id)}
                        errorMessage={errors.work_details?.holiday_group_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.weekly_off_type_id"
                        label="Weekly off type ID"
                        fullWidth
                        error={Boolean(errors.work_details?.weekly_off_type_id)}
                        errorMessage={errors.work_details?.weekly_off_type_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.business_unit_id"
                        label="Business unit ID"
                        fullWidth
                        error={Boolean(errors.work_details?.business_unit_id)}
                        errorMessage={errors.work_details?.business_unit_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.business_unit_location_id"
                        label="Business unit location ID"
                        fullWidth
                        error={Boolean(errors.work_details?.business_unit_location_id)}
                        errorMessage={errors.work_details?.business_unit_location_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.employee_code_id"
                        label="Employee code ID"
                        fullWidth
                        error={Boolean(errors.work_details?.employee_code_id)}
                        errorMessage={errors.work_details?.employee_code_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.employee_code_type"
                        label="Employee code type"
                        fullWidth
                        error={Boolean(errors.work_details?.employee_code_type)}
                        errorMessage={errors.work_details?.employee_code_type?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.contract_number"
                        label="Contract number"
                        fullWidth
                        error={Boolean(errors.work_details?.contract_number)}
                        errorMessage={errors.work_details?.contract_number?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.contract_register_number"
                        label="Contract register number"
                        fullWidth
                        error={Boolean(errors.work_details?.contract_register_number)}
                        errorMessage={errors.work_details?.contract_register_number?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.contract_end_date"
                        label="Contract end date"
                        type="date"
                        fullWidth
                        slotProps={{ inputLabel: { shrink: true } }}
                        error={Boolean(errors.work_details?.contract_end_date)}
                        errorMessage={errors.work_details?.contract_end_date?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.reporting_manager_id"
                        label="Reporting manager ID"
                        fullWidth
                        error={Boolean(errors.work_details?.reporting_manager_id)}
                        errorMessage={errors.work_details?.reporting_manager_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.grade_id"
                        label="Grade ID"
                        fullWidth
                        error={Boolean(errors.work_details?.grade_id)}
                        errorMessage={errors.work_details?.grade_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.overtime_rule_id"
                        label="Overtime rule ID"
                        fullWidth
                        error={Boolean(errors.work_details?.overtime_rule_id)}
                        errorMessage={errors.work_details?.overtime_rule_id?.message}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                      <FormTextField
                        control={control}
                        name="work_details.attendance_penalty_rule_id"
                        label="Attendance penalty rule ID"
                        fullWidth
                        error={Boolean(errors.work_details?.attendance_penalty_rule_id)}
                        errorMessage={errors.work_details?.attendance_penalty_rule_id?.message}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider />

                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
                    Invitation
                  </Typography>
                  <FormSwitchField
                    control={control}
                    name="send_invitation"
                    label="Send invitation to employee"
                    error={Boolean(errors.send_invitation)}
                    errorMessage={errors.send_invitation?.message}
                  />
                </Box>

                <Divider />

                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1.5}
                  sx={{ justifyContent: 'flex-end' }}
                >
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => reset(employeeDraftDefaults)}
                    disabled={isSubmitting || !isDirty}
                  >
                    Reset
                  </Button>
                  <Button type="submit" variant="contained" disabled={isSubmitting}>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}