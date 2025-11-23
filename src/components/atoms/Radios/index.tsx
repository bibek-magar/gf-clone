import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type IRadioItem = {
  label: string;
  value: string;
};

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  items: IRadioItem[];
}

const Radios = <T extends FieldValues>({ control, name, items }: IProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup row {...field} className="radios">
          {items.map((item) => (
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
};

export { Radios };
