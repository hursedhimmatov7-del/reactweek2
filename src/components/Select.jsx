import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function BasicSelect({ value, onChange }) {
  return (
    <Box sx={{ width: 250 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="status-select-label">Status</InputLabel>
        <Select
          labelId="status-select-label"
          id="status-select"
          value={value}
          label="Status"
          onChange={onChange}
        >
          <MenuItem value="all">all</MenuItem>
          <MenuItem value="true">online</MenuItem>
          <MenuItem value="false">offline</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}