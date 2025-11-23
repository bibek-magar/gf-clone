import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { InputWrapper } from "../Input";
import dayjs, { Dayjs } from "dayjs";

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error: string;
  maxDate?: Dayjs;
  minDate?: Dayjs;
}

const DatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  maxDate,
  minDate,
}: IProps<T>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <InputWrapper>
            <label>{label}</label>
            <MUIDatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              onChange={(date) => {
                field.onChange(date?.toDate() ?? null);
              }}
              maxDate={maxDate}
              minDate={minDate}
              disablePast
              format="MMM DD, YYYY"
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  sx: {
                    minWidth: 0,
                    "& .MuiOutlinedInput-input": {
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  },
                },
              }}
            />
            <p className="error">{error || '\u00A0'}</p>
          </InputWrapper>
        )}
      />
    </LocalizationProvider>
  );
};

export { DatePicker };
