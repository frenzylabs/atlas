import React from 'react';

import {
  HStack,
  VStack,
  Box
} from '@chakra-ui/react';

import Nav from './nav';

const Component = ({children}) => {
  return (
    <HStack flex={1} h='100vh' align='flex-start' isInline spacing={0}>
      <Nav/>
      <VStack h='100%' align='flex-start' flex={1} p={0} m={0}>

        <Box flex={1} w="100%" maxHeight="100%">
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}

export default Component;