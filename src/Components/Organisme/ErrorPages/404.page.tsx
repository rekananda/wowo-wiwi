import ErrorImg from '@/assets/svg/404-ilu.svg';
import { Button, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

const Error404Page: React.FC = () => {
  return (
    <Stack align='center' w="100dvw" h="100dvh" pt="2rem">
      <Image mah={400} alt="error" fit='contain' src={ErrorImg}/>
      <Text c="dimmed" ta="center">The page you're looking for doesn't exist.</Text>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </Stack>
  );
};

export default Error404Page;
