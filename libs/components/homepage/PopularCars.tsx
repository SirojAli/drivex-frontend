import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CarCard from '../car/CarCard';

const PopularCars = () => {
	const [popularCars, setPopularCar] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

	return (
		<Stack className={'popular-cars'}>
			<Stack className={'container'}>
				<Box className={'popular-text'}>
					<h2>Popular Cars</h2>
					<div className={'view-all'}>
						<p>View all</p>
						<ArrowRightAltIcon className={'arrow'} />
					</div>
				</Box>

				<Stack className={'popular-car-box'}>
					{popularCars.length === 0 ? (
						<Box className={'empty-list'}>Popular Cars Empty</Box>
					) : (
						popularCars.map((car, index) => <CarCard car={car} key={index} />)
					)}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default PopularCars;
