import React, { useEffect, useState } from 'react';
import { Box, Pagination, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';
import { Car } from '../../types/car/car';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { CarStatus } from '../../enums/car.enum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useRouter } from 'next/router';

interface SellerCarsProps {
	car: Car;
	onStatusChange?: (id: string, status: CarStatus) => void;
}

const SellerCarList = (props: SellerCarsProps) => {
	const { car, onStatusChange } = props;
	const [status, setStatus] = useState<CarStatus>(car.carStatus);
	const router = useRouter();

	const isSold = car.carStatus === CarStatus.SOLD;
	const isActive = car.carStatus === CarStatus.ACTIVE;
	const isDeleted = car.carStatus === CarStatus.DELETE;

	const formatPrice = (price: number) => {
		return `₩${price.toLocaleString('ko-KR')}`;
	};

	const handleChangeStatus = (newStatus: CarStatus) => {
		setStatus(newStatus);
		if (onStatusChange) onStatusChange(car._id, newStatus);
	};

	const pushDetailHandler = async (carId: string) => {
		if (car.carStatus === 'SOLD') return;
		await router.push({
			pathname: '/car/detail',
			query: { id: carId },
		});
	};

	return (
		<div className={'car-list-boxes'}>
			<Stack className={'cars-list'}>
				<Box className={'cars-items'}>
					<Box className={'cars-content'} onClick={() => pushDetailHandler(car._id)}>
						<Box className={'cars-img'}>
							<img src={`${REACT_APP_API_URL}/${car?.carImages[0]}`} alt={'Car'} loading="lazy" />
						</Box>
						<Box className={'cars-info'}>
							<h5>
								{car.carYear} {car.carModel}
							</h5>
							<p>{formatPrice(car.carPrice)}</p>
							<span>
								{car.carTransmission}, {car.carFuelType}
							</span>
						</Box>
					</Box>
					<div className={'divr'}></div>

					<Box className={'cars-status'}>
						{status === CarStatus.ACTIVE && (
							<Box className="status-active">
								<p className="active">Active</p>
							</Box>
						)}
						{status === CarStatus.SOLD && (
							<Box className="status-sold">
								<p className="sold">Sold</p>
							</Box>
						)}
						{status === CarStatus.DELETE && (
							<Box className="status-delete">
								<p className="delete">Delete</p>
							</Box>
						)}
					</Box>

					<div className={'divr'}></div>

					<Box className={'cars-date'}>
						<Moment format="MMMM D, YYYY">{car.createdAt}</Moment>
					</Box>
					<div className={'divr'}></div>

					<Box className={'cars-action'}>
						<Box
							className="cars-edit"
							onClick={() => handleChangeStatus(CarStatus.ACTIVE)}
							style={{ cursor: 'pointer' }}
						>
							<CheckCircleOutlineIcon className="icon" />
							<p>Active</p>
						</Box>

						<Box
							className="cars-sold"
							onClick={() => handleChangeStatus(CarStatus.SOLD)}
							style={{
								cursor: status === CarStatus.SOLD ? 'not-allowed' : 'pointer',
								opacity: status === CarStatus.SOLD ? 0.5 : 1,
							}}
						>
							<DoNotDisturbIcon className="icon" />
							<p>Sold</p>
						</Box>

						<Box
							className="cars-delete"
							onClick={() => handleChangeStatus(CarStatus.DELETE)}
							style={{ cursor: 'pointer' }}
						>
							<DeleteIcon className="icon" />
							<p>Delete</p>
						</Box>
					</Box>
				</Box>
				<div className={'divider'}></div>
			</Stack>
		</div>
	);
};

export default SellerCarList;
