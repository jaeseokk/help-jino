import React from 'react';
import {Box, Spinner} from '@chakra-ui/react';

export interface LoadingLayerProps {}

const LoadingLayer: React.FC<LoadingLayerProps> = ({}) => {
  return (
    <Box
      position={'fixed'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      sx={{
        backgroundColor: 'rgba(15, 22, 36, 0.05)',
        backdropFilter: 'blur(1rem)',
        zIndex: 10,
      }}
    >
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Box>
  );
};

export default LoadingLayer;
