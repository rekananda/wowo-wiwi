import { Box, LoadingOverlay } from "@mantine/core"

const FallbackLoader = () => {
  return (
    <Box pos="relative" w="100dvw" h="100dvh">
      <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} loaderProps={{ type: 'bars' }}/>
    </Box>
  )
}

export default FallbackLoader