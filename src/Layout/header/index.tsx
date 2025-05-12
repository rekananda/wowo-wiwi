import { AppShellHeader, Group, Image } from "@mantine/core";

const MainHeader = () => {
  // const { user, loading } = useAppSelector((state) => state.global);

  return (
    <AppShellHeader
      px={{ base: 16, md: 32, lg: 50 }} 
      py={{ base: 16, md: 8, lg: 24 }}
      bg="primary"
      withBorder={false}
    >
      <Group pos="absolute" right={0} top={0} w="100%" h="100%" justify="center">
        <Image
          h={{ base: 40, md: 40, lg: 56 }} w="auto"
          src="./LOGO/WOWO-WIWI-TYPOGRAPHY.png"
          styles={{
            root: {
              filter: 'brightness(0) invert(1)'
            }
          }}
        />
      </Group>
      {/* <Group h="100%" p={0} wrap='nowrap'>
        <Group className="flex-grow font-body" justify='space-between' wrap='nowrap'>
          <Group gap={12} wrap='nowrap'>
            <ColorSchemeToggler className={classes.buttonHeader} radius="xl" variant="transparent" color="white"/>
          </Group>
          <Group gap={12} wrap='nowrap' pos="relative">
            {loading? 
              <Skeleton height={38} circle/> : 
              <Tooltip label={user?.name} color="gray">
                <Avatar color="white" name={user?.name} radius="xl" />
              </Tooltip>
            }
          </Group>
        </Group>
      </Group> */}
    </AppShellHeader>
  )
}

export default MainHeader