import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { js2xml } from 'xml-js';
import yaml from 'yaml';

import { downloadFile } from '../utils/downloadFile';
import { AuthContext } from '../context/AuthContext';

export default function DownloadMenu({ downloadData }) {
  const [dataType, setDataType] = useState('json');

  const {
    authState: { authenticated },
  } = useContext(AuthContext);

  function handleChange(event, newDataType) {
    if (newDataType) {
      setDataType(newDataType);
    }
  }

  function handleDownload() {
    switch (dataType) {
      case 'json': {
        downloadFile(
          'exchange-rates-time-series.json',
          JSON.stringify(downloadData),
          'application/json'
        );
        break;
      }
      case 'xml': {
        const xmlDoc = js2xml(downloadData, { compact: true });
        downloadFile(
          'exchange-rates-time-series.xml',
          xmlDoc,
          'application/xml'
        );
        break;
      }
      case 'yaml': {
        const yamlDoc = new yaml.Document();
        yamlDoc.contents = downloadData;
        downloadFile(
          'exchange-rates-time-series.yaml',
          yamlDoc,
          'application/yaml'
        );
      }
    }
  }

  if (!authenticated) {
    return (
      <>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 2,
            padding: 2,
            border: '2px solid #f9a825',
            borderRadius: 1,
            backgroundColor: '#fffde7',
            color: '#f9a825',
          }}
        >
          <LockIcon />
          <Typography variant="h6" component="h3">
            You must be logged in to download data
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <Typography variant="h6" component="h3" marginBottom={1}>
        Download Exchange Rates Data
      </Typography>
      <Typography variant="subtitle1" component="h4" marginBottom={5}>
        Choose data format
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box marginBottom={3}>
          <ToggleButtonGroup
            color="primary"
            value={dataType}
            exclusive
            onChange={handleChange}
            aria-label="Data Type"
          >
            <ToggleButton value="json">JSON</ToggleButton>
            <ToggleButton value="xml">XML</ToggleButton>
            <ToggleButton value="yaml">YAML</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Button variant="text" onClick={handleDownload}>
          Download
        </Button>
      </Box>
    </>
  );
}

DownloadMenu.propTypes = {
  downloadData: PropTypes.object,
};
