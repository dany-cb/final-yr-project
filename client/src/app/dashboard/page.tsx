'use client';

import Grid from '@mui/material/Unstable_Grid2';
import dayjs from 'dayjs';

import { Comments } from '@/components/dashboard/overview/budget';
import { LatestComments } from '@/components/dashboard/overview/latest-comments';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalFollowers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { PieChart } from '@/components/dashboard/overview/pie-chart';
import { useContext, useEffect, useState } from 'react';
import { InstaContext } from './layout';
import axios from 'axios';
import BoxesLoader from '@/components/loaders/boxes';
import { CirclesWithBar } from 'react-loader-spinner';
import { Typography } from '@mui/material';

export default function Page(): React.JSX.Element {
  const { account } = useContext(InstaContext) as any;
  const [accountInfo, setAccountInfo] = useState(null) as any;
  const [latestComments, setLatestComments] = useState(null) as any;

  useEffect(() => {
    if (account == 'verified') {
      axios
        .get('http://127.0.0.1:5000/accountInfo', {
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        })
        .then((response) => {
          setAccountInfo(response.data);

          axios
            .post('http://127.0.0.1:5000/mediaComments', response.data['rp'], {
              headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
            })
            .then((response) => {
              setLatestComments(response.data);
            });
        });
    }
  }, [account]);
  return (
    <>
      {accountInfo ? (
        <Grid container spacing={3}>
          <Grid lg={3} sm={6} xs={12}>
            <Comments diff={4} trend="up" sx={{ height: '100%' }} value={accountInfo.tc} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TotalFollowers diff={5} trend="up" sx={{ height: '100%' }} value={accountInfo.tf} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TasksProgress sx={{ height: '100%' }} value={8.75} />
          </Grid>
          <Grid lg={3} sm={6} xs={12}>
            <TotalProfit sx={{ height: '100%' }} value={accountInfo.tp} />
          </Grid>
          <Grid lg={8} xs={12}>
            <Sales
              chartSeries={[
                { name: 'This year', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                { name: 'Last year', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid lg={4} md={6} xs={12}>
            <PieChart
              chartSeries={[25, 15, 40, 20]}
              labels={['Anger', 'Fear', 'Neutral', 'Joy']}
              sx={{ height: '100%' }}
            />
          </Grid>

          <Grid lg={8} md={12} xs={12}>
            {latestComments ? (
              <LatestComments comments={latestComments} sx={{ height: '100%' }} />
            ) : (
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-min-h-[250px] tw-w-full">
                <CirclesWithBar width={100} height={100} color="#635bff" />
                <Typography variant="caption" color="gray" marginTop={2}>
                  Analyzing comments
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      ) : (
        <div className="tw-w-full tw-h-[calc(100vh-194px)] tw-flex tw-items-center tw-justify-center">
          <BoxesLoader boxColor={'#6366F1'} desktopSize={'128px'} mobileSize={'80px'} />
        </div>
      )}
    </>
  );
}
