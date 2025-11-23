import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import styled from "styled-components";
import { currentTheme } from "../../../utils/theme";
import type { Airport } from "../../../interfaces";
import { Fragment, useState } from "react";
import { useAirportSearch } from "../../../hooks";

interface IProps {
  label: string;
  error: string;
  value?: Airport | null;
  onSelect: (airport: Airport | null) => void;
}

const Input = ({ label, error, onSelect, value }: IProps) => {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: options, isFetching } = useAirportSearch(searchTerm);

  return (
    <InputWrapper className="input-wrapper">
      <label>{label}</label>
      <Autocomplete<Airport, false, false, false>
        fullWidth
        autoHighlight
        options={options?.data || []}
        value={value}
        filterOptions={(x) => x}
        getOptionLabel={(opt) =>
          opt ? `${opt?.presentation?.suggestionTitle}` : ""
        }
        loading={isFetching}
        onInputChange={(_e, newInput) => {
          setInput(newInput);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearchTerm(input);
          }
        }}
        onChange={(_e, newVal) => onSelect(newVal)}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {isFetching ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              },
            }}
          />
        )}
      />
      {/* <TextField variant="outlined" {...field} />
       */}
      <p className="error">{error || '\u00A0'}</p>
    </InputWrapper>
  );
};

export { Input };

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;

  & label {
    color: ${currentTheme.textSecondary};
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  & .MuiAutocomplete-inputRoot {
    padding: 1px 14px;
    background: ${currentTheme.searchBg};
  }

  & .MuiPickersInputBase-adornedEnd:hover {
    & fieldset {
      border-color: ${currentTheme.primary};
    }
  }
  & .MuiInputBase-formControl,
  .MuiPickersOutlinedInput-root {
    border-radius: 10px;

    &:hover {
      & .MuiOutlinedInput-notchedOutline {
        border-color: ${currentTheme.primary};
      }
    }
  }

  & .MuiPickersSectionList-root {
    padding: 10px 3px;
  }

  & .MuiPickersTextField-root {
    background: ${currentTheme.searchBg};
  }

  & input {
    padding: 10px 16px;
    color: ${currentTheme.text};
    background: transparent;
  }

  & fieldset {
    border: 2px solid ${currentTheme.border};
  }

  & .error {
    color: ${currentTheme.required};
    font-size: 13px;
    margin-top: 5px;
    min-height: 18px;
    line-height: 18px;
    margin-bottom: 0;
  }
`;
