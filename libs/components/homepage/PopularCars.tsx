import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CarCard from '../car/CarCard';
import { CarsInquiry } from '../../types/car/car.input';
import { Car, Cars } from '../../types/car/car';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { LIKE_TARGET_CAR } from '../../../apollo/user/mutation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CARS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

interface PopularCarsProps {
	initialInput: CarsInquiry;
}

const PopularCars = (props: PopularCarsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularCars, setPopularCars] = useState<Car[]>([]);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

	const {
		loading: getCarsLoading,
		data: getCarsData,
		error: getCarsError,
		refetch: getCarsRefetch,
	} = useQuery(GET_CARS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			if (data?.getCars?.list && Array.isArray(data.getCars.list)) {
				setPopularCars(data.getCars.list);
			} else {
				setPopularCars([]);
			}
		},
	});

	/** HANDLERS **/
	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
			await likeTargetCar({
				variables: { input: id },
			});
			await getCarsRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.log('ERROR, likeCarHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const viewCarsHandler = async () => {
		await router.push({
			pathname: '/car',
		});
	};

	if (popularCars) console.log('popularCars: +++', popularCars);
	if (!popularCars) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-cars'}>
				<Stack className={'container'}>
					<Box className={'popular-text'}>
						<h2>Popular Cars</h2>
					</Box>
					<Stack className={'popular-car-box'}>
						{popularCars.length === 0 ? (
							<Box className="empty-list">Popular Cars Empty</Box>
						) : (
							<Swiper
								className={'popular-car-swiper'}
								slidesPerView={1}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{popularCars.map((car: Car) => (
									<SwiperSlide key={car._id} className={'popular-car-slide'}>
										<CarCard car={car} allCars={popularCars} likeCarHandler={likeCarHandler} />
									</SwiperSlide>
								))}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'popular-cars'}>
				<Stack className={'container'}>
					<Box className={'popular-text'}>
						<h2>Popular Cars</h2>
						<div
							className={'view-all'}
							onClick={() => {
								viewCarsHandler();
							}}
						>
							<p>View all</p>
							<ArrowRightAltIcon className={'arrow'} />
						</div>
					</Box>

					<Stack className={'popular-car-box'}>
						{popularCars.length === 0 ? (
							<Box className="empty-list">Popular Cars Empty</Box>
						) : (
							popularCars.map((car: Car) => (
								<CarCard key={car._id} car={car} allCars={popularCars} likeCarHandler={likeCarHandler} />
							))
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 4,
		sort: 'carViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularCars;
