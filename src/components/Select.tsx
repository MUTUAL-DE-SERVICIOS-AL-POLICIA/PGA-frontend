import React from 'react';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, TextField, Autocomplete } from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";

interface SelectComponentProps {
  label: string;
  handleSelect: (value: any) => void;
  options: any[];
  value: any;
  onClear?: () => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const SelectComponent = (props: SelectComponentProps) => {
  const {
    label,
    handleSelect,
    options,
    value,
    onClear,
    disabled = false,
    error,
    helperText,
  } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    handleSelect(newValue);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <>
      <FormControl
        sx={{
          mr: 5,
          mb: .5,
          width: '100%',
          padding: '5px',
          color: "red",
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'red' : 'black',
          },
        }}
        size="small"
      >
        <InputLabel id="select">{label}</InputLabel>
        <Autocomplete
          value={options.find(option => option.id === value) || null}
          onChange={(event, newValue) => handleChange(event, newValue ? newValue.id : null)}
          disableClearable
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {onClear && value && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClear}
                          color="secondary"
                        >
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
              size="small"
            />
          )}
          disabled={disabled}
        />
      </FormControl>
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }}>
          {helperText}
        </Typography>
      )}
    </>
  );
}
