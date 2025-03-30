import { Grid, Typography } from '@mui/material';
import React from 'react';

interface FallbackProps {
    error: Error;
}

const Fallback: React.FC<FallbackProps> = ({
                                               error /** тут еще функцию ресета можно заюзать*/,
                                           }) => {
    return (
        <div role="alert">
            <Grid container justifyContent="center" mt={4}>
                <Typography>Something went wrong:</Typography>
                <pre style={{ color: 'red' }}>{error.message}</pre>
            </Grid>
        </div>
    );
};

export { Fallback };