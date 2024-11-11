import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  InputGroupProps,
  InputProps,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { PiMagnifyingGlass } from "react-icons/pi";

interface Props {
  group: InputGroupProps;
  input: InputProps;
}

export const Search = ({ group, input }: Props) => {
  return (
    <InputGroup {...group}>
      <Input {...input} pr="4.5rem" />
      <InputRightElement
        w="4.5rem"
        borderLeft="1px solid"
        borderColor="blackAlpha.300"
      >
        <IconButton
          icon={
            <Icon as={PiMagnifyingGlass} boxSize="5" color="blackAlpha.700" />
          }
          aria-label="Search"
          variant={"unstyled"}
          justifyContent={"center"}
          alignItems={"center"}
          display={"flex"}
        />
      </InputRightElement>
    </InputGroup>
  );
};
