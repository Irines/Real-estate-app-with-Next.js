import Image from "next/image";
import defaultImage from "../assets/images/default-rent.jpg";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
const { default: Link } = require("next/link");
import { GoVerified } from "react-icons/go";
import { BsGridFill } from "react-icons/bs";
import { FaBed, FaBath } from "react-icons/fa";
import millify from "millify";

const preloadedImage =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNTYuODcgMjUuOTgxTDUwLjI3IDIxLjAzMUw0Ny4yNyAxOC43ODFMMzUuNTcgMTAuMDAxQzM0LjQ0MjMgOS4xNjMyNyAzMy4wNzQ4IDguNzEwOTQgMzEuNjcgOC43MTA5NEMzMC4yNjUyIDguNzEwOTQgMjguODk3NyA5LjE2MzI3IDI3Ljc3IDEwLjAwMUwyMS42NyAxNC41ODFWMTQuMzcxQzIxLjY2ODQgMTMuODQxMSAyMS40NTcyIDEzLjMzMzMgMjEuMDgyNSAxMi45NTg2QzIwLjcwNzcgMTIuNTgzOCAyMC4xOTk5IDEyLjM3MjYgMTkuNjcgMTIuMzcxSDEyLjQ3QzExLjkzOTYgMTIuMzcxIDExLjQzMDkgMTIuNTgxNyAxMS4wNTU4IDEyLjk1NjhDMTAuNjgwNyAxMy4zMzE5IDEwLjQ3IDEzLjg0MDYgMTAuNDcgMTQuMzcxVjIzLjE2MUw2LjQ0MDAyIDI2LjI5MUM2LjIzMjI3IDI2LjQ1MjQgNi4wNTgzOCAyNi42NTMxIDUuOTI4MzMgMjYuODgxN0M1Ljc5ODI3IDI3LjExMDMgNS43MTQ1OSAyNy4zNjI0IDUuNjgyMDggMjcuNjIzNEM1LjY0OTU3IDI3Ljg4NDQgNS42Njg4OCAyOC4xNDkzIDUuNzM4ODcgMjguNDAyOEM1LjgwODg3IDI4LjY1NjQgNS45MjgxOSAyOC44OTM2IDYuMDkwMDEgMjkuMTAxQzYuMjc2IDI5LjM0MjcgNi41MTU0NiAyOS41MzggNi43ODk2IDI5LjY3MTZDNy4wNjM3MyAyOS44MDUyIDcuMzY1MDUgMjkuODczNCA3LjY3IDI5Ljg3MUM4LjExMjExIDI5Ljg3MDkgOC41NDE1MiAyOS43MjMxIDguODkgMjkuNDUxTDEwLjQ3IDI4LjIzMVY0OC4yODFDMTAuNDcxNiA1MC4wMDQ0IDExLjE1NjkgNTEuNjU2OCAxMi4zNzU2IDUyLjg3NTVDMTMuNTk0MiA1NC4wOTQxIDE1LjI0NjYgNTQuNzc5NCAxNi45NyA1NC43ODFIMjUuNkMyNS45NTk0IDU0Ljc4MDggMjYuMzEyMSA1NC42ODMxIDI2LjYyMDMgNTQuNDk4MUMyNi45Mjg1IDU0LjMxMzIgMjcuMTgwNyA1NC4wNDgxIDI3LjM1IDUzLjczMUMyNy41MTQyIDUzLjQ0MTMgMjcuNjAwMyA1My4xMTQgMjcuNiA1Mi43ODFDMjcuNjAxNyA1Mi43MTA5IDI3LjU5ODMgNTIuNjQwNyAyNy41OSA1Mi41NzFWNDYuODUxQzI3LjU5MTYgNDUuNzcwMyAyOC4wMjIzIDQ0LjczNDUgMjguNzg3NCA0My45NzEzQzI5LjU1MjUgNDMuMjA4MSAzMC41ODkzIDQyLjc3OTkgMzEuNjcgNDIuNzgxQzMyLjc0OTEgNDIuNzgyMSAzMy43ODM3IDQzLjIxMTIgMzQuNTQ2OCA0My45NzQyQzM1LjMwOTggNDQuNzM3MyAzNS43Mzg5IDQ1Ljc3MTkgMzUuNzQgNDYuODUxVjUyLjc4MUMzNS43Mzk3IDUzLjExNCAzNS44MjU5IDUzLjQ0MTMgMzUuOTkgNTMuNzMxQzM2LjE2MjQgNTQuMDQ3NyAzNi40MTY3IDU0LjMxMjIgMzYuNzI2MyA1NC40OTY5QzM3LjAzNTkgNTQuNjgxNiAzNy4zODk1IDU0Ljc3OTcgMzcuNzUgNTQuNzgxSDQ2LjM3QzQ4LjA5MjkgNTQuNzc3NiA0OS43NDQyIDU0LjA5MTcgNTAuOTYyNCA1Mi44NzM0QzUyLjE4MDcgNTEuNjU1MiA1Mi44NjY2IDUwLjAwMzkgNTIuODcgNDguMjgxVjI3Ljk4MUw1NC40NyAyOS4xODFDNTQuODEyOSAyOS40Mzk4IDU1LjIzMDUgMjkuNTgwMSA1NS42NiAyOS41ODFDNTUuOTcxOCAyOS41ODAyIDU2LjI3OTIgMjkuNTA3NiA1Ni41NTg0IDI5LjM2ODlDNTYuODM3NiAyOS4yMzAxIDU3LjA4MSAyOS4wMjkgNTcuMjcgMjguNzgxQzU3LjU4ODMgMjguMzU2NyA1Ny43MjQ5IDI3LjgyMzMgNTcuNjQ5OSAyNy4yOTgyQzU3LjU3NDkgMjYuNzczMSA1Ny4yOTQ0IDI2LjI5OTMgNTYuODcgMjUuOTgxWiIgZmlsbD0iIzk5OTk5OSIvPg0KPC9zdmc+";

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
    isVerified,
    externalID,
  },
}) => (
  <Link href={`property/${externalID}`} passHref>
    <Flex
      flexWrap="wrap"
      w={[360, 420, 420]}
      p="5"
      paddingTop="0"
      justifyContent="flex-start"
      cursor="pointer"
    >
      <Box h="260px" w={[360, 400, 400]}>
        <Image
          src={coverPhoto ? coverPhoto.url : defaultImage}
          placeholder="blur"
          blurDataURL={preloadedImage}
          width="400"
          height="260"
          alt="apartment photo"
          style={{ objectFit: "cover", height: "260px", width: "400px" }}
          sizes="(max-width:390px) 360px, (max-width:1024px) 400px, 400px"
        ></Image>
      </Box>
      <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
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
