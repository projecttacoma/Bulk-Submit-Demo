import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

export function mantineWrap(children: JSX.Element) {
  return (
    <ColorSchemeProvider
      colorScheme="light"
      toggleColorScheme={() => {
        void 0;
      }}
    >
      <MantineProvider withGlobalStyles withNormalizeCSS theme="light">
        <NotificationsProvider position="top-center">{children}</NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
