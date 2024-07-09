import themeConfig from '@/../theme.config';
import { ThemeProps } from '@/states/query/theme';

const fetchThemeSettings = async (): Promise<ThemeProps> => {
  // Simulate fetching from an API
  return themeConfig;
};

const updateThemeSettings = async (
  newSettings: ThemeProps
): Promise<ThemeProps> => {
  // Simulate updating settings in an API
  return newSettings;
};

export { fetchThemeSettings, updateThemeSettings }
