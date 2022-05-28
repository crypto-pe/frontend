import {
  Box,
  HStack,
  RadioProps,
  useRadio,
  useRadioGroup
} from "@chakra-ui/react";
import React from "react";

interface RadioCard extends RadioProps {
  children: React.ReactNode;
}

// 1. Create a component that consumes the `useRadio` hook
const RadioCard: React.FC<RadioCard> = props => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "primary.500",
          color: "white",
          borderColor: "primary.500"
        }}
        _focus={{
          boxShadow: "outline red",
          outlineColor: "primary.600"
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
export const SelectToken: React.FC = () => {
  const options = ["USDC", "DAI"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "stable-coin",
    defaultValue: "USDC",
    onChange: console.log
  });

  const group = getRootProps();

  return (
    <HStack {...group}>
      {options.map(value => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
};
