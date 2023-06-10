import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';

const baseUrl = `https://travel-backend-app.onrender.com`;
const defaultUrl = `${baseUrl}/api`;
const delUrl = `${defaultUrl}/travel`;

export default function Card({name,email,destination,no_of_travellers,budget_per_person,_id,handleLoad}) {
      const toast = useToast();
    const handleDelete = async () =>{
        try {
            const apiResponse = await fetch(`${delUrl}/${_id}`,{
                "method": "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            });
            const response = await apiResponse.json();

            if(apiResponse.status === 202){
                handleLoad()
                toast({
                    title: "Data Deleted.",
                    description: "New Data Updated",
                    status: "success",
                    duration: 2000,
                    isClosable: true,
                  });
            }else{
                toast({
                    title: `Invalid response`,
                    status: `error`,
                    isClosable: true,
                  });
            }
        } catch (error) {
            toast({
                title: `Internal Error`,
                description: `HTTP 500`,
                status: `error`,
                isClosable: true,
              });
        }
    }
    return (
      <Center py={6}>
        <Box
          maxW={'270px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'md'}
          overflow={'hidden'}>
          <Image
            h={'120px'}
            w={'full'}
            src={
              'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
            }
            objectFit={'cover'}
          />
          <Flex justify={'center'} mt={-12}>
            <Avatar
              size={'xl'}
              src={
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
              }
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
              <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                {name}
              </Heading>
              <Text color={'gray.500'}>{email}</Text>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{no_of_travellers}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  No_Of_Travellers
                </Text>
              </Stack>
              <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{budget_per_person}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  budget_per_person
                </Text>
              </Stack>
            </Stack>
            <Stack spacing={0} align={'center'}>
                <Text fontWeight={600}>{destination}</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Destination
                </Text>
              </Stack>

  
            <Button
              w={'full'}
              mt={8}
              bg={useColorModeValue('red', 'gray.900')}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              onClick={handleDelete}
              >
              Delete
            </Button>
          </Box>
        </Box>
      </Center>
    );
  }