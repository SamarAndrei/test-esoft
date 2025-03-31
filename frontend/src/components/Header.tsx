import React from 'react';
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Toolbar,
    Typography,
    Link,
} from '@mui/material';
import useCheckAuth from "../hooks/useCheckAuth.ts";
import CreateTaskButton from "./CreateTaskButton.tsx";

const Header = React.memo(() => {
    const store = useCheckAuth();

    return (
        <header>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed">
                    <Container fixed>
                        <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Link href="/" color="inherit" underline="none">
                                <Typography variant="h6">TODO list</Typography>
                            </Link>

                            {store!.isLoading === false ? (
                                store!.role === "Руководитель" && <CreateTaskButton/>
                            ) : (
                                <Typography>wait a second</Typography>
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
        </header>
    );
});

export default Header;