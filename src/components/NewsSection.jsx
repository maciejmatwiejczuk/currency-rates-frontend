import PropTypes from 'prop-types';
import {
  Stack,
  Typography,
  Paper,
  Box,
  Link,
  Pagination,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { formatDate } from '../utils/formatDate';

const Image = styled('img')(() => ({
  width: 220,
  borderRadius: 4,
}));

export default function NewsSection({
  news,
  page,
  handlePageChange,
  isLoadingNews,
}) {
  function renderNewsItem(item) {
    return (
      <Paper
        key={item.uuid}
        elevation={2}
        sx={{ display: 'flex', gap: 3, padding: 3, position: 'relative' }}
      >
        <Image src={item.image_url} />
        <Box>
          <Box marginBottom={1}>
            <Link href={item.url} variant="h5" target="_blank" rel="noreferrer">
              {item.title}
            </Link>
          </Box>
          <Typography variant="body1" component="p">
            {item.description}
          </Typography>
          <Typography
            variant="caption"
            sx={{ position: 'absolute', bottom: '12%' }}
          >
            Publication date: {formatDate(new Date(item.published_at))}
          </Typography>
        </Box>
      </Paper>
    );
  }

  return (
    <section>
      <Typography variant="h2" component="h3" marginBottom={4}>
        Top News
      </Typography>
      {isLoadingNews ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={4} sx={{ padding: 4, marginBottom: 4 }}>
          {
            <Stack spacing={2}>
              {news.map((item) => renderNewsItem(item))}
            </Stack>
          }
        </Paper>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} page={page} onChange={handlePageChange} />
      </Box>
    </section>
  );
}

NewsSection.propTypes = {
  news: PropTypes.array,
  page: PropTypes.number,
  handlePageChange: PropTypes.func,
  isLoadingNews: PropTypes.bool,
};
