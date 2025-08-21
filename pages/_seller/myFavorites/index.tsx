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
import {
	sweetErrorHandling,
	sweetMixinErrorAlert,
	sweetMixinSuccessAlert,
	sweetTopSmallSuccessAlert,
} from '../../../libs/sweetAlert';
import { CREATE_CAR, LIKE_TARGET_CAR, UPDATE_CAR } from '../../../apollo/user/mutation';
import { CarInput } from '../../../libs/types/car/car.input';
import { CarBrand, CarDriveType, CarFuelType, CarTransmission, CarType } from '../../../libs/enums/car.enum';
import { GET_CAR, GET_FAVORITES } from '../../../apollo/user/query';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CarCard from '../../../libs/components/car/CarCard';
import { Car } from '../../../libs/types/car/car';
import { T } from '../../../libs/types/common';
import { Message } from '../../../libs/enums/common.enum';

const MyFavorites: NextPage = ({ initialInquiry, ...props }: any) => {
	const [myFavorites, setMyFavorites] = useState<Car[]>([]);
	const [total, setTotal] = useState<number>(0);
	const [searchFavorites, setSearchFavorites] = useState<T>({ page: 1, limit: 9 });

	/** APOLLO REQUESTS **/
	const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

	const {
		loading: getFavoritesLoading,
		data: getFavoritesData,
		error: getFavoritesError,
		refetch: getFavoritesRefetch,
	} = useQuery(GET_FAVORITES, {
		fetchPolicy: 'network-only',
		variables: { input: searchFavorites },
		notifyOnNetworkStatusChange: true,
		onCompleted(data: T) {
			setMyFavorites(data.getFavorites?.list || []);
			setTotal(data.getFavorites?.metaCounter?.[0]?.total || 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFavorites({ ...searchFavorites, page: value });
	};

	const likeCarHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetCar({ variables: { input: id } });

			await getFavoritesRefetch({ input: searchFavorites });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.error('ERROR, likeCarHandler: ', err.message);
			await sweetMixinErrorAlert(err.message);
		}
	};
	return (
		<div className={'my-favorites'}>
			<h2 className={'dash-title'} style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}>
				My Favorites
			</h2>
			<Stack className={'fav-boxes'}>
				<Stack className="favorites-list-box">
					{myFavorites.length ? (
						myFavorites.map((car: Car) => (
							<CarCard
								key={car._id}
								car={car}
								allCars={myFavorites}
								likeCarHandler={likeCarHandler}
								myFavorites={true}
							/>
						))
					) : (
						<div className="no-data">
							<img src="/img/icons/icoAlert.svg" alt="No favorites" />
							<p>No Favorites found!</p>
						</div>
					)}
				</Stack>

				{myFavorites.length > 0 && (
					<Stack className="pagination-config">
						<Stack className="pagination-box">
							<Pagination
								count={Math.ceil(total / searchFavorites.limit)}
								page={searchFavorites.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
						</Stack>
						<Stack className="total-result">
							<Typography>Total {total} favorite cars</Typography>
						</Stack>
					</Stack>
				)}
			</Stack>
		</div>
	);
};

export default withSellerLayout(MyFavorites);
