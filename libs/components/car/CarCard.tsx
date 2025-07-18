import React, { useState } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CompareModalContent from './../../../pages/car/compare';

const CarCard = ({ car }: any) => {
	const [openCompare, setOpenCompare] = useState(false);

	const handleCompare = (status: boolean) => {
		setOpenCompare(status);
	};

	const dummyCars = [
		{
			year: 2024,
			featured: true,
			image: 'https://via.placeholder.com/300x200',
			type: 'Sedan',
			name: '2017 BMV X1 xDrive 20d xline',
			price: 73000,
			priceText: new Intl.NumberFormat('en-US').format(73000),
			fuel: 'Petrol',
			kms: '20,000 km',
		},
		{
			year: 2024,
			featured: true,
			image: 'https://via.placeholder.com/300x200',
			type: 'Sedan',
			name: '2017 BMV X1 xDrive 20d xline',
			price: 83000,
			priceText: new Intl.NumberFormat('en-US').format(83000),
			fuel: 'Petrol',
			kms: '10,000 km',
		},
	];

	return (
		<>
			<Stack className={'car-box'}>
				<Stack className={'img-box'}>
					<img src={car.image || '/img/cars/header1.jpg'} alt={car.name || 'Car'} />
					<div className={'img-feat'}>
						<span>Featured</span>
					</div>
					<FavoriteIcon className={'like-btn'} color={'primary'} />
					<CompareArrowsIcon className={'compare-btn'} onClick={() => handleCompare(true)} />
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

			{/* ✅ Compare Cars Modal */}
			<Modal
				open={openCompare}
				onClose={() => handleCompare(false)}
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						bgcolor: 'background.paper',
						borderRadius: '12px',
						boxShadow: 24,
						p: 3,
						width: 1120,
						maxHeight: '500px',
						overflowY: 'auto',
					}}
				>
					<CompareModalContent cars={dummyCars} />
				</Box>
			</Modal>
		</>
	);
};

export default CarCard;
