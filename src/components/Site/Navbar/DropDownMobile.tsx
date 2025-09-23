import { Box, Accordion, Span } from "@chakra-ui/react";
import { Link } from "react-router-dom";

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

export default function DropDownMobile({ data }: Props) {
  const { url, title, subUrls } = data;

  return (
    <Box position="relative" py={4} px={3} zIndex={99} w="full">
      <Accordion.Root collapsible>
        <Accordion.Item value={title}>
          <Accordion.ItemTrigger>
            <Span flex="1">
              <Link to={url}>{title}</Link>
            </Span>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {subUrls.map((item, index) => (
              <Link to={item.url} key={index}>
                <Accordion.ItemBody>{item.name}</Accordion.ItemBody>
              </Link>
            ))}
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    </Box>
  );
}
