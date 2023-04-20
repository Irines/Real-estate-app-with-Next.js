import notFound from "../assets/images/not-found.svg";
import Property from "@/components/Property";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Image from 'next/legacy/image';
import { BsFilter } from "react-icons/bs";
const { default: Filters } = require("@/components/Filters");
const { Flex, Text, Icon, Box } = require("@chakra-ui/react");
const { useRouter } = require("next/router");
const { useState } = require("react");

const Search = ({properties}) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="medium"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingleft="2" w="7" as={BsFilter}></Icon>
      </Flex>
      {searchFilters && <Filters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap" justifyContent="center">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginBottom="5"
          marginTop="5"
        >
          <Image height="200" weight="200" alt="no result" src={notFound} />
          <Text fontSize="2xl" marginTop="3"></Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps ({query}) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}


