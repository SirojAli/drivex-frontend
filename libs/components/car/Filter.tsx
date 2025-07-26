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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { CarsInquiry } from '../../types/car/car.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { CarBrand, CarType, CarFuelType, CarTransmission, CarDriveType } from '../../enums/car.enum';

type FilterType = {
	searchFilter: CarsInquiry;
	setSearchFilter: React.Dispatch<React.SetStateAction<CarsInquiry>>;
	initialInput: CarsInquiry;
};

const carColors = ['WHITE', 'BLACK', 'GRAY', 'BLUE', 'RED', 'BROWN', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'OTHER'];

const defaultSearchFilter: CarsInquiry = {
	search: {
		text: '',
		carPrice: { min: 10, max: 300 },
		carYear: { min: 2010, max: 2026 },
	},
	page: 1,
	limit: 15,
};

const CarFilter = (props: FilterType) => {
	const { searchFilter = defaultSearchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();

	const [carBrands, setCarBrands] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carTypes, setCarTypes] = useState<CarType[]>(Object.values(CarType));
	const [carFuelTypes, setCarFuelTypes] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carTransmissions, setCarTransmissions] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carDriveTypes, setCarDriveTypes] = useState<CarDriveType[]>(Object.values(CarDriveType));

	const [search, setSearch] = useState('');
	const [price, setPrice] = useState<number[]>([
		initialInput.search?.carPrice?.min || 10000000,
		initialInput.search?.carPrice?.max || 300000000,
	]);

	const [year, setYear] = useState<number[]>([
		initialInput.search?.carYear?.min || 2010,
		initialInput.search?.carYear?.max || 2026,
	]);

	/** LIFECYCLES **/
	useEffect(() => {
		// Helper to update the router URL after deleting a filter
		const updateRouter = () => {
			router.push(
				`/car?input=${JSON.stringify({
					...searchFilter,
					search: { ...searchFilter.search },
				})}`,
				undefined,
				{ scroll: false },
			);
		};

		// For string or arrays: check length === 0
		if (searchFilter?.search?.carBrand && searchFilter.search.carBrand.length === 0) {
			delete searchFilter.search.carBrand;
			updateRouter();
		}
		if (searchFilter?.search?.carType && searchFilter.search.carType.length === 0) {
			delete searchFilter.search.carType;
			updateRouter();
		}
		if (searchFilter?.search?.carFuelType && searchFilter.search.carFuelType.length === 0) {
			delete searchFilter.search.carFuelType;
			updateRouter();
		}
		if (searchFilter?.search?.carTransmission && searchFilter.search.carTransmission.length === 0) {
			delete searchFilter.search.carTransmission;
			updateRouter();
		}
		if (searchFilter?.search?.carDriveType && searchFilter.search.carDriveType.length === 0) {
			delete searchFilter.search.carDriveType;
			updateRouter();
		}
		if (searchFilter?.search?.carColor && searchFilter.search.carColor.length === 0) {
			delete searchFilter.search.carColor;
			updateRouter();
		}

		// For numbers: check if undefined or 0 (or any sentinel for 'empty')
		if (searchFilter?.search?.carDoors === 0 || searchFilter?.search?.carDoors === undefined) {
			delete searchFilter.search.carDoors;
			updateRouter();
		}

		if (searchFilter?.search?.carSeats === 0 || searchFilter?.search?.carSeats === undefined) {
			delete searchFilter.search.carSeats;
			updateRouter();
		}
	}, [searchFilter, router]);

	/** HANDLERS **/
	// const searchCarHandler = useCallback();
	const searchCarBrandHandler = useCallback(
		async (e: React.ChangeEvent<HTMLSelectElement>) => {
			try {
				const value = e.target.value; // selected brand from dropdown

				await router.push(
					`/car?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							carBrand: value || undefined, // if empty string, remove filter
						},
					})}`,
					undefined,
					{ scroll: false },
				);

				console.log('searchCarBrandHandler:', value);
			} catch (err) {
				console.error('ERROR in searchCarBrandHandler:', err);
			}
		},
		[searchFilter, router],
	);

	// const carPriceHandler = useCallback();
	// const carBrandHandler = useCallback();
	// const carTypeHandler = useCallback();
	// const carYearHandler = useCallback();
	// const carFuelTypeHandler = useCallback();
	// const carTransmissionHandler = useCallback();
	// const carDriveTypeHandler = useCallback();
	// const carDoorHandler = useCallback();
	// const carSeatHandler = useCallback();
	// const carColorHandler = useCallback();

	const updateSearchFilter = useCallback(
		(updatedFields: Partial<CarsInquiry['search']>) => {
			setSearchFilter((prev: CarsInquiry) => ({
				...prev,
				search: {
					...prev.search,
					...updatedFields,
				},
			}));
		},
		[setSearchFilter],
	);

	const handleSearch = () => {
		updateSearchFilter({ text: search });
	};

	const handlePriceChange = (_: any, val: number[]) => {
		setPrice(val);
		updateSearchFilter({ carPrice: { min: val[0], max: val[1] } });
	};

	const handleYearChange = (_: any, val: number[]) => {
		setYear(val);
		updateSearchFilter({ carYear: { min: val[0], max: val[1] } });
	};

	// Reset filters to initial input
	const handleClear = () => {
		setSearch('');
		setPrice([initialInput.search?.carPrice?.min || 10000000, initialInput.search?.carPrice?.max || 300000000]);
		setYear([initialInput.search?.carYear?.min || 2010, initialInput.search?.carYear?.max || 2026]);
		setSearchFilter(initialInput);
	};

	useEffect(() => {
		setSearchFilter((prev: any) => ({
			...prev,
			search: {
				...prev.search,
				carPrice: { min: price[0], max: price[1] },
				carYear: { min: year[0], max: year[1] },
			},
		}));
	}, [price, year]);

	if (device === 'mobile') {
		return <Stack>CARS FILTER</Stack>;
	} else {
		return (
			<Stack className="filter-box">
				{/* Header */}
				<Stack className="filter-box__header" direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant="h6">Filters and Sort</Typography>
					<Button size="small" onClick={handleClear}>
						Clear
					</Button>
				</Stack>

				{/* Search */}
				<Stack className="filter-box__search" direction="row" spacing={1}>
					<OutlinedInput
						fullWidth
						size="small"
						placeholder="Search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						endAdornment={search && <CancelRoundedIcon style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
					/>
					<Button variant="contained">Search</Button>
				</Stack>

				{/* Dropdown Filters */}
				<Stack spacing={2} className="filter-box__dropdowns">
					{/* Price */}
					<FormControl fullWidth size="small">
						<Typography fontWeight={500}>Price (in MLN)</Typography>
						<Slider
							value={price}
							onChange={(e, val) => setPrice(val as number[])}
							valueLabelDisplay="auto"
							min={10_000_000}
							max={300_000_000}
							step={1_000_000}
						/>
					</FormControl>

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
					<Typography fontWeight={500}>Year</Typography>
					<Slider
						value={year}
						onChange={(e, val) => setYear(val as number[])}
						valueLabelDisplay="auto"
						min={2010}
						max={2026}
						step={1}
					/>

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

				{/* Reset */}
				<Stack alignItems="flex-end" className="filter-box__reset">
					<Tooltip title="Reset Filters">
						<IconButton onClick={handleClear}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Stack>
		);
	}
};

export default CarFilter;
