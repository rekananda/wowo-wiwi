import { MantineBreakpoint, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useBreakPoints = (
	breakpoint: MantineBreakpoint = "mobile",
	query: "max-width" | "min-width" = "max-width",
): boolean|undefined => {
	const theme = useMantineTheme();
	const bool = useMediaQuery(`(${query}: ${theme.breakpoints[breakpoint]})`, undefined, {
		getInitialValueInEffect: false,
	});

	return bool;
};