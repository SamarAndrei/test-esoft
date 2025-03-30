import { Button, Typography, styled } from '@mui/material';

const NotFoundContainer = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(40),
}));

const NoMatchPage = () => {
    return (
        <main>
            <NotFoundContainer>
                <Typography variant="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Страница не найдена
                </Typography>
                <Button href="/" variant="outlined" color="error">
                    Вернуться на главную
                </Button>
            </NotFoundContainer>
        </main>
    );
};

export default NoMatchPage;