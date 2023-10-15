import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Dashboard, AccountCircle } from '@mui/icons-material';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link} from 'react-router-dom';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemove from '@mui/icons-material/PersonRemove';
import axios from 'axios';
const API = "https://dh-backend-fr-fd4331759334.herokuapp.com"
const Sidebar = () => {
    const signout = async () => {
        await axios.post(API + '/auth/logout');
        localStorage.clear();
        console.log(localStorage.getItem('user')) // should be null 
        console.log(localStorage.getItem("access_token")) // should also be null
    }
  return (
    <Drawer variant="permanent">
      <List>
      <ListItem >
            <ListItemButton component={Link} to={'/dashboard'}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItemButton>
        </ListItem>
        <ListItem >
            <ListItemButton component={Link} to={'/createform'} >
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
            <ListItemText primary="Create Form" />
            </ListItemButton>
        </ListItem>
        <ListItem >
            <ListItemButton component={Link} to={'/viewform'}>
                <ListItemIcon>
                    <DescriptionIcon />
                </ListItemIcon>
            <ListItemText primary="View Past Forms" />
            </ListItemButton>
        </ListItem>
        {/* <ListItem >
            <ListItemButton component={Link} to={'/settings'}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
            <ListItemText primary="Settings" />
            </ListItemButton>
        </ListItem> */}
        <ListItem >
            <ListItemButton component={Link} to={'/invite'}>
                <ListItemIcon>
                    <PersonAddAlt1Icon />
                </ListItemIcon>
            <ListItemText primary="New Employee" />
            </ListItemButton>
        </ListItem>
        <ListItem >
            <ListItemButton component={Link} onClick={signout} to={'/'}>
                <ListItemIcon>
                    <PersonRemove />
                </ListItemIcon>
            <ListItemText primary="Sign Out" />
            </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;