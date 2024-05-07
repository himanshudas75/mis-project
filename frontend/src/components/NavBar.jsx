import React from "react";
import { Flex, Box, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const navItems = [
  { key: "HOME", route: "/" },
  { key: "HOW TO APPLY", route: "#" },
  { key: "INFORMATION BROCHURE", route: "#" },
  { key: "PROGRAMME ELIGIBILITY", route: "#" },
  { key: "SEAT MATRIX", route: "#" },
  { key: "IMPORTANT DATES", route: "#" },
  { key: "SELECTION PROCEDURE", route: "#" },
  { key: "CONTACT US", route: "#" },
  { key: "LOGIN", route: "/login" },
  { key: "LOGIN", route: "/login" },
];
const NavBar = () => {
  return (
    <Flex
      align="center"
      justify="space-between"
      padding="1rem"
      bg="blue.500"
      color="white"
      fontSize="medium"
    >
      <Box>
        <Link
          to="/"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          HOME
        </Link>
      </Box>
      <Spacer />
      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          HOW TO APPLY
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          INFORMATION BROCHURE
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          PROGRAMME ELIGIBILITY
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          APPLICATION FEES
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          SEAT MATRIX
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          IMPORTANT DATES
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          SELECTION PROCEDURE
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="#"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          CONTACT US
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="/login"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1 mr-3 ml-1"
        >
          LOGIN
        </Link>
      </Box>
      <Spacer />

      <Box>
        <Link
          to="/register"
          className="hover:bg-white focus:bg-white focus:text-blue-500 focus:p-1"
        >
          REGISTRATION
        </Link>
      </Box>
      <Spacer />
    </Flex>
  );
};

export default NavBar;
