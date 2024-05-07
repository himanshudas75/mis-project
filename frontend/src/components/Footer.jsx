import { Text, Flex, Center } from "@chakra-ui/react";
import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { HStack } from "@chakra-ui/react";
import { IconButton, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box className="w-full sticky bottom-0 text-center bg-blue-500    ">
        <Text className="text-center text-white">
          © Copyright IIT (ISM), Dhanbad
        </Text>
      </Box>
    </div>
  );
};

export default Footer;
