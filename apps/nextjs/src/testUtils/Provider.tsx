import { Modals } from '@/components/features/Modals';
import { GlobalQuery } from '@/components/shared/app';
import { PageLoader } from '@/components/ui/PageLoader';
import { ApolloProvider } from '@/shared/apollo/ApolloProvider';
import {
  AdapterDateFns,
  LocalizationProvider,
  MuiThemeProvider,
  muiTheme,
} from '@/shared/materialUI';
import { theme } from '@/styles';
import { ChakraProvider } from '@chakra-ui/react';
import enLocale from 'date-fns/locale/en-US';
import type React from 'react';
import { Suspense } from 'react';

export const Provider: React.FCWithChildren = (props) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ChakraProvider theme={theme} resetCSS>
        <LocalizationProvider
          dateAdapter={AdapterDateFns as any}
          locale={enLocale}
        >
          <Suspense fallback={<PageLoader />}>
            <ApolloProvider>
              <GlobalQuery>
                {props.children}
                <Modals />
              </GlobalQuery>
            </ApolloProvider>
          </Suspense>
        </LocalizationProvider>
      </ChakraProvider>
    </MuiThemeProvider>
  );
};
