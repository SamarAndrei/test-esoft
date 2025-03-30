import {
    Container,
    Divider,
} from '@mui/material';
import Socials from './Socials';
import React from 'react';

const Footer = React.memo(() => {
    return (
        <footer>
            <Divider sx={{ marginTop: 4 }} />
            <Container fixed sx={{ marginTop: 4 }}>
                <Socials />
            </Container>
        </footer>
    );
});

export default Footer;