'use client';

import { Modals } from '@/components/features/Modals';
import { GlobalQuery, Subscription } from '@/components/shared/app';
import { Mobile } from '@/components/ui/Mobile';
import { PageLoader } from '@/components/ui/PageLoader';
import { AuthProvider, useAuthContext } from '@/providers/AuthProvider';
import { ApolloProvider } from '@/shared/apollo/ApolloProvider';
import {
  AdapterDateFns,
  LocalizationProvider,
  MuiThemeProvider,
  muiTheme,
} from '@/shared/materialUI';
import { ChakraProvider } from '@chakra-ui/react';
import { resetServerContext } from '@hello-pangea/dnd';
import enLocale from 'date-fns/locale/en-US';
import type { PropsWithChildren } from 'react';
import { theme } from 'src/styles';

resetServerContext();

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <MuiThemeProvider theme={muiTheme}>
        <ChakraProvider theme={theme} resetCSS>
          <LocalizationProvider
            dateAdapter={AdapterDateFns as any}
            locale={enLocale}
          >
            <Mobile>
              <Inner>{children}</Inner>
            </Mobile>
          </LocalizationProvider>
        </ChakraProvider>
      </MuiThemeProvider>
    </AuthProvider>
  );
}

function Inner({ children }: PropsWithChildren) {
  const { idToken } = useAuthContext();
  if (!idToken) {
    return <PageLoader />;
  }

  return (
    <ApolloProvider>
      <GlobalQuery>
        <Subscription>
          <>
            {children}
            <Modals />
          </>
        </Subscription>
      </GlobalQuery>
    </ApolloProvider>
  );
}
