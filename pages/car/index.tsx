import React, { useState, ChangeEvent, MouseEvent, useEffect } from 'react';
import { Stack, Box, Pagination, Button, Menu, MenuItem } from '@mui/material';
import { NextPage } from 'next';
import CarFilter from '../../libs/components/car/Filter';
import CarCard from '../../libs/components/car/CarCard';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { CarsInquiry } from '../../libs/types/car/car.input';
import { Message } from '../../libs/enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { LIKE_TARGET_CAR } from '../../apollo/user/mutation';
import { Car } from '../../libs/types/car/car';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../libs/types/common';
import { GET_CARS } from '../../apollo/user/query';
import { Direction } from '../../libs/enums/common.enum';
import { CarBrand } from '../../libs/enums/car.enum';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const CarList: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();

	const [allCars, setAllCars] = useState<Car[]>([]);
	const [searchFilter, setSearchFilter] = useState<CarsInquiry>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);

	const [total, setTotal] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(searchFilter.page ?? 1);

	const [activeFilter, setActiveFilter] = useState<string>('Featured');
	const [filterSortName, setFilterSortName] = useState('Default');

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [sortingOpen, setSortingOpen] = useState(false);

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_CARS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAllCars(data?.getCars?.list);
			setTotal(data?.getCars?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/

	/** HANDLERS **/
	const paginationHandler = async (event: ChangeEvent<unknown>, value: number) => {
		const updatedFilter = { ...searchFilter, page: value };
		setSearchFilter(updatedFilter);
		setCurrentPage(value);

		await router.push(`/car?input=${JSON.stringify(updatedFilter)}`, `/car?input=${JSON.stringify(updatedFilter)}`, {
			scroll: false,
		});
	};

	const sortingClickHandler = (e: MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget);
		setSortingOpen(true);
	};

	const sortingCloseHandler = () => {
		setSortingOpen(false);
		setAnchorEl(null);
	};

	const sortingHandler = (e: React.MouseEvent<HTMLLIElement>) => {
		const selected = e.currentTarget.id;
		const sortingOptions: Record<string, { sort: string; direction: Direction; label: string }> = {
			default: { sort: 'carViews', direction: Direction.DESC, label: 'Default' },
			new: { sort: 'createdAt', direction: Direction.DESC, label: 'New' },
			lowest: { sort: 'carPrice', direction: Direction.ASC, label: 'Lowest Price' },
			highest: { sort: 'carPrice', direction: Direction.DESC, label: 'Highest Price' },
		};

		if (sortingOptions[selected]) {
			const { sort, direction, label } = sortingOptions[selected];
			setSearchFilter({ ...searchFilter, sort, direction });
			setFilterSortName(label);
		}

		sortingCloseHandler();
	};

	const filterHandler = (filterKey: string) => {
		const filterMap: Record<string, Partial<CarsInquiry>> = {
			Featured: { sort: 'carViews', direction: Direction.DESC, search: {} },
			Popular: { sort: 'carLikes', direction: Direction.DESC, search: {} },
			New: { sort: 'carYear', direction: Direction.DESC, search: { carYear: { min: 2025, max: 2025 } } },
			Upcoming: { sort: 'carYear', direction: Direction.DESC, search: { carYear: { min: 2026, max: 2026 } } },
		};

		const filterUpdate = filterMap[filterKey];
		if (!filterUpdate) return;
		setActiveFilter(filterKey);

		const updatedInput: CarsInquiry = {
			...searchFilter,
			sort: filterUpdate.sort ?? undefined,
			direction: filterUpdate.direction ?? undefined,
			search: filterUpdate.search || {},
			page: 1,
		};

		setSearchFilter(updatedInput);
	};

	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execution: likeTargetCar Mutation
			await likeTargetCar({ variables: { input: id } });

			// execution: getCarsRefetch
			await getCarsRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.log('ERROR, likeCarHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

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

					{/* Main */}
					<Stack className={'main-list'}>
						{/* Filter */}
						<Stack>
							<CarFilter searchFilter={searchFilter} setSearchFilter={setSearchFilter} initialInput={initialInput} />
						</Stack>

						<Box className={'main-center'}>
							{/* Filter and Search */}
							<Box className={'filter-search-box'}>
								<Box className={'filter-box'}>
									{['Featured', 'Popular', 'New', 'Upcoming'].map((filter) => (
										<div
											key={filter}
											className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
											onClick={() => filterHandler(filter)}
										>
											<p>{filter}</p>
										</div>
									))}
								</Box>

								<Box className="sort-right">
									<span>Sort by</span>
									<Button onClick={sortingClickHandler} endIcon={<KeyboardArrowDownRoundedIcon />}>
										{filterSortName}
									</Button>
									<Menu
										anchorEl={anchorEl}
										open={sortingOpen}
										onClose={sortingCloseHandler}
										anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
										transformOrigin={{ vertical: 'top', horizontal: 'right' }}
										PaperProps={{
											sx: {
												mt: 1,
												boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 10px',
											},
										}}
									>
										<MenuItem id="new" onClick={sortingHandler}>
											New
										</MenuItem>
										<MenuItem id="lowest" onClick={sortingHandler}>
											Lowest Price
										</MenuItem>
										<MenuItem id="highest" onClick={sortingHandler}>
											Highest Price
										</MenuItem>
									</Menu>
								</Box>
							</Box>

							{/* Car List */}
							<Stack className={'car-list-box'}>
								{allCars.length === 0 ? (
									<Box className="empty-list">No cars available.</Box>
								) : (
									<Stack className="car-list">
										{allCars.map((car: Car, index: number) => (
											<CarCard car={car} likeCarHandler={likeCarHandler} key={car._id || `car-${index}`} />
										))}
									</Stack>
								)}

								<Stack className={'pagination-config'}>
									{allCars.length > 0 && (
										<Stack className="pagination-box">
											<Pagination
												page={currentPage}
												count={Math.ceil(total / searchFilter.limit)}
												onChange={paginationHandler}
												shape="circular"
												color="primary"
											/>
										</Stack>
									)}
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</Stack>
			</div>
		);
	}
};

CarList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 15,
		sort: 'carViews',
		direction: 'DESC',
		search: {
			carPrice: {
				min: 10000000,
				max: 300000000,
			},
			carYear: {
				min: 2010,
				max: 2026,
			},
		},
	},
};

export default withLayoutFull(CarList);
