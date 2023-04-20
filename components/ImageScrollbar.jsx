import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import Image from "next/legacy/image";
import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import usePreventBodyScroll from "@/utils/usePreventBodyScroll";

function onWheel(apiObj, ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

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

const ImageScrollbar = ({ data }) => {
  const { disableScroll, enableScroll } = usePreventBodyScroll();
  return (
    <Box onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
      <ScrollMenu
        RightArrow={RightArrow}
        LeftArrow={LeftArrow}
        onWheel={onWheel}
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
    </Box>
  )
};

export default ImageScrollbar;
