import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Button,
	FormControl,
	Select,
	MenuItem,
	Slider,
	Box,
	SelectChangeEvent,
} from '@mui/material';
import { CarISearch, CarsInquiry } from '../../types/car/car.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { CarBrand, CarType, CarFuelType, CarTransmission, CarDriveType, CarColor } from '../../enums/car.enum';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Tooltip from '@mui/material/Tooltip';
import { Divider } from '@mui/material';

type FilterType = {
	searchFilter: CarsInquiry;
	setSearchFilter: any;
	initialInput: CarsInquiry;
};

const CarFilter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();

	const [carBrands, setCarBrands] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carTypes, setCarTypes] = useState<CarType[]>(Object.values(CarType));
	const [carFuelTypes, setCarFuelTypes] = useState<CarFuelType[]>(Object.values(CarFuelType));
	const [carTransmissions, setCarTransmissions] = useState<CarTransmission[]>(Object.values(CarTransmission));
	const [carDriveTypes, setCarDriveTypes] = useState<CarDriveType[]>(Object.values(CarDriveType));
	const [carColor, setCarColor] = useState<CarColor[]>(Object.values(CarColor));

	const [searchText, setSearchText] = useState<string>('');

	const getInitialPriceRange = (input: CarsInquiry): number[] => [
		input.search.carPrice?.min ? input.search.carPrice.min / 1_000_000 : 10,
		input.search.carPrice?.max ? input.search.carPrice.max / 1_000_000 : 300,
	];
	const [priceRange, setPriceRange] = useState<number[]>(getInitialPriceRange(searchFilter));

	const getInitialYearRange = (input: CarsInquiry): number[] => [
		input.search.carYear?.min ? Number(input.search.carYear.min) : 2010,
		input.search.carYear?.max ? Number(input.search.carYear.max) : 2026,
	];
	const [yearRange, setYearRange] = useState<number[]>(getInitialYearRange(searchFilter));

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
	useEffect(() => {
		if (!searchFilter?.search) return;

		const keysToCheck = [
			'brandList',
			'typeList',
			'fuelTypeList',
			'transmissionList',
			'driveTypeList',
			'doorsList',
			'seatsList',
			'colorList',
		] as const;

		type Key = typeof keysToCheck[number];

		const cleanedSearch: CarISearch = { ...searchFilter.search };

		let hasDeleted = false;

		keysToCheck.forEach((key: Key) => {
			const value = cleanedSearch[key];
			if (Array.isArray(value) && value.length === 0) {
				delete cleanedSearch[key];
				hasDeleted = true;
			}
		});

		if (hasDeleted) {
			const cleanedFilter: CarsInquiry = {
				...searchFilter,
				search: cleanedSearch,
			};

			router.push(`/car?input=${encodeURIComponent(JSON.stringify(cleanedFilter))}`, undefined, {
				scroll: false,
			});
		}
	}, [searchFilter, router]);

	/** HANDLERS **/

	const handlePriceChange = (event: Event, newValue: number | number[]) => {
		const [min, max] = newValue as number[];

		setPriceRange([min, max]);

		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				carPrice: {
					min: min * 1_000_000,
					max: max * 1_000_000,
				},
			},
			page: 1,
		};

		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const handleYearChange = (event: Event, newValue: number | number[]) => {
		const [min, max] = newValue as number[];

		setYearRange([min, max]);

		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				carYear: {
					min,
					max,
				},
			},
			page: 1,
		};

		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

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
				text: searchText.trim(),
			},
			page: 1,
		};
		setSearchFilter(newInput);
		await getCarsRefetch({ input: newInput });
	};

	const resetAllFiltersHandler = () => {
		setSearchText('');
		setSearchFilter(initialInput);
		setPriceRange(getInitialPriceRange(initialInput));
		setYearRange(getInitialYearRange(initialInput));
		getCarsRefetch({ input: initialInput });
	};

	const carBrandSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;

		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				brandList: selected ? [selected as CarBrand] : [],
			},
			page: 1,
		};

		setSearchFilter(updatedFilter);

		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const carTypeSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;

		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				typeList: selected ? [selected as CarType] : [],
			},
			page: 1,
		};

		setSearchFilter(updatedFilter);

		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const carFuelTypeSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;
		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				fuelTypeList: selected ? [selected as CarFuelType] : [],
			},
			page: 1,
		};
		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const carTransmissionSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;
		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				transmissionList: selected ? [selected as CarTransmission] : [],
			},
			page: 1,
		};
		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const carDriveTypeSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;
		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				driveTypeList: selected ? [selected as CarDriveType] : [],
			},
			page: 1,
		};
		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const doorsSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;
		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				doorsList: selected ? [Number(selected)] : [],
			},
			page: 1,
		};
		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const seatsSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value;
		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				seatsList: selected ? [Number(selected)] : [],
			},
			page: 1,
		};
		setSearchFilter(updatedFilter);
		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	const colorSelectHandler = (event: SelectChangeEvent<string>) => {
		const selected = event.target.value as CarColor;

		const updatedFilter: CarsInquiry = {
			...searchFilter,
			search: {
				...searchFilter.search,
				colorList: selected ? [selected] : [],
			},
			page: 1,
		};

		setSearchFilter(updatedFilter);

		router.push(`/car?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`, undefined, {
			scroll: false,
		});
	};

	if (device === 'mobile') {
		return <Stack>CARS FILTER</Stack>;
	} else {
		return (
			<Stack className="filter-box">
				{/* Header */}
				<Stack className={'find-your-car'} mb={'40px'}>
					<Stack direction="row" justifyContent="space-between" alignItems="center" mb="20px">
						<Typography className="title-main">Find Your Car</Typography>
						<Tooltip title="Reset All">
							<Button
								variant="outlined"
								color="secondary"
								onClick={resetAllFiltersHandler}
								aria-label="Reset All Filters"
							>
								<RestartAltIcon />
							</Button>
						</Tooltip>
					</Stack>
					<Box className={'search-box'}>
						<form className={'search-form'} onSubmit={searchHandler}>
							<input
								type="search"
								placeholder="Search car"
								className={'search-input'}
								value={searchText}
								onChange={(e) => setSearchText(e.target.value)}
								onKeyDown={async (event) => {
									if (event.key === 'Enter') {
										event.preventDefault();
										const newInput = {
											...searchFilter,
											search: { ...searchFilter.search, text: searchText.trim() },
											page: 1,
										};
										setSearchFilter(newInput);
										await getCarsRefetch({ input: newInput });
									}
								}}
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
					<FormControl fullWidth size="small">
						<Typography fontWeight={500} gutterBottom>
							Price (10M ~ 300M)
						</Typography>
						<Slider
							value={priceRange}
							onChange={handlePriceChange}
							valueLabelDisplay="auto"
							min={10}
							max={300}
							step={1}
							valueLabelFormat={(value) => `₩${value.toLocaleString()}M`}
						/>
					</FormControl>

					{/* Year */}
					<FormControl fullWidth size="small" sx={{ mt: 3 }}>
						<Typography fontWeight={500} gutterBottom>
							Year (2010 ~ 2026)
						</Typography>
						<Slider
							value={yearRange}
							onChange={handleYearChange}
							valueLabelDisplay="auto"
							min={2010}
							max={2026}
							step={1}
							valueLabelFormat={(value) => value.toString()}
						/>
					</FormControl>

					<Divider sx={{ my: 2 }} />
					<Typography variant="subtitle2" color="textSecondary" gutterBottom>
						Make & Body Type
					</Typography>
					{/* Make */}
					<FormControl fullWidth>
						<Select
							labelId="car-brand-label"
							value={searchFilter.search.brandList?.[0] ?? ''}
							onChange={carBrandSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Brands</MenuItem>
							{Object.values(CarBrand).map((brand) => (
								<MenuItem key={brand} value={brand}>
									{brand}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Body Type */}
					<FormControl fullWidth size="small">
						<Select
							labelId="car-type-label"
							value={searchFilter.search.typeList?.[0] ?? ''}
							onChange={carTypeSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Body Types</MenuItem>
							{carTypes.map((type) => (
								<MenuItem key={type} value={type}>
									{type}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Divider sx={{ my: 2 }} />
					<Typography variant="subtitle2" color="textSecondary" gutterBottom>
						Technical Specs
					</Typography>
					{/* Fuel Type */}
					<FormControl fullWidth size="small">
						<Select
							label="Fuel"
							value={searchFilter.search.fuelTypeList?.[0] ?? ''}
							onChange={carFuelTypeSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Fuel Types</MenuItem>
							{carFuelTypes.map((fuel) => (
								<MenuItem key={fuel} value={fuel}>
									{fuel}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Transmission */}
					<FormControl fullWidth size="small">
						<Select
							label="Transmission"
							value={searchFilter.search.transmissionList?.[0] ?? ''}
							onChange={carTransmissionSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Transmissions</MenuItem>
							{carTransmissions.map((trans) => (
								<MenuItem key={trans} value={trans}>
									{trans}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Drive Type */}
					<FormControl fullWidth size="small">
						<Select
							label="Drive"
							value={searchFilter.search.driveTypeList?.[0] ?? ''}
							onChange={carDriveTypeSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Drive Types</MenuItem>
							{carDriveTypes.map((drive) => (
								<MenuItem key={drive} value={drive}>
									{drive}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Divider sx={{ my: 2 }} />
					<Typography variant="subtitle2" color="textSecondary" gutterBottom>
						Physical Specs
					</Typography>
					{/* Doors */}
					<FormControl fullWidth size="small">
						<Select
							label="Doors"
							value={searchFilter.search.doorsList?.[0]?.toString() ?? ''}
							onChange={doorsSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Doors</MenuItem>
							{[2, 3, 4, 5].map((num) => (
								<MenuItem key={num} value={num.toString()}>
									{num}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Seats */}
					<FormControl fullWidth size="small">
						<Select
							label="Seats"
							value={searchFilter.search.seatsList?.[0]?.toString() ?? ''}
							onChange={seatsSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Seats</MenuItem>
							{[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
								<MenuItem key={num} value={num.toString()}>
									{num}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Color */}
					<FormControl fullWidth size="small">
						<Select
							label="Color"
							value={searchFilter.search.colorList?.[0] ?? ''}
							onChange={colorSelectHandler}
							displayEmpty
						>
							<MenuItem value="">Colors</MenuItem>
							{carColor.map((color) => (
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
