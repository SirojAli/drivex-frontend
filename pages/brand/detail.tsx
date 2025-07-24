import React, { useState, ChangeEvent, useEffect } from 'react';
import { NextPage } from 'next';
import { Stack, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CarCard from '../../libs/components/car/CarCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { CarsInquiry } from '../../libs/types/car/car.input';
import { Message } from '../../libs/enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { useRouter } from 'next/router';
import { LIKE_TARGET_CAR } from '../../apollo/user/mutation';
import { Car } from '../../libs/types/car/car';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../libs/types/common';
import { GET_CARS } from '../../apollo/user/query';
import { Direction } from '../../libs/enums/common.enum';
import { CarBrand } from '../../libs/enums/car.enum';

interface BrandCarsProps {
	initialInput: CarsInquiry;
}

const BrandDetail: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [chosenBrandCars, setChosenBrandCars] = useState<Car[]>([]);
	const [inputState, setInputState] = useState<CarsInquiry>(initialInput);
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState('');
	const [brandName, setBrandName] = useState<string>('');
	const [activeFilter, setActiveFilter] = useState<string>('Featured');

	/** SET BRAND NAME FROM QUERY **/
	useEffect(() => {
		const brandFromQuery = router.query.brand;
		if (brandFromQuery && typeof brandFromQuery === 'string') {
			setBrandName(brandFromQuery.toUpperCase());
			setInputState((prev) => ({
				...prev,
				search: { ...prev.search, carBrand: [brandFromQuery as CarBrand] },
			}));
		}
	}, [router.query.brand]);

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: inputState },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getCars?.list && Array.isArray(data.getCars.list)) {
				setChosenBrandCars(data.getCars.list);
			} else {
				setChosenBrandCars([]);
			}
		},
	});

	/** HANDLERS **/
	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await likeTargetCar({ variables: { input: id } });
			await getCarsRefetch({ input: inputState });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.log('ERROR, likeCarHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};

	const handleSearchSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const newInput = {
			...inputState,
			search: {
				...inputState.search,
				carName: searchQuery,
			},
			page: 1,
		};
		setInputState(newInput);
		await getCarsRefetch({ input: newInput });
	};

	// FILTER TABS
	const filterMap: Record<string, Partial<CarsInquiry>> = {
		Featured: {
			sort: 'carViews',
			direction: Direction.DESC,
			search: {},
		},
		Popular: {
			sort: 'carLikes',
			direction: Direction.DESC,
			search: {},
		},
		New: {
			sort: 'carYear',
			direction: Direction.DESC,
			search: { carYear: 2025 },
		},
		Upcoming: {
			sort: 'carYear',
			direction: Direction.DESC,
			search: { carYear: 2026 },
		},
	};

	const handleFilterClick = async (filterKey: string) => {
		const filterUpdate = filterMap[filterKey];
		if (!filterUpdate) return;

		// Set the active filter for styling
		setActiveFilter(filterKey);

		// Merge the new filter values with existing ones
		setInputState((prev) => {
			const updatedSearch = {
				...(prev.search || {}),
				...(filterUpdate.search || {}),
			};

			const updatedInput: CarsInquiry = {
				...prev,
				sort: filterUpdate.sort || prev.sort,
				direction: filterUpdate.direction || prev.direction,
				search: updatedSearch,
				page: 1,
			};

			// Trigger Apollo refetch
			getCarsRefetch({ input: updatedInput });

			return updatedInput;
		});
	};

	const viewCarHandler = async () => {
		await router.push({
			pathname: '/car/detail',
		});
	};

	if (device === 'mobile') {
		return <Stack>CAR BRAND DETAIL MOBILE</Stack>;
	} else {
		return (
			<div id="brand-detail-page">
				<Stack className={'container-box'}>
					{/* Header */}
					<Box className={'brand-header'}>
						<h2 className={'brand-name'}>{chosenBrandCars[0]?.carBrand || brandName || 'Brand'}</h2>
					</Box>

					{/* Filter and Search */}
					<Box className={'filter-search-box'}>
						<Box className={'filter-box'}>
							{['Featured', 'Popular', 'New', 'Upcoming'].map((filter) => (
								<div
									key={filter}
									className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
									onClick={() => handleFilterClick(filter)}
								>
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
					<Box className={'car-list-box'}>
						<Stack className={'car-list'}>
							{chosenBrandCars?.length === 0 ? (
								<p>No cars found for this brand.</p>
							) : (
								chosenBrandCars.map((car, index) => <CarCard key={index} car={car} likeCarHandler={likeCarHandler} />)
							)}
						</Stack>
					</Box>
				</Stack>
			</div>
		);
	}
};

BrandDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 24,
		sort: 'carViews',
		direction: 'DESC',
		search: { carStatus: ['ACTIVE', 'SOLD'] },
	},
};

export default withLayoutBasic(BrandDetail);
