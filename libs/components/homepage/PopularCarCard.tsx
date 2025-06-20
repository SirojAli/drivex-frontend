import React from 'react';
import { Stack, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const PopularCarCard = ({ car }: any) => {
	return (
		<Stack className={'car-box'}>
			<Stack className={'img-box'}>
				<img src={car.image || '/img/cars/header1.jpg'} alt={car.name || 'Car'} />
				<div className={'img-feat'}>
					<span>Featured</span>
				</div>
				<FavoriteIcon className={'like-btn'} color={'primary'} />
			</Stack>

			<Stack className={'car-info'}>
				<Box className={'car-content'}>
					<span className={'car-type'}>{car.type || 'Sedan'}</span>
					<p className={'car-name'}>{car.name || 'BMW X7 2020 Super Turbo'}</p>
					<div className={'car-category'}>
						<div className={'category'}>
							<img src="/img/icons/fuel.png" alt="fuel" />
							<span>{car.fuel || 'Petrol'}</span>
						</div>
						<div className={'category'}>
							<img src="/img/icons/auto.png" alt="transmission" />
							<span>{car.transmission || 'Auto'}</span>
						</div>
						<div className={'category'}>
							<img src="/img/icons/speed.png" alt="engine" />
							<span>{car.engine || '3.0 L'}</span>
						</div>
					</div>
					<div className={'car-price-btn'}>
						<span className={'price'}>{car.price || '$73,000'}</span>
						<div className={'view-like-btn'}>
							<div className={'view-btn'}>
								<RemoveRedEyeIcon className={'view'} />
								<span>{car.views || 10}</span>
							</div>
							<div className={'like-btn'}>
								<FavoriteIcon className={'like'} />
								<span>{car.likes || 20}</span>
							</div>
						</div>
					</div>
				</Box>
				<Box className={'divider'}></Box>
				<Box className={'car-logo'}>
					<Box className={'logo'}>
						<img src={car.logo || '/img/logo/BMW.png'} alt="brand" />
						<span>{car.brand || 'BMW'}</span>
					</Box>
					<Box className={'view-btn'}>
						<span>View Car</span>
					</Box>
				</Box>
			</Stack>
		</Stack>
	);
};

export default PopularCarCard;
