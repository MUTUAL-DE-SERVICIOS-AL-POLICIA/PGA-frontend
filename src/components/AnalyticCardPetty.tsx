import { FC } from 'react';
import { MainCard } from './MainCard';
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';
import { Chip, Grid, Stack, Typography } from '@mui/material';

interface AnalyticEcommerceProps {
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; // Definir colores posibles
    title: string;
    count: string;
    percentage?: number;
    isLoss?: boolean;
    extra: string;
}

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

const AnalyticCardPetty: FC<AnalyticEcommerceProps> = ({
    color = 'primary',
    title,
    count,
    percentage,
    isLoss,
}) => {
    return (
        <MainCard contentSX={{ p: 2.25 }}>
            <Stack spacing={0.5}>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="h4" color="inherit" textAlign="center">
                            {count}
                        </Typography>
                    </Grid>
                    {percentage && (
                        <Grid item>
                            <Chip
                                variant="filled"
                                color={color}
                                icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                                label={`${percentage}%`}
                                sx={{ ml: 1.25, pl: 1 }}
                                size="small"
                            />
                        </Grid>
                    )}
                </Grid>
            </Stack>

        </MainCard>
    );
};

export default AnalyticCardPetty;
