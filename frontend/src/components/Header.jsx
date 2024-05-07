import React from "react";
import logo from "../assets/logo.png";
import { Image, Text, VStack, Flex } from "@chakra-ui/react";
const Header = () => {
  return (
    <div>
      <Flex>
        <Image src={logo} boxSize="100px" />
        <VStack>
          <Text>भारतीय प्रौद्योगिकी संस्थान (भारतीय खनि विद्यापीठ), धनबाद</Text>
          <Text>
            INDIAN INSTITUTE OF TECHNOLOGY (INDIAN SCHOOL OF MINES), DHANBAD
            Department of Management Studies and Industrial Engineering, IIT
            (ISM), Dhanbad
          </Text>
        </VStack>
      </Flex>
    </div>
  );
};

export default Header;
