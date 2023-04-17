import { Box, Flex, Select } from "@chakra-ui/react";
import { useState } from "react";
import { filterData, getFilterValues } from "../utils/filterData";
import { useRouter } from "next/router";

const Filters = () => {
  const [filters, setFilters] = useState(filterData);
  const router = useRouter();
  const searchProperties = (filterValues) => {
  const path = router.pathname;
  const { query } = router;

    const values = getFilterValues(filterValues);

    console.log("query before", query);
    
    values.forEach((item) => {
        console.log("item.name, item.value", item.name, item.value);
      query[item.name] = item.value;
    });

    router.push({ pathname: path, query });
    console.log("query after", query);
  };

  return (
    <Flex bg="gray.100" p="4" flexWrap="wrap" justifyContent="center">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
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
  );
};

export default Filters;
