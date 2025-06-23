import React, { useState } from 'react';
import {
	Stack,
	Typography,
	OutlinedInput,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Slider,
	Tooltip,
	IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const CarFilter = () => {
	const [searchText, setSearchText] = useState('');

	return (
		<Stack className={'car-filter-box'}>
			{/* Header */}
			<Stack direction="row" justifyContent="space-between" alignItems="center" className={'car-filter-header'}>
				<Typography variant="h6" fontWeight={600}>
					Filters and Sort
				</Typography>
				<Button size="small" color="primary">
					Clear
				</Button>
			</Stack>

			{/* Search Input + Button */}
			<Stack direction="row" spacing={1} className={'car-filter-search'}>
				<OutlinedInput
					fullWidth
					size="small"
					value={searchText}
					placeholder="Search"
					onChange={(e) => setSearchText(e.target.value)}
					endAdornment={
						searchText && <CancelRoundedIcon style={{ cursor: 'pointer' }} onClick={() => setSearchText('')} />
					}
				/>
				<Button variant="contained" color="primary">
					Search
				</Button>
			</Stack>

			{/* Dropdowns */}
			<Stack spacing={2} className={'car-filter-dropdowns'}>
				{['Make', 'Models', 'Body', 'Fuel type', 'Transmission', 'Driver type', 'Door', 'Cylinder', 'Color'].map(
					(label) => (
						<FormControl fullWidth size="small" key={label}>
							<InputLabel>{label}</InputLabel>
							<Select label={label}>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="1">{label} Option 1</MenuItem>
								<MenuItem value="2">{label} Option 2</MenuItem>
							</Select>
						</FormControl>
					),
				)}
			</Stack>

			{/* Sliders */}
			<Stack spacing={4} className={'car-filter-sliders'}>
				<Stack className={'slider-group'}>
					<Typography gutterBottom>Price: $0 - $250,000</Typography>
					<Slider value={[0, 250000]} min={0} max={250000} step={1000} valueLabelDisplay="auto" />
				</Stack>
				<Stack className={'slider-group'}>
					<Typography gutterBottom>Year: 2000 - 2025</Typography>
					<Slider value={[2000, 2025]} min={1990} max={2025} step={1} valueLabelDisplay="auto" />
				</Stack>
				<Stack className={'slider-group'}>
					<Typography gutterBottom>Odometer: 0km - 100,000km</Typography>
					<Slider value={[0, 100000]} min={0} max={200000} step={1000} valueLabelDisplay="auto" />
				</Stack>
			</Stack>

			{/* Featured Section */}
			<Stack className={'car-filter-featured'}>
				<Typography variant="subtitle1" fontWeight={600}>
					Featured
				</Typography>
				{[
					'A/C Front',
					'Backup Camera',
					'Cruise Control',
					'Navigation',
					'Power Locks',
					'Audio system',
					'Touchscreen display',
					'GPS navigation',
					'Phone connectivity',
					'In-car Wi-Fi',
					'Chrome-plated grill',
				].map((feature) => (
					<Stack direction="row" alignItems="center" spacing={1} key={feature} className={'feature-option'}>
						<Checkbox size="small" />
						<Typography>{feature}</Typography>
					</Stack>
				))}
			</Stack>

			{/* Reset Button */}
			<Stack className={'car-filter-reset'}>
				<Tooltip title="Reset Filters">
					<IconButton>
						<RefreshIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	);
};

export default CarFilter;
