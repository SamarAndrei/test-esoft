import { Box, IconButton, Link } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Socials = () => {
    return (
        <Box sx={{ marginBottom: 1 }}>
            <Link href="https://t.me/dirtymonke" color="inherit">
                <IconButton
                    size="large"
                    aria-label="telegram"
                    aria-haspopup="false"
                    color="inherit"
                >
                    <TelegramIcon />
                </IconButton>
            </Link>
            <Link href="https://github.com/SamarAndrei" color="inherit">
                <IconButton
                    size="large"
                    aria-label="github"
                    aria-haspopup="false"
                    color="inherit"
                >
                    <GitHubIcon />
                </IconButton>
            </Link>
        </Box>
    );
};

export default Socials;