'use client';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grow,
  IconButton,
  Typography,
} from '@mui/material';
import { CaretDown, ChatTeardropDots, Heart } from '@phosphor-icons/react';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { Puff } from 'react-loader-spinner';
import { Chart } from '@/components/core/chart';
import { ApexOptions } from 'apexcharts';

const PieChart = ({ chartSeries, labels }) => {
  const chartOptions: ApexOptions = {
    chart: { background: 'transparent' },
    dataLabels: { enabled: false },
    labels,
    legend: { show: true },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    tooltip: { fillSeriesColor: false },
  };
  return (
    <>
      <div className="tw-w-full tw-border-[1px] tw-border-t-gray-50 tw-mb-4 -tw-mt-4 tw-border-solid"></div>
      <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
    </>
  );
};

export default function PostCard({ cc, dt, lc, tu, ct, id }) {
  const [expanded, setExpanded] = useState(false);
  const [sentimentData, setSentimentData] = useState(null) as any;

  const handleExpandClick = () => {
    setExpanded(!expanded);

    if (sentimentData) return;

    axios
      .post(
        'http://127.0.0.1:5000/commentSentiment',
        { id: id },
        {
          headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        },
      )
      .then((response) => {
        console.log(response.data);
        const emotions = Object.keys(response.data);
        const emotions_label = emotions.map((s) => s[0].toUpperCase() + s.slice(1));
        const chartSeries = emotions.map((emotion) => response.data[emotion]);
        setSentimentData({ chartSeries, labels: emotions_label });
        console.log(chartSeries, emotions);
      });
  };
  return (
    <Grow in={true} timeout={1000}>
      <Card className="tw-w-[350px] !tw-h-fit">
        <CardHeader title={dt} />

        <Image
          height={0}
          width={0}
          sizes="30vw"
          src={tu}
          alt="insta image"
          style={{ width: '100%', height: 'auto' }}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {ct}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Heart size={20} />
          </IconButton>
          <Typography variant="caption" color="gray">
            {lc}
          </Typography>
          <IconButton aria-label="share">
            <ChatTeardropDots size={20} />
          </IconButton>
          <Typography variant="caption" color="gray">
            {cc}
          </Typography>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            className={expanded ? 'tw-rotate-180 !tw-ml-auto !tw-mr-0' : '!tw-ml-auto !tw-mr-0'}
          >
            <CaretDown size={20} />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {sentimentData ? (
              <PieChart chartSeries={sentimentData.chartSeries} labels={sentimentData.labels} />
            ) : (
              <div className="tw-flex tw-flex-col tw-items-center">
                <Puff width={50} height={50} color="#635bff" />
                <Typography variant="caption" color="gray" marginTop={2}>
                  Analyzing comments
                </Typography>
              </div>
            )}
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
}
