import { useAppSelector } from "@/store";
import { Card, Divider, Group, Image, Stack } from "@mantine/core";

export default function LandingPage() {
  const { mainConfig } = useAppSelector((state) => state.global);
  return (
    <Group justify="center" align="center" w="100%">
      <Card miw={{base: '90vw', md: '95vw', lg: '90vw'}} radius="xl">
        <Group>
          <Stack className="flex-grow" mih={mainConfig.contentHeight}>
            1
          </Stack>
          <Stack align="center" justify="center" mih={mainConfig.contentHeight}>
            <Divider className="flex-grow" orientation="vertical" style={{alignSelf: 'center'}} />
            <Image w={50} src="./LOGO/WOWO-WIWI-TYPOGRAPHY.png"
              styles={{
                root: {
                  filter: 'brightness(0)'
                }
              }} />
            <Divider className="flex-grow" orientation="vertical" style={{alignSelf: 'center'}} />
          </Stack>
          <Stack className="flex-grow" mih={mainConfig.contentHeight}>
            2
          </Stack>
        </Group>
      </Card>
    </Group>
  );
}
