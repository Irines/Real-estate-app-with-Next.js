import Image from "next/image";
import defaultImage from "../assets/images/default-rent.jpg";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
const { default: Link } = require("next/link");
import { GoVerified } from "react-icons/go";
import { BsGridFill } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";
import millify from "millify";

const Property = ({
  property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVeryfied,
    externalId,
  },
}) => (
  <Link href={`property/${externalId}`} passHref>
    <Flex
      flexWrap="wrap"
      w="420px"
      p="5"
      paddingTop="0"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box w="400px" h="260px">
        <Image
          src={coverPhoto ? coverPhoto.url : defaultImage}
          width="400"
          height="260"
          alt="apartment photo"
          style={{ objectFit: "cover", height:"260px", width:"400px" }}
        ></Image>
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVeryfied && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
          </Flex>
            <Box>
                <Avatar size="sm" src={agency?.logo?.url}></Avatar>
            </Box>
        </Flex>
      </Box>
      <Box>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Text fontSize="lg">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Text>
      </Box>
    </Flex>
  </Link>
);

export default Property;
