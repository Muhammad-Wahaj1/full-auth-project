import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

import DashboardIcon from '@mui/icons-material/Dashboard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsIcon from '@mui/icons-material/Settings';

export default function MainLayout() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const menuItems = ['Dashboard', 'Manage Tasks', 'Settings'];
    const icons = [<DashboardIcon />, <AddTaskIcon />, <SettingsIcon />];

    const DrawerList = (
        <Box sx={{ mt: '1.5rem' }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {menuItems.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>{icons[index]}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Box>
    );

    return (
        <>
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: "block", md: "none" } }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: 225,
                        boxSizing: "border-box",
                    },
                }}
            >
                {DrawerList}
            </Drawer>

            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: 225,
                        boxSizing: "border-box",
                    },
                }}
                open
            >
                {DrawerList}
            </Drawer>

            <Box sx={{ ml: { md: "250px" } }}>
                <Outlet />
            </Box>
        </>
    );
}
