import React from 'react';
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Select,
    Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const { auth } = useAuth();
    return (
        <>
            <Menu>
                <MenuButton as={Button}>Applicant Home</MenuButton>
                <MenuList>
                    <Link to="/apply">
                        <MenuItem>Start Application</MenuItem>
                    </Link>
                    <Link to="/instructions">
                        <MenuItem>Instruction</MenuItem>
                    </Link>
                    <Link to="/register_complaint">
                        <MenuItem>Register Payment Complaint</MenuItem>
                    </Link>
                    <Link to="/track_complaint">
                        <MenuItem>Track Complaint</MenuItem>
                    </Link>
                    {auth.courses.length > 0 ? (
                        <Link to="/details">
                            <MenuItem>Start filling form</MenuItem>
                        </Link>
                    ) : (
                        ''
                    )}
                </MenuList>
            </Menu>
            <Text>
                some important dates and deadlines regarding application
            </Text>
        </>
    );
};

export default Home;
