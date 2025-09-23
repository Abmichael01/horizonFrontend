import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router";

interface Props {
  data: {
    title: string;
    url: string;
    subUrls: {
      name: string;
      url: string;
    }[];
  };
}

export default function DropDown({ data }: Props) {
    const { url, title, subUrls } = data
  return (
    <Box position="relative" py={4} role="group" className="group cursor-pointer" px={3}  zIndex={99}>
      <Link to={url}>
        <Text className="cursor-pointer" fontWeight={500} _groupHover={{ color: "primary.500" }}>{title}</Text>
      </Link>
      <Box
        position={"absolute"}
        left={0}
        top={"calc(100% + 10px)"}
        minW={200}
        textWrap={"nowrap"}
        bg="white"
        border={"1px solid"}
        borderColor={"border"}
        className="shadow-xl hover:h-fit"
        overflow={"hidden"}

        h={0}
        w={0}
        opacity={0}
        _groupHover={{ h: "auto", w: "auto", top: "100%", opacity: 1,  }}
        transition={"top .3s "}
        transitionDelay={".1"}
        

        
      >
        {subUrls?.map((data, index) => (
          <Link key={index} to={data.url}>
            <Text
              px={5}
              py={3}
              borderBottom={"1px solid"}
              borderColor={"border"}
              className="hover:bg-blue-50"
            >
              {data.name}
            </Text>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
