import { Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import { ReturnButton } from '@/components/ReturnButton';

export const FootyEvent = () => {
  return (
    <Flex flexDir="column" gap="3rem" mt="2rem">
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={1}>
          <ReturnButton />
        </GridItem>
        <GridItem colSpan={3} display="flex" alignItems="center" justifyContent="center">
          <Text fontWeight="bold" fontSize="lg">
            Pelada
          </Text>
        </GridItem>
        <GridItem />
      </Grid>
    </Flex>
  );
};
