import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
const Home = () => {
  return (
    <>
      <Menu>
        <MenuButton>Applicant Home</MenuButton>
        <MenuList>
          <Link to="/mba_admission/apply">
            <MenuItem>Apply</MenuItem>
          </Link>
          <Link to="/mba_admission/instructions">
            <MenuItem>Instruction</MenuItem>
          </Link>
          <Link to="/mba_admission/register_complaint">
            <MenuItem>Register Payment Complaint</MenuItem>
          </Link>
          <Link to="/mba_admission/track_complaint">
            <MenuItem>Track Complaint</MenuItem>
          </Link>
        </MenuList>
      </Menu>
      <Text>some important dates and deadlines regarding application</Text>
    </>
  );
};

export default Home;
