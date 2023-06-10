import Navbar from "../components/NavBar";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
const baseUrl = `https://travel-backend-app.onrender.com`;
const defaultUrl = `${baseUrl}/api`;
const postUrl = `${defaultUrl}/travel`;

const Post = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [no_of_travellers, setNo_of_travellers] = useState("");
  const [budget_per_person, setBudget_per_person] = useState(0);
  const toast = useToast();

  const handleSubmit = () => {
    const payload = {
      name,
      email,
      destination,
      no_of_travellers,
      budget_per_person,
    };
    postData(payload);
  };

  const postData = async (payload) => {
    try {
      const apiResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await apiResponse.json();

      if (apiResponse.status === 201) {
        toast({
          title: "Data Posted.",
          description: responseData,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        removeInputs();
      } else {
        removeInputs();
        toast({
          title: `Invalid response`,
          status: `error`,
          isClosable: true,
        });
      }
    } catch (error) {
      removeInputs();
      toast({
        title: `Internal Error`,
        description: `HTTP 500`,
        status: `error`,
        isClosable: true,
      });
    }
  };

  function removeInputs() {
    setName("");
    setEmail("");
    setDestination("");
    setNo_of_travellers("");
    setBudget_per_person("");
  }

  return (
    <div>
      <Navbar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Travel Form
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel> Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={name}
                      placeholder="Enter Name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>No . of Travellers</FormLabel>
                    <Input
                      type="number"
                      name="travellers"
                      value={no_of_travellers}
                      placeholder="Enter No of Travellers"
                      onChange={(e) => {
                        setNo_of_travellers(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Destination</FormLabel>
                <select
                  name="destination"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                >
                  <option value="">Pls Select Destination</option>
                  <option value="India">India</option>
                  <option value="Africa">Africa</option>
                  <option value="Europe">Europe</option>
                  <option value="America">America</option>
                </select>
              </FormControl>
              <FormControl id="lastName">
                <FormLabel>Budget per person</FormLabel>
                <Input
                  type="number"
                  name="budget"
                  value={budget_per_person}
                  placeholder="Budget per person"
                  onChange={(e) => {
                    setBudget_per_person(e.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Post;
