import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import Image from "next/legacy/image";
import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const preloadedImage =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iMTVweCIgaGVpZ2h0PSIxMHB4IiB2aWV3Qm94PSIwIDAgNjQgNjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+DQo8cGF0aCBkPSJNNTYuODcgMjUuOTgxTDUwLjI3IDIxLjAzMUw0Ny4yNyAxOC43ODFMMzUuNTcgMTAuMDAxQzM0LjQ0MjMgOS4xNjMyNyAzMy4wNzQ4IDguNzEwOTQgMzEuNjcgOC43MTA5NEMzMC4yNjUyIDguNzEwOTQgMjguODk3NyA5LjE2MzI3IDI3Ljc3IDEwLjAwMUwyMS42NyAxNC41ODFWMTQuMzcxQzIxLjY2ODQgMTMuODQxMSAyMS40NTcyIDEzLjMzMzMgMjEuMDgyNSAxMi45NTg2QzIwLjcwNzcgMTIuNTgzOCAyMC4xOTk5IDEyLjM3MjYgMTkuNjcgMTIuMzcxSDEyLjQ3QzExLjkzOTYgMTIuMzcxIDExLjQzMDkgMTIuNTgxNyAxMS4wNTU4IDEyLjk1NjhDMTAuNjgwNyAxMy4zMzE5IDEwLjQ3IDEzLjg0MDYgMTAuNDcgMTQuMzcxVjIzLjE2MUw2LjQ0MDAyIDI2LjI5MUM2LjIzMjI3IDI2LjQ1MjQgNi4wNTgzOCAyNi42NTMxIDUuOTI4MzMgMjYuODgxN0M1Ljc5ODI3IDI3LjExMDMgNS43MTQ1OSAyNy4zNjI0IDUuNjgyMDggMjcuNjIzNEM1LjY0OTU3IDI3Ljg4NDQgNS42Njg4OCAyOC4xNDkzIDUuNzM4ODcgMjguNDAyOEM1LjgwODg3IDI4LjY1NjQgNS45MjgxOSAyOC44OTM2IDYuMDkwMDEgMjkuMTAxQzYuMjc2IDI5LjM0MjcgNi41MTU0NiAyOS41MzggNi43ODk2IDI5LjY3MTZDNy4wNjM3MyAyOS44MDUyIDcuMzY1MDUgMjkuODczNCA3LjY3IDI5Ljg3MUM4LjExMjExIDI5Ljg3MDkgOC41NDE1MiAyOS43MjMxIDguODkgMjkuNDUxTDEwLjQ3IDI4LjIzMVY0OC4yODFDMTAuNDcxNiA1MC4wMDQ0IDExLjE1NjkgNTEuNjU2OCAxMi4zNzU2IDUyLjg3NTVDMTMuNTk0MiA1NC4wOTQxIDE1LjI0NjYgNTQuNzc5NCAxNi45NyA1NC43ODFIMjUuNkMyNS45NTk0IDU0Ljc4MDggMjYuMzEyMSA1NC42ODMxIDI2LjYyMDMgNTQuNDk4MUMyNi45Mjg1IDU0LjMxMzIgMjcuMTgwNyA1NC4wNDgxIDI3LjM1IDUzLjczMUMyNy41MTQyIDUzLjQ0MTMgMjcuNjAwMyA1My4xMTQgMjcuNiA1Mi43ODFDMjcuNjAxNyA1Mi43MTA5IDI3LjU5ODMgNTIuNjQwNyAyNy41OSA1Mi41NzFWNDYuODUxQzI3LjU5MTYgNDUuNzcwMyAyOC4wMjIzIDQ0LjczNDUgMjguNzg3NCA0My45NzEzQzI5LjU1MjUgNDMuMjA4MSAzMC41ODkzIDQyLjc3OTkgMzEuNjcgNDIuNzgxQzMyLjc0OTEgNDIuNzgyMSAzMy43ODM3IDQzLjIxMTIgMzQuNTQ2OCA0My45NzQyQzM1LjMwOTggNDQuNzM3MyAzNS43Mzg5IDQ1Ljc3MTkgMzUuNzQgNDYuODUxVjUyLjc4MUMzNS43Mzk3IDUzLjExNCAzNS44MjU5IDUzLjQ0MTMgMzUuOTkgNTMuNzMxQzM2LjE2MjQgNTQuMDQ3NyAzNi40MTY3IDU0LjMxMjIgMzYuNzI2MyA1NC40OTY5QzM3LjAzNTkgNTQuNjgxNiAzNy4zODk1IDU0Ljc3OTcgMzcuNzUgNTQuNzgxSDQ2LjM3QzQ4LjA5MjkgNTQuNzc3NiA0OS43NDQyIDU0LjA5MTcgNTAuOTYyNCA1Mi44NzM0QzUyLjE4MDcgNTEuNjU1MiA1Mi44NjY2IDUwLjAwMzkgNTIuODcgNDguMjgxVjI3Ljk4MUw1NC40NyAyOS4xODFDNTQuODEyOSAyOS40Mzk4IDU1LjIzMDUgMjkuNTgwMSA1NS42NiAyOS41ODFDNTUuOTcxOCAyOS41ODAyIDU2LjI3OTIgMjkuNTA3NiA1Ni41NTg0IDI5LjM2ODlDNTYuODM3NiAyOS4yMzAxIDU3LjA4MSAyOS4wMjkgNTcuMjcgMjguNzgxQzU3LjU4ODMgMjguMzU2NyA1Ny43MjQ5IDI3LjgyMzMgNTcuNjQ5OSAyNy4yOTgyQzU3LjU3NDkgMjYuNzczMSA1Ny4yOTQ0IDI2LjI5OTMgNTYuODcgMjUuOTgxWiIgZmlsbD0iIzk5OTk5OSIvPg0KPC9zdmc+";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1px">
      <Icon
        as={FaArrowAltCircleLeft}
        onClick={() => scrollPrev()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Flex justifyContent="center" alignItems="center" marginRight="1px">
      <Icon
        as={FaArrowAltCircleRight}
        onClick={() => scrollNext()}
        fontSize="2xl"
        cursor="pointer"
      />
    </Flex>
  );
};

const ImageScrollbar = ({ data }) => (
  <ScrollMenu
    RightArrow={RightArrow}
    LeftArrow={LeftArrow}
    style={{ overflow: "hidden" }}
  >
    {data.map((item) => (
      <Box width="920px" key={item.id} itemId={item.id} overflow="hidden" p="1">
        <Image
          alt="property"
          placeholder="blur"
          blurDataURL={item.url}
          src={item.url}
          width="1000"
          height="600"
          style={{ maxHeight: "600px", objectFit: "cover" }}
          sizes="(max-width:500px) 100px, (max-width:1024px) 400px, 1000px"
        />
      </Box>
    ))}
  </ScrollMenu>
);

export default ImageScrollbar;
