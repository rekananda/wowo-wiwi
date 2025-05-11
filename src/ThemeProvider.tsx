import { MantineColorScheme, MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { NavigationProgress } from "@mantine/nprogress";
import 'dayjs/locale/id';
import { ToastContainer } from 'react-toastify';
import mainTheme from "@/config/mantineTheme";
import { useLocalStorage } from '@mantine/hooks';

type ProviderProps = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ProviderProps) => {
  const [colorScheme] = useLocalStorage<MantineColorScheme>({ key: "color-scheme", defaultValue: "light" });
  return (
    <MantineProvider theme={mainTheme} defaultColorScheme={colorScheme}>
      <NavigationProgress />
      <DatesProvider settings={{ locale: 'id', firstDayOfWeek: 0, weekendDays: [0], consistentWeeks: true }}>
        {children}
        <ToastContainer />
      </DatesProvider>
    </MantineProvider>
  )
}

export default ThemeProvider