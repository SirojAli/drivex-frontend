import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ComparePage = () => {
	const cars = [
		{
			year: 2024,
			featured: true,
			image: 'https://via.placeholder.com/300x200',
			type: 'Sedan',
			name: '2017 BMV X1 xDrive 20d xline',
			price: 73000,
			priceText: new Intl.NumberFormat('en-US').format(73000),
			fuel: 'Petrol',
			kms: '20,000 km',
		},
		{
			year: 2024,
			featured: true,
			image: 'https://via.placeholder.com/300x200',
			type: 'Sedan',
			name: '2017 BMV X1 xDrive 20d xline',
			price: 83000,
			priceText: new Intl.NumberFormat('en-US').format(83000),
			fuel: 'Petrol',
			kms: '10,000 km',
		},
	];

	return (
		<Box className={'cover'}>
			<Typography variant="h5" className={'cover__title'}>
				Compare vehicle
			</Typography>

			<Box className={'cover__cards'}>
				{cars.map((car, idx) => (
					<Box key={idx} className={'cover__card'}>
						<Box className={'cover__card-header'}>
							<span className={'cover__badge'}>Featured</span>
							<span className={'cover__badge'}>{car.year}</span>
						</Box>
						<img src={car.image} className={'cover__image'} alt={car.name} loading="lazy" />
						<Box className={'cover__info'}>
							<Typography className={'cover__type'}>{car.type}</Typography>
							<Typography className={'cover__name'}>{car.name}</Typography>
							<Typography className={'cover__price'}>${car.priceText.toLocaleString()}</Typography>
						</Box>
					</Box>
				))}
			</Box>

			<Box className={'cover__tabs'}>
				<Button className={'cover__tab cover__tab--active'}>Overview</Button>
				<Button className={'cover__tab'}>Features</Button>
				<Button className={'cover__tab'}>Specification</Button>
			</Box>

			<Box className={'cover__table'}>
				<Typography variant="h6" className={'cover__section-title'}>
					Car Overview
				</Typography>

				<Box className={'cover__row'}>
					<Box className={'cover__label'}>Price</Box>
					{cars.map((car, i) => (
						<Box key={i} className={'cover__value'}>
							${car.priceText.toLocaleString()}
						</Box>
					))}
				</Box>
				<Box className={'cover__row'}>
					<Box className={'cover__label'}>Fuel Type</Box>
					{cars.map((car, i) => (
						<Box key={i} className={'cover__value'}>
							{car.fuel}
						</Box>
					))}
				</Box>
				<Box className={'cover__row'}>
					<Box className={'cover__label'}>Kms Driven</Box>
					{cars.map((car, i) => (
						<Box key={i} className={'cover__value'}>
							{car.kms}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default ComparePage;
