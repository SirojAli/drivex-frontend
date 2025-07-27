import React, { useCallback, useEffect, useState } from 'react';
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
	Box,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { CarsInquiry } from '../../types/car/car.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { CarBrand, CarType, CarFuelType, CarTransmission, CarDriveType } from '../../enums/car.enum';
import SearchIcon from '@mui/icons-material/Search';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';

type FilterType = {
	searchFilter: CarsInquiry;
	setSearchFilter: any;
	initialInput: CarsInquiry;
};

const carColors = ['WHITE', 'BLACK', 'GRAY', 'BLUE', 'RED', 'BROWN', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'OTHER'];

const CarFilter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();

	const [carBrands, setCarBrands] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carTypes, setCarTypes] = useState<CarType[]>(Object.values(CarType));
	const [carFuelTypes, setCarFuelTypes] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carTransmissions, setCarTransmissions] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carDriveTypes, setCarDriveTypes] = useState<CarDriveType[]>(Object.values(CarDriveType));

	const [searchText, setSearchText] = useState<string>('');

	/** APOLLO REQUESTS **/
	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getCars?.list && Array.isArray(data.getCars.list)) {
				setCarBrands(data.getCars.list);
			} else {
				setCarBrands([]);
			}
		},
	});

	/** LIFECYCLES **/

	/** HANDLERS **/
	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(`/car?input=${JSON.stringify(initialInput)}`, `/car?input=${JSON.stringify(initialInput)}`, {
				scroll: false,
			});
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	const searchHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		const newInput = {
			...searchFilter,
			search: {
				...searchFilter.search,
				carName: searchText,
			},
			page: 1,
		};
		setSearchFilter(newInput);
		await getCarsRefetch({ input: newInput });
	};

	if (device === 'mobile') {
		return <Stack>CARS FILTER</Stack>;
	} else {
		return (
			<Stack className="filter-box">
				{/* Header */}
				<Stack className={'find-your-car'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Car</Typography>
					<Box className={'search-box'}>
						<form className={'search-form'} onSubmit={searchHandler}>
							<input
								type="search"
								placeholder="Search car"
								className={'search-input'}
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
							/>
							<Button type="submit" className={'search-btn'}>
								<SearchIcon />
							</Button>
						</form>
					</Box>
				</Stack>

				{/* Dropdown Filters */}
				<Stack spacing={2} className="filter-box__dropdowns">
					{/* Price */}
					{/* <FormControl fullWidth size="small">
						<Typography fontWeight={500}>Price (in MLN)</Typography>
						<Slider
							value={price}
							onChange={(e, val) => setPrice(val as number[])}
							valueLabelDisplay="auto"
							min={10_000_000}
							max={300_000_000}
							step={1_000_000}
						/>
					</FormControl> */}

					{/* Make */}
					<FormControl fullWidth size="small">
						<InputLabel>Make</InputLabel>
						<Select defaultValue="">
							{carBrands.map((brand) => (
								<MenuItem key={brand} value={brand}>
									{brand}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Body Type */}
					<FormControl fullWidth size="small">
						<InputLabel>Body Type</InputLabel>
						<Select defaultValue="">
							{carTypes.map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Year */}
					{/* <Typography fontWeight={500}>Year</Typography>
					<Slider
						value={year}
						onChange={(e, val) => setYear(val as number[])}
						valueLabelDisplay="auto"
						min={2010}
						max={2026}
						step={1}
					/> */}

					{/* Fuel Type */}
					<FormControl fullWidth size="small">
						<InputLabel>Fuel</InputLabel>
						<Select defaultValue="">
							{carFuelTypes.map((fuel) => (
								<MenuItem key={fuel} value={fuel}>
									{fuel}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Transmission */}
					<FormControl fullWidth size="small">
						<InputLabel>Transmission</InputLabel>
						<Select defaultValue="">
							{carTransmissions.map((trans) => (
								<MenuItem key={trans} value={trans}>
									{trans}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Drive Type */}
					<FormControl fullWidth size="small">
						<InputLabel>Drive</InputLabel>
						<Select defaultValue="">
							{carDriveTypes.map((drive) => (
								<MenuItem key={drive} value={drive}>
									{drive}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Doors */}
					<FormControl fullWidth size="small">
						<InputLabel>Doors</InputLabel>
						<Select defaultValue="">
							{[2, 3, 4, 5].map((num) => (
								<MenuItem key={num} value={num}>
									{num}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Seats */}
					<FormControl fullWidth size="small">
						<InputLabel>Seats</InputLabel>
						<Select defaultValue="">
							{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
								<MenuItem key={num} value={num}>
									{num}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Color */}
					<FormControl fullWidth size="small">
						<InputLabel>Color</InputLabel>
						<Select defaultValue="">
							{carColors.map((color) => (
								<MenuItem key={color} value={color}>
									{color}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Stack>
			</Stack>
		);
	}
};

export default CarFilter;
