import { validations } from "@/constants/validations";
import { TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";

type FormTextFieldProps = {
  margin?: "dense" | "normal" | "none";
  name: string;
  id: string;
  required?: boolean;
  type?: any;
  label: string;
  style?: any;
  control: any;
  autoComplete?: any;
  autoFocus?: any;
  rules?: any;
  fullWidth?: boolean;
};

const FormTextField = (props: FormTextFieldProps) => {
  const { id, 
    margin, 
    name, 
    required, 
    type, 
    label, 
    style, 
    control, 
    rules, 
    fullWidth, 
    autoComplete,
    autoFocus
} =
    props;
  const translate: any = useTranslations();
  const onChangeValue = (e: any, onChange: any) => {
    onChange(e);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
      }) => (
        <>
          <TextField
            id = {id}
            margin={margin}
            name={name}
            label={label}
            type={type == "password" ? "password" : "text"}
            fullWidth = {fullWidth}
            autoComplete= {autoComplete}
            autoFocus = {autoFocus}
            onChange={(e) => {
              onChangeValue(e, onChange);
            }}
            onBlur={onBlur}
            value={value}
            InputLabelProps={{ required: required }}
            variant="outlined"
            style={{ width: "100%", ...style }}
            error={Boolean(error)}
            {...(error && {
              helperText: translate(error?.message),
            })}
            data-testid={`${name}-input`}
          />
        </>
      )}
      rules={{
        required: required ? "validation.requiredMessage" : false,
        ...(rules ? rules : validations[name]),
      }}
    />
  );
};

export default FormTextField;
