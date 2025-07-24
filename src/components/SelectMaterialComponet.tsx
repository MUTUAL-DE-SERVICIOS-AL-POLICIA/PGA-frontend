import {
    Autocomplete,
    TextField,

    Box,

} from "@mui/material";

interface MaterialOption {
    id: number;
    name: string;
}

interface SelectMaterialComponentProps {
    label: string;
    value: number | null;
    options: MaterialOption[];
    disabled?: boolean;
    onChange: (value: number | null) => void;
    helperText?: string;
    error?: boolean;
}

export const SelectMaterialComponent = ({
    label,
    value,
    options,
    disabled = false,
    onChange,
    helperText,
    error
}: SelectMaterialComponentProps) => {

    const selectedOption = options.find((opt) => opt.id === value) || null;

    return (
        <Autocomplete
            disabled={disabled}
            options={options}
            value={selectedOption}
            onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: MaterialOption | null) =>
                onChange(newValue ? newValue.id : null)
            }
            isOptionEqualToValue={(option, val) => option.id === val.id}
            getOptionLabel={(option) => option.name || ""}
            renderOption={(props, option) => (
                <Box component="li" {...props} key={option.id}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label || "Seleccionar"}
                    size="small"
                    error={error}
                    helperText={helperText}
                />
            )}
            clearOnEscape
        />
    );
};
