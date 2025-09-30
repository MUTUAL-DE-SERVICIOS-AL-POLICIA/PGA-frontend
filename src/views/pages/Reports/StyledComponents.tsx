// StyledComponents.tsx
import { TableCell, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledHeaderCell = styled(TableCell)({
    backgroundColor: '#0B815A',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '0.75rem',
    border: '1px solid #ddd',
    padding: '2px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '100px',
});

export const StyledDescriptionCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    fontSize: '0.75rem',
    width: '400px',
    maxWidth: '400px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
});

export const StyledBodyCell = styled(TableCell)({
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '100px',
    fontSize: '0.7rem',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
});

export const StyledFooterCell = styled(TableCell)({
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '0.75rem',
    border: '1px solid #ddd',
    backgroundColor: '#e0e0e0',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
});

export const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f5f5f5',
    },
    height: '24px',
});

export const StyledContainer = styled(Paper)({
    margin: '32px 0',
    borderRadius: '4px',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2)',
});
