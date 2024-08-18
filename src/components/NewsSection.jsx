import { useState } from 'react';
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

import { useFetch } from '../hooks/useFetch';
import { formatDate } from '../utils/formatDate';

const Image = styled('img')(() => ({
  width: 220,
  borderRadius: 4,
}));

export default function NewsSection({ baseCurrency, checkedCurrencies }) {
  const [page, setPage] = useState(1);

  function handlePageChange(event, value) {
    setPage(value);
  }

  function createSearchString() {
    let str = `${baseCurrency}|`;

    for (const currency of checkedCurrencies) {
      str += `${currency}|`;
    }
    str = str.slice(0, -1).toLowerCase();

    return str;
  }

  const {
    data: news,
    isLoading,
    error,
  } = useFetch({
    url: 'https://api.thenewsapi.com/v1/news/top',
    params: {
      api_token: 'DVbGsPtLbo78XcveQ6cPCkKUnHpNA3wOp1DC3Tka',
      search: createSearchString(),
      search_fields: 'title,description,keywords',
      language: 'en',
      page,
    },
  });

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

  function renderNews() {
    if (isLoading) {
      return (
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
      );
    }

    if (error) {
      return (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}
        >
          {error}
        </Box>
      );
    }

    return (
      <Paper elevation={4} sx={{ padding: 4, marginBottom: 4 }}>
        {<Stack spacing={2}>{news.map((item) => renderNewsItem(item))}</Stack>}
      </Paper>
    );
  }

  return (
    <section>
      <Typography variant="h2" component="h3" marginBottom={4}>
        Top News
      </Typography>
      {renderNews()}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={10} page={page} onChange={handlePageChange} />
      </Box>
    </section>
  );
}

NewsSection.propTypes = {
  baseCurrency: PropTypes.string,
  checkedCurrencies: PropTypes.arrayOf(PropTypes.string),
};
