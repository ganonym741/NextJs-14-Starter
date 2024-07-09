import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import themeConfig from '@/../theme.config';
import { fetchThemeSettings, updateThemeSettings } from '../service/theme';

interface ThemeProps {
  locale: 'en' | 'id';
  theme: 'light' | 'dark' | 'system';
  menu: 'vertical' | 'collapsible-vertical' | 'horizontal';
  layout: 'full' | 'boxed-layout';
  navbar: 'navbar-sticky' | 'navbar-floating' | 'navbar-static';
  // Add more theme config here...
}

const useThemeConfig = () => {
  return useQuery<ThemeProps>({
    queryKey: ['theme'],
    // queryFn: async () => await fetchThemeSettings(),
    initialData: themeConfig,
    staleTime: Infinity,
    retry: 3,
  });
};

const useSetThemeConfig = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['theme'],
    mutationFn: async (configs: Partial<ThemeProps>) => {
      const data = queryClient.getQueryData(['theme']) as ThemeProps;
      const newTheme = { ...data, ...configs };

      try {
        await updateThemeSettings(newTheme);
      } catch {
        return data;
      }

      return newTheme;
    },
    onSuccess: (newSettings) => {
      queryClient.setQueryData<ThemeProps>(['theme'], (oldSettings) => ({
        ...oldSettings,
        ...newSettings,
      }));
    },
  });
};

export { useThemeConfig, useSetThemeConfig };
export type { ThemeProps };
