import React from "react";
import { Button } from "@chakra-ui/react";
const Logout = () => {
  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
