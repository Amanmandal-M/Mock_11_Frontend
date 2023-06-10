import React, { useState } from "react";
import Navbar from "../components/NavBar";
import { useEffect } from "react";
import Card from "../components/Card";
import { Flex } from "@chakra-ui/react";

const baseUrl = `https://travel-backend-app.onrender.com`;
const defaultUrl = `${baseUrl}/api`;
const getUrl = `${defaultUrl}/travel`;

const Home = () => {
  const [data, setData] = useState([]);
  const [load,setLoad] = useState(false)

  const handleLoad = () =>{
    setLoad(!load)
  }

  const GetData = async () => {
    try {
      const apiResponse = await fetch(getUrl);
      const response = await apiResponse.json();

      if (apiResponse.status == 200) {
        setData(response)
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    GetData();
  }, [load]);
  return (
    <div>
      <Navbar />
      <Flex wrap={'wrap'} width={'90%'} margin={'auto'} gap={5}>
      {data.map((item)=>(<Card key={item._id}  {...item} handleLoad={handleLoad} />))}
      </Flex>
    </div>
  );
};

export default Home;
