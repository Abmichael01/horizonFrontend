import { BoxProps, Flex, Text } from '@chakra-ui/react'
import { TbFileOff } from 'react-icons/tb'

export default function NoDataFound({ text, ...rest }: BoxProps & { text?: string }) {
  return (
    <Flex { ...rest } align="center" justify="center" direction="column" gap={4} py="10" >
        <TbFileOff size={80} color="#cbd5e0" />
        <Text color={"gray.400"} textAlign={"center"} fontSize={[ "sm", "lg"]} maxW={"lg"}>{text ? text : "Opps..., No data found"}</Text>
    </Flex>
  )
}
