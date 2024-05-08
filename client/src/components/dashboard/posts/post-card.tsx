'use client';

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grow,
  IconButton,
  Typography,
} from '@mui/material';
import { CaretDown, Heart, ShareNetwork } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';

export default function PostCard() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grow in={true} timeout={1000}>
      <Card className="tw-w-[350px] !tw-h-fit">
        <CardHeader subheader="September 14, 2016" />

        <Image
          height="260"
          width="400"
          src="https://source.unsplash.com/random/400x260/?food"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Heart size={20} />
          </IconButton>
          <IconButton aria-label="share">
            <ShareNetwork size={20} />
          </IconButton>
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
            <Typography paragraph>Method:</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grow>
  );
}
