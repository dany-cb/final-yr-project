'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

import { AuthGuard } from '@/components/auth/auth-guard';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';
import BoxesLoader from '@/components/loaders/boxes';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Loader = ({ children, delay }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const location = usePathname();
  React.useLayoutEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, delay);
  }, [location, delay]);

  return (
    <>
      {isLoading ? (
        <div className="tw-w-full tw-h-[calc(100vh-194px)] tw-flex tw-items-center tw-justify-center">
          <BoxesLoader boxColor={'#6366F1'} desktopSize={'128px'} mobileSize={'80px'} />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: 'var(--SideNav-width)' },
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              <Loader delay={1000}>{children}</Loader>
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  );
}
