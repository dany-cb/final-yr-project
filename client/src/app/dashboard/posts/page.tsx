'use client';

import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { Box } from '@mui/material';
import PostCard from '@/components/dashboard/posts/post-card';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import BoxesLoader from '@/components/loaders/boxes';
import { InstaContext } from '../layout';

export default function Page(): React.JSX.Element {
  const [posts, setPosts] = useState([]);
  const { account } = useContext(InstaContext) as any;

  useEffect(() => {
    if (account == 'verified') {
      axios
        .get('http://127.0.0.1:5000/posts', {
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setPosts(response.data);
        });
    }
  }, [account]);

  return (
    <>
      {posts.length === 0 ? (
        <div className="tw-w-full tw-h-[calc(100vh-194px)] tw-flex tw-items-center tw-justify-center">
          <BoxesLoader boxColor={'#6366F1'} desktopSize={'128px'} mobileSize={'80px'} />
        </div>
      ) : (
        <Stack spacing={3}>
          <Box>
            <Typography variant="h4">Posts</Typography>
          </Box>
          <Stack direction={'row'} flexWrap={'wrap'} width={'100%'} spacing={6}>
            {posts.map((post: any, i) => {
              return <PostCard key={i} {...post} />;
            })}
          </Stack>
        </Stack>
      )}
    </>
  );
}
