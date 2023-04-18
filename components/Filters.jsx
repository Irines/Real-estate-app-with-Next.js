import { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import notFound from "../assets/images/not-found.svg";

export default function Filters() {
  const [filters, setFilters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState();
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState({});
  const router = useRouter();

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    });
    setLastQuery(query);
    router.push({ pathname: path, query: query });
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(
          `${baseUrl}/auto-complete?query=${searchTerm}`
        );
        setLoading(false);
        setLocationData(data?.hits);
      };
      fetchData();
      
    } else {
      if ("locationExternalIDs" in lastQuery) {
        let updatedQuery = {...lastQuery};
        delete updatedQuery["locationExternalIDs"]; 
        router.push({ pathname: "/search", query: updatedQuery });
        setLastQuery(updatedQuery);
      }
    }
  }, [searchTerm]);

  return (
    <>
      <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Select
              onChange={(e) =>
                searchProperties({ [filter.queryName]: e.target.value })
              }
              placeholder={filter.placeholder}
              w="fit-content"
              p="2"
            >
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
      <Flex flexDir="row">
        <Button
          onClick={() => setShowLocations(!showLocations)}
          border="1px"
          borderColor="gray.200"
          marginTop="2"
          width="200px"
        >
          Search By Location
        </Button>
        {showLocations && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            <Input
              placeholder="Enter search string"
              variant="flushed"
              marginLeft="5"
              value={searchTerm}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}
            {loading && <Spinner margin="auto" marginTop="3" />}
            {showLocations && (
              <Box height="300px" overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setShowLocations(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}
                {!loading && !locationData?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                  >
                    <Image
                      height="200"
                      weight="200"
                      alt="no result"
                      src={notFound}
                    />
                    <Text fontSize="lg" marginTop="3">
                      Enter search string
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
}
