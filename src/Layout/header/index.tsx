import { AppShellHeader, Avatar, Group, Image, Skeleton } from "@mantine/core";
import ColorSchemeToggler from "@Molecule/Content/ColorSchemeToggler";
import classes from '../style.module.scss';
import { useGetDevice } from "@/hooks/useGetDevice";
import { useSupabaseQuery } from "@/hooks/useSupabaseQuery";
import { BaseUserI } from "@/types/database";
import { getUserbyDeviceId } from "@/utils/queries/users";
import { useEffect } from "react";
const MainHeader = () => {
  const deviceInfo = useGetDevice();
  const { data, loading, executeQuery } = useSupabaseQuery<BaseUserI>();

  const fetchUser = async (deviceId: string) => {
    await executeQuery(() => getUserbyDeviceId(deviceId));
  };

  useEffect(() => {
    if (deviceInfo.deviceId) {
      fetchUser(deviceInfo.deviceId);
    }
  }, [deviceInfo.deviceId]);
  
  return (
    <AppShellHeader
      px={{ base: 16, md: 32, lg: 50 }} 
      py={{ base: 16, md: 8, lg: 24 }}
      bg="primary"
    >
      <Group pos="absolute" right={0} top={0} w="100%" h="100%" justify="center">
        <Image
          h={{ base: 40, md: 40, lg: 56 }}
          src="./LOGO/WOWO-WIWI-TYPOGRAPHY.png"
          styles={{
            root: {
              filter: 'brightness(0) invert(1)'
            }
          }}
        />
      </Group>
      <Group h="100%" p={0} wrap='nowrap'>
        <Group className="flex-grow font-body" justify='space-between' wrap='nowrap'>
          <Group gap={12} wrap='nowrap'>
            <ColorSchemeToggler className={classes.buttonHeader} radius="xl" variant="transparent" color="white"/>
          </Group>
          <Group gap={12} wrap='nowrap' pos="relative">
            {loading? 
              <Skeleton height={38} circle/> : 
              <Avatar color="white" name={data?.name} radius="xl" />
            }
          </Group>
        </Group>
      </Group>
    </AppShellHeader>
  )
}

export default MainHeader