import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

const statusMap = {
  anger: { label: 'Anger', color: 'primary' },
  disgust: { label: 'Disgust', color: 'secondary' },
  fear: { label: 'Fear', color: 'error' },
  happy: { label: 'Happy', color: 'warning' },
  joy: { label: 'Joy', color: 'info' },
  neutral: { label: 'Neutral', color: 'success' },
  sad: { label: 'Sad', color: 'error' },
  sadness: { label: 'Sadness', color: 'success' },
  shame: { label: 'Shame', color: 'secondary' },
  surprise: { label: 'Surprise', color: 'primary' },
} as const;

export interface Comments {
  lc: number;
  un: string;
  s:
    | 'anger'
    | 'disgust'
    | 'fear'
    | 'happy'
    | 'joy'
    | 'neutral'
    | 'sad'
    | 'sadness'
    | 'shame'
    | 'surprise';
  date: string;
}

export interface LatestCommentsProps {
  comments?: Comments[];
  sx?: SxProps;
}

export function LatestComments({ comments = [], sx }: LatestCommentsProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Latest comments" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Likes Count</TableCell>
              <TableCell>Username</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Sentiment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments.map((comment, i) => {
              const { label, color } = statusMap[comment.s] ?? {
                label: 'Unknown',
                color: 'default',
              };

              return (
                <TableRow hover key={i}>
                  <TableCell>{comment.lc}</TableCell>
                  <TableCell>{comment.un}</TableCell>
                  <TableCell>{comment.date}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
