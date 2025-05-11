import ErrorImg from '@/assets/svg/WIP-ilu.svg';
import { Button, Image, Stack, Text } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

const WIPPage: React.FC = () => {
  return (
    <Stack align='center' 
      w="calc(100dvw - var(--app-shell-navbar-offset, 0rem) - var(--app-shell-padding))"
      // mah="calc(100dvh - var(--app-shell-header-offset, 0rem) - var(--app-shell-padding))"
      pt="2rem"
    >
      <Image mah={400} alt="Work in progress" fit='contain' src={ErrorImg}/>
      <Text c="dimmed" ta="center">This content is under development</Text>
      <Link to="/">
        <Button>Back to Home</Button>
      </Link>
    </Stack>
  );
};

export default WIPPage;
