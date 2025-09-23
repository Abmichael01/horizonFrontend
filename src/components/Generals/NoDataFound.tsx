import { BoxProps, Flex, Text } from '@chakra-ui/react'
import { FaBoxOpen } from 'react-icons/fa'

export default function NoDataFound({ text, ...rest }: BoxProps & { text?: string }) {
  return (
    <Flex { ...rest } align="center" justify="center" direction="column" gap={4} py="10" >
        <FaBoxOpen size={100} color="border" fill='#ccc' />
        <Text color={"gray.400"} textAlign={"center"} fontSize={[ "sm", "lg"]} maxW={"lg"}>{text ? text : "Opps..., No data found"}</Text>
    </Flex>
  )
}
