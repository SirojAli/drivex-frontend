import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button, Tooltip, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { CarsInquiry } from '../../types/car/car.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { CarBrand, CarFuelType, CarType } from '../../enums/car.enum';
import RefreshIcon from '@mui/icons-material/Refresh';

interface HeaderFilterProps {
	initialInput: CarsInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();

	const [searchFilter, setSearchFilter] = useState<CarsInquiry>(initialInput);
	const brandRef: any = useRef();
	const typeRef: any = useRef();
	const fuelTypeRef: any = useRef();

	const [openBrand, setOpenBrand] = useState(false);
	const [openType, setOpenType] = useState(false);
	const [openFuelType, setOpenFuelType] = useState(false);

	const [carBrand, setCarBrand] = useState<CarBrand[]>(Object.values(CarBrand));
	const [carType, setCarType] = useState<CarType[]>(Object.values(CarType));
	const [carFuelType, setCarFuelType] = useState<CarFuelType[]>(Object.values(CarFuelType));

	const [optionCheck, setOptionCheck] = useState('all');

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			if (!brandRef?.current?.contains(event.target)) {
				setOpenBrand(false);
			}

			if (!typeRef?.current?.contains(event.target)) {
				setOpenType(false);
			}

			if (!fuelTypeRef?.current?.contains(event.target)) {
				setOpenFuelType(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/
	const brandStateChangeHandler = () => {
		setOpenBrand((prev) => !prev);
		setOpenFuelType(false);
		setOpenType(false);
	};

	const typeStateChangeHandler = () => {
		setOpenType((prev) => !prev);
		setOpenBrand(false);
		setOpenFuelType(false);
	};

	const fuelStateChangeHandler = () => {
		setOpenFuelType((prev) => !prev);
		setOpenType(false);
		setOpenBrand(false);
	};

	const disableAllStateHandler = () => {
		setOpenFuelType(false);
		setOpenType(false);
		setOpenBrand(false);
	};

	const carBrandSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						carBrand: [value],
					},
				});
				typeStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, carBrandSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						carType: [value],
					},
				});
				fuelStateChangeHandler();
			} catch (err: any) {
				console.log('ERROR, carTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carFuelTypeSelectHandler = useCallback(
		async (value: any) => {
			try {
				setSearchFilter({
					...searchFilter,
					search: {
						...searchFilter.search,
						carFuelType: [value],
					},
				});
				disableAllStateHandler();
			} catch (err: any) {
				console.log('ERROR, carFuelTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const carTypeQuickSelectHandler = (type: string) => {
		const updatedFilter: CarsInquiry = {
			...initialInput,
			search: {
				...initialInput.search,
				carType: [type as CarType],
			},
		};

		router.push(`/car?input=${JSON.stringify(updatedFilter)}`, `/car?input=${JSON.stringify(updatedFilter)}`);
	};

	const resetFilterHandler = () => {
		setSearchFilter(initialInput);
		setOptionCheck('all');
	};

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.carBrand?.length == 0) {
				delete searchFilter.search.carBrand;
			}

			if (searchFilter?.search?.carType?.length == 0) {
				delete searchFilter.search.carType;
			}

			if (searchFilter?.search?.carFuelType?.length == 0) {
				delete searchFilter.search.carFuelType;
			}

			await router.push(`/car?input=${JSON.stringify(searchFilter)}`, `/car?input=${JSON.stringify(searchFilter)}`);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	return (
		<>
			<Stack className={'header-box'}>
				<Stack className={'header-text'}>
					<p className={'bold'}>Find Your Perfect Car Today</p>
					{/* <span className={'short'}>Explore Cars from Leading Global Brands</span> */}
					<span className={'short'}>Discover New Models from Brands You Love</span>
					<Box className={'detail'}>
						<Link href={'/car'} className={'p'}>
							Get Started
						</Link>
					</Box>
				</Stack>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={`box ${openBrand ? 'on' : ''}`} onClick={brandStateChangeHandler}>
							<span>{searchFilter?.search?.carBrand ? searchFilter?.search?.carBrand[0] : 'Car Make'} </span>
							<ExpandMoreIcon />
						</Box>

						<Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
							<span> {searchFilter?.search?.carType ? searchFilter?.search?.carType[0] : 'Car type'} </span>
							<ExpandMoreIcon />
						</Box>

						<Box className={`box ${openFuelType ? 'on' : ''}`} onClick={fuelStateChangeHandler}>
							<span>
								{searchFilter?.search?.carFuelType ? `${searchFilter?.search?.carFuelType[0]}}` : 'Fuel Type'}
							</span>
							<ExpandMoreIcon />
						</Box>

						{/*MENU */}
						<div className={`filter-brand ${openBrand ? 'on' : ''}`} ref={brandRef}>
							{carBrand.map((brand: string) => {
								return (
									<div onClick={() => carBrandSelectHandler(brand)} key={brand}>
										<img src={`img/banner/brands/${brand}.png`} alt="" loading="lazy" />
										<span>{brand}</span>
									</div>
								);
							})}
						</div>

						<div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
							{carType.map((type: string) => {
								return (
									<div
										style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.jpg)` }}
										onClick={() => carTypeSelectHandler(type)}
										key={type}
									>
										<span>{type}</span>
									</div>
								);
							})}
						</div>

						<div className={`filter-fuels ${openFuelType ? 'on' : ''}`} ref={fuelTypeRef}>
							{carFuelType.map((fuelType: string) => {
								return (
									<span onClick={() => carFuelTypeSelectHandler(fuelType)} key={fuelType}>
										{fuelType}
									</span>
								);
							})}
						</div>

						<div className={'bottom'}>
							<div onClick={resetFilterHandler} className={'reset-btn'}>
								<Tooltip title="Reset Filters">
									<IconButton>
										<RefreshIcon className={'reset'} />
									</IconButton>
								</Tooltip>
							</div>
							<Box onClick={pushSearchHandler} className={'search-btn'}>
								<span>Search</span>
								<SearchIcon className={'btn'} />
							</Box>
						</div>
					</Stack>
					<Stack className={'search-logo'}>
						{[
							{ name: 'SUV', image: 'suv.png' },
							{ name: 'Coupe', image: 'convertible.png' },
							{ name: 'Crossover', image: 'crossover.png' },
							{ name: 'Sedan', image: 'sedan.png' },
						].map((item) => (
							<Box key={item.name} className={'logo'} onClick={() => carTypeQuickSelectHandler(item.name)}>
								<img src={`/img/types/${item.image}`} alt={item.name} loading="lazy" />
								<span>{item.name}</span>
							</Box>
						))}
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {},
	},
};

export default HeaderFilter;
