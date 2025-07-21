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

interface TrendCarsProps {
	initialInput: CarsInquiry;
}

const TrendCars = (props: TrendCarsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendCars, setTrendCars] = useState<Car[]>([]);
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
			setTrendCars(data?.getCars?.list);
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

	if (trendCars) console.log('trendCars: +++', trendCars);
	if (!trendCars) return null;

	if (device === 'mobile') {
		return <h1>HOMEPAGE - TREND CARS</h1>;
	} else {
		return (
			<Stack className={'trend-cars'}>
				<Stack className={'container'}>
					<Box className={'trend-text'}>
						<h2>Trend Cars</h2>
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

					<Stack className="trend-car-box">
						{trendCars.length === 0 ? (
							<Box className="empty-list">Trend Cars Empty</Box>
						) : (
							trendCars.map((car: Car) => <CarCard key={car._id} car={car} likeCarHandler={likeCarHandler} />)
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendCars.defaultProps = {
	initialInput: {
		page: 1,
		limit: 4,
		sort: 'carLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendCars;
