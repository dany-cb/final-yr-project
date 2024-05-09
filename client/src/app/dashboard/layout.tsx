'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';

import { AuthGuard } from '@/components/auth/auth-guard';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';
import BoxesLoader from '@/components/loaders/boxes';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import InstaLogin from '@/components/auth/insta-login';
import axios from 'axios';

interface LayoutProps {
  children: React.ReactNode;
}

const Loader = ({ children, delay }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = usePathname();
  useLayoutEffect(() => {
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

export const InstaContext = createContext({});

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const [instaCreds, setInstaCreds] = useState(null);
  const [instaStatus, setInstaStatus] = useState({});

  useLayoutEffect(() => {
    const instaCreds = localStorage.getItem('instaCreds');
    if (instaCreds) {
      setInstaCreds(JSON.parse(instaCreds));
    }
  }, []);

  const verifyCreds = () => {
    axios
      .post('http://127.0.0.1:5000/instalogin', instaCreds, {
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
      })
      .then((response) => {
        response.data?.status === 'success'
          ? setInstaStatus({ account: 'verified' })
          : setInstaStatus({ account: 'failed' });
      });
  };

  useEffect(() => {
    if (instaCreds) {
      verifyCreds();
    }
  }, [instaCreds]);

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
      {!instaCreds ? (
        <InstaLogin setInstaCreds={setInstaCreds} />
      ) : (
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
                <Loader delay={1000}>
                  <InstaContext.Provider value={instaStatus}>{children}</InstaContext.Provider>
                </Loader>
              </Container>
            </main>
          </Box>
        </Box>
      )}
    </AuthGuard>
  );
}
