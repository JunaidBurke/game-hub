import { Box, Text, Heading } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={5}>
        <Heading>Ooops</Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "This page doesn't exist"
            : "An unexpected error occurred"}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;