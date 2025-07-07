import React, { useState } from 'react';
import { Stack, Box, Pagination } from '@mui/material';
import { NextPage } from 'next';
import CarFilter from '../../libs/components/car/Filter';
import CarCard from '../../libs/components/car/CarCard';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

// Base car object
const mockCar = {
	name: 'BMW X7 2022 Super Turbo',
	type: 'SUV',
	fuel: 'Petrol',
	transmission: 'Auto',
	engine: '3.0 L',
	price: '$73,000',
	views: 1000,
	likes: 100,
	image: '/img/cars/header1.jpg',
	logo: '/img/logo/BMW.png',
	brand: 'BMW',
};

// Create 55 independent copies of the same car
const mockCars = new Array(55).fill(null).map(() => ({ ...mockCar }));

const CarList: NextPage = () => {
	const device = useDeviceDetect();

	const [currentPage, setCurrentPage] = useState(1);
	const carsPerPage = 12;
	const totalPages = Math.ceil(mockCars.length / carsPerPage);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const currentCars = mockCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

	if (device === 'mobile') {
		return <Stack>CAR PAGE MOBILE</Stack>;
	} else {
		return (
			<div id="car-list-page">
				<Stack className={'container'}>
					{/* Sub-Header */}
					<Stack className={'sub-header'}>
						<Link href={'/'} className={'link'}>
							Home
						</Link>
						<ArrowForwardIosIcon className={'arrow'} />
						<span>All Cars</span>
					</Stack>
					{/* Title */}
					<Stack className={'car-list-title'}>
						<h2>1,000+ Get The Best Deals On Brand New Cars</h2>
						<p>
							Explore our selection of high-quality, brand new vehicles. Our inventory includes top brands like BMW,
							Mercedes, Kia, and more. Find the perfect new car for your needs.
						</p>
					</Stack>

					{/* Main */}
					<Stack className={'main-list'}>
						{/* Filter */}
						<Stack className={'filter-box'}>
							<CarFilter />
						</Stack>

						{/* Car List */}
						<Stack className={'car-list-box'}>
							{currentCars.length === 0 ? (
								<Box className={'empty-list'}>No cars available.</Box>
							) : (
								<Stack className={'car-list'}>
									{currentCars.map((car, index) => (
										<CarCard key={index} car={car} />
									))}
								</Stack>
							)}

							{/* Pagination */}
							{totalPages > 1 && (
								<Box className={'pagination-box'}>
									<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
								</Box>
							)}
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

export default withLayoutFull(CarList);
