import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { useRouter } from 'next/router';
import { Button, Stack, Typography, Box, Pagination } from '@mui/material';
import { REACT_APP_API_URL } from '../../../libs/config';
import axios from 'axios';
import { getJwtToken } from '../../../libs/auth/index';
import { userVar } from '../../../apollo/store';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { sweetErrorHandling, sweetMixinErrorAlert, sweetMixinSuccessAlert } from '../../../libs/sweetAlert';
import { CREATE_CAR, UPDATE_CAR } from '../../../apollo/user/mutation';
import { CarInput } from '../../../libs/types/car/car.input';
import { CarBrand, CarDriveType, CarFuelType, CarTransmission, CarType } from '../../../libs/enums/car.enum';
import { GET_CAR } from '../../../apollo/user/query';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CarCard from '../../../libs/components/car/CarCard';
import { Car } from '../../../libs/types/car/car';

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
const mockCars = new Array(30).fill(null).map(() => ({ ...mockCar }));

const MyFavorites: NextPage = ({ initialInquiry, ...props }: any) => {
	const router = useRouter();
	const inputRef = useRef<any>(null);
	const token = getJwtToken();
	const user = useReactiveVar(userVar);

	const [myFavorites, setMyFavorites] = useState<Car[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const carsPerPage = 12;
	const totalPages = Math.ceil(mockCars.length / carsPerPage);

	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	const currentCars = mockCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);

	return (
		<div className={'my-favorites'}>
			<h3>My Favorites</h3>
			<Stack className={'fav-boxes'}>
				<Stack className={'car-boxes'}>
					{currentCars.map((car, idx) => (
						<CarCard key={idx} car={car} />
					))}
				</Stack>

				{totalPages > 1 && (
					<Box className={'pagination-box'}>
						<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
					</Box>
				)}
			</Stack>
		</div>
	);
};

export default withSellerLayout(MyFavorites);
