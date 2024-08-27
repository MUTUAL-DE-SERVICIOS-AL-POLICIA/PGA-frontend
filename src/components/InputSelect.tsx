import { Button, Chip, Typography } from '@mui/material';
import React from 'react';

interface Item {
    id: number;
    name: string;
}

interface elementsProps {
    label?: string;
    title: string;
    onPressed: React.MouseEventHandler<HTMLButtonElement>;
    items?: Item[];
    color?: string;
    onRemove?: (value: number) => void;
    error?: boolean;
    helperText?: string;
}

export const ComponentInputSelect = React.memo((props: elementsProps) => {
    const {
        label = '',
        title,
        onPressed,
        items = [],
        color,
        onRemove,
        error = false,
        helperText,
    } = props;

    return (
        <>
            <div style={{ position: 'relative', paddingTop: '5px', marginBottom: '10px' }}>
                <span
                    style={{
                        position: 'absolute',
                        top: -8,
                        left: 2,
                        backgroundColor: '#f2f2f2',
                        padding: '2px',
                        zIndex: 1,
                        fontSize: '0.9rem'
                    }}
                >
                    {label}
                </span>
                <Button
                    variant="outlined"
                    onClick={onPressed}
                    style={{
                        width: '100%',
                        paddingTop: '5px',
                        paddingBottom: '5px',
                        color: 'black',
                        borderColor: error ? 'red' : 'black',
                        textTransform: 'none',
                        zIndex: 0,
                        backgroundColor: color
                    }}
                >
                    {title}
                </Button>
            </div>
            {
                items.length > 0 ?
                    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '8px' }}>
                        {[...items].map((data) => (
                            <Chip
                                key={data.id}
                                color="primary"
                                label={data.name}
                                style={{ margin: '1px' }}
                                onDelete={() => onRemove?.(data.id)}
                            />
                        ))}
                    </div>
                    : null
            }
            {error && (
                <Typography style={{ color: 'red', fontSize: '0.8rem', padding: '2px' }}>
                    {helperText}
                </Typography>
            )}
        </>
    );
});
