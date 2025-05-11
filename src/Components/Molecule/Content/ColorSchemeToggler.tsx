
import Icon from "@Atom/Icon";
import {
  ActionIcon,
  ActionIconProps,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

const colorSchemes = ["light", "dark"] as const;
export type ColorSchemeT = (typeof colorSchemes)[number];

const ColorSchemeToggler = (props: ActionIconProps) => {
  const { setColorScheme } = useMantineColorScheme();
  const [colorScheme, setLocalStorageColorScheme ] = useLocalStorage<ColorSchemeT>({ key: "color-scheme", defaultValue: "light" });

  const toggleColorScheme = () => {
    setLocalStorageColorScheme(colorScheme === "dark" ? "light" : "dark");
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  }

  return (
    <ActionIcon variant="subtle" size={28} {...props} onClick={toggleColorScheme}>
      <Icon name={colorScheme === "dark" ? "IconSun" : "IconMoon"} size={20} />
    </ActionIcon>
  );
};

export default ColorSchemeToggler;
