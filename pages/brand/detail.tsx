import React, { useState, ChangeEvent } from 'react';
import { NextPage } from 'next';
import { Stack, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CarCard from '../../libs/components/car/CarCard';

const mockCars = new Array(20).fill({
	name: 'BMW X7 2020 Super Turbo',
	type: 'SUV',
	fuel: 'Petrol',
	transmission: 'Auto',
	engine: '3.0 L',
	price: '$73,000',
	views: 1540,
	likes: 320,
	image: '/img/cars/header1.jpg',
	logo: '/img/logo/BMW.png',
	brand: 'BMW',
});

const BrandDetail: NextPage = () => {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Optional: Filter logic
	};

	return (
		<div id="brand-detail-page">
			<Stack className={'container-box'}>
				{/* Header */}
				<Box className={'brand-header'}>
					<h2 className={'brand-name'}>BMW</h2>
				</Box>

				{/* Filter and Search */}
				<Box className={'filter-search-box'}>
					<Box className={'filter-box'}>
						{['Top', 'Popular', 'New', 'Discount'].map((filter) => (
							<div key={filter} className={'filter-button'}>
								<p>{filter}</p>
							</div>
						))}
					</Box>
					<Box className={'search-box'}>
						<form className={'search-form'} onSubmit={handleSearchSubmit}>
							<input
								type="search"
								placeholder="Search car"
								className={'search-input'}
								value={searchQuery}
								onChange={handleSearchChange}
							/>
							<Button type="submit" className={'search-btn'}>
								<SearchIcon />
							</Button>
						</form>
					</Box>
				</Box>

				{/* Car Cards */}
				<Stack className={'car-list'}>
					{mockCars.map((car, index) => (
						<CarCard key={index} car={car} />
					))}
				</Stack>
			</Stack>
		</div>
	);
};

export default withLayoutBasic(BrandDetail);
