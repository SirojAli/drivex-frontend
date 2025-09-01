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
						brandList: [value],
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
						typeList: [value],
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
						fuelTypeList: [value],
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
				typeList: [type as CarType],
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
			if (searchFilter?.search?.brandList?.length == 0) {
				delete searchFilter.search.brandList;
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			if (searchFilter?.search?.fuelTypeList?.length == 0) {
				delete searchFilter.search.fuelTypeList;
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
					{/* <p className={'bold'}>Find Your Perfect Car Today</p> */}
					{/* <p className={'bold'}>Drive Your Dream Today</p> */}
					<p className={'bold'}>Drive Beyond Limits</p>

					{/* <span className={'short'}>Discover New Models from Brands You Love</span> */}
					{/* <span className={'short'}>Browse, Compare, and Drive with Confidence</span> */}
					<span className={'short'}>Explore the Cars that Move You</span>

					<Box className={'detail'}>
						<Link href={'/car'} className={'p'}>
							Get Started
						</Link>
					</Box>
				</Stack>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={`box ${openBrand ? 'on' : ''}`} onClick={brandStateChangeHandler}>
							<span>{searchFilter?.search?.brandList ? searchFilter?.search?.brandList[0] : 'Car Make'} </span>
							<ExpandMoreIcon />
						</Box>

						<Box className={`box ${openType ? 'on' : ''}`} onClick={typeStateChangeHandler}>
							<span> {searchFilter?.search?.typeList ? searchFilter?.search?.typeList[0] : 'Car type'} </span>
							<ExpandMoreIcon />
						</Box>

						<Box className={`box ${openFuelType ? 'on' : ''}`} onClick={fuelStateChangeHandler}>
							<span>
								{searchFilter?.search?.fuelTypeList ? `${searchFilter?.search?.fuelTypeList[0]}}` : 'Fuel Type'}
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
							{ name: 'COUPE', image: 'convertible.png' },
							{ name: 'CROSSOVER', image: 'crossover.png' },
							{ name: 'SEDAN', image: 'sedan.png' },
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
