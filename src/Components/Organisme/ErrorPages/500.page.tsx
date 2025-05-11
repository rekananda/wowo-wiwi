import ErrorImg from '@/assets/svg/500-ilu.svg';
import { Button, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Error500Page: React.FC = () => {
  return (
    <Stack align='center' w="100dvw" h="100dvh" pt="2rem">
      <Image mah={400} alt="error" fit='contain' src={ErrorImg}/>
      <Text c="dimmed" ta="center">Something went wrong on the server. Please try again later.</Text>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </Stack>
  );
};

export default Error500Page;
