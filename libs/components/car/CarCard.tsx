import React, { useState } from 'react';
import { Box, Stack, Modal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CompareModalContent from './../../../pages/car/compare';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Car } from '../../types/car/car';
import { REACT_APP_API_URL } from '../../../libs/config';

interface PopularCarCardProps {
	car: Car;
	likeCarHandler: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const CarCard = (props: PopularCarCardProps) => {
	const { car, likeCarHandler, myFavorites, recentlyVisited } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [openCompare, setOpenCompare] = useState(false);

	const handleCompare = (status: boolean) => {
		setOpenCompare(status);
	};

	const pushDetailHandler = async (carId: string) => {
		if (car.carStatus === 'SOLD') return;
		await router.push({
			pathname: '/car/detail',
			query: { id: carId },
		});
	};

	const formatPrice = (price: number) => {
		return `₩${price.toLocaleString('ko-KR')}`;
	};

	if (device === 'mobile') {
		return <h1>CAR CARD</h1>;
	} else {
		const isSold = car.carStatus === 'SOLD';

		return (
			<>
				<Stack
					className={'car-box'}
					sx={{
						pointerEvents: isSold ? 'none' : 'auto',
						cursor: isSold ? 'default' : 'pointer',
						userSelect: isSold ? 'none' : 'auto',
					}}
				>
					<Stack className={'img-box'}>
						<img src={`${REACT_APP_API_URL}/${car?.carImages[0]}`} alt={'Car'} loading="lazy" />

						{(() => {
							let badge: string | null = null;

							if (car.carYear === 2026) badge = 'Upcoming';
							else if (car.carYear === 2025) badge = 'New';
							else if (isSold) badge = 'Out of Stock';
							else if (car.carViews && car.carViews > 1000) badge = 'Featured';
							else if (car.carLikes && car.carLikes > 100) badge = 'Hot';

							if (!badge) return null;

							return (
								<div className={`img-badge badge-${badge.toLowerCase().replace(/\s/g, '-')}`}>
									<span>{badge}</span>
								</div>
							);
						})()}

						<div
							className={`action-btn like-btn ${
								myFavorites || (car?.meLiked && car?.meLiked[0]?.myFavorite) ? 'liked' : ''
							}`}
							onClick={() => likeCarHandler(user, car?._id)}
							style={{ cursor: 'pointer' }}
							title="Like"
						>
							<FavoriteIcon
								className="heart-icon"
								color={myFavorites || (car?.meLiked && car?.meLiked[0]?.myFavorite) ? 'error' : 'inherit'}
							/>
						</div>

						<div className="action-btn compare-btn" onClick={() => handleCompare(true)} title="Compare">
							<CompareArrowsIcon style={{ fill: '#FF7101' }} />
						</div>
					</Stack>

					<Stack className={'car-info'}>
						<Box className={'car-content'}>
							<span className={'car-type'}>{car.carType || 'Sedan'}</span>
							<p className={'car-name'}>
								{car.carYear} {car.carModel}
							</p>
							<div className={'car-category'}>
								<div className={'category'}>
									<img src={'/img/icons/fuel.png'} alt={'fuel'} />
									<span>{car.carFuelType}</span>
								</div>
								<div className={'category'}>
									<img src={'/img/icons/auto.png'} alt={'transmission'} />
									<span>{car.carTransmission}</span>
								</div>
								<div className={'category'}>
									<img src={'/img/icons/speed.png'} alt={'engine'} />
									<span>{car.carEngineSize} L</span>
								</div>
							</div>
							<div className={'car-price-btn'}>
								<span className={'price'}>{formatPrice(car.carPrice)}</span>

								{!recentlyVisited && (
									<div className={'view-like-btn'}>
										<div className={'view-btn'} title={'Views'}>
											<RemoveRedEyeIcon className={'view'} />
											<span>{car.carViews}</span>
										</div>
										<div
											className={'like-btn'}
											title={'Likes'}
											onClick={() => likeCarHandler(user, car?._id)}
											style={{ cursor: 'pointer' }}
										>
											<FavoriteIcon
												className={'like'}
												color={myFavorites || (car?.meLiked && car?.meLiked[0]?.myFavorite) ? 'error' : 'inherit'}
											/>
											<span>{car.carLikes}</span>
										</div>
									</div>
								)}
							</div>
						</Box>
						<Box className={'divider'} />
						<Box
							className={'car-logo'}
							sx={{
								cursor: isSold ? 'not-allowed' : 'pointer',
								opacity: isSold ? 0.6 : 1,
								position: 'relative',
							}}
							onClick={() => pushDetailHandler(car._id)}
						>
							<Box className={'logo'}>
								<img
									src={`/img/logo/${car.carBrand}.png`}
									alt={'logo'}
									onError={(e) => {
										(e.target as HTMLImageElement).src = '/img/logo/default.png';
									}}
								/>
								<span>{car.carBrand}</span>
							</Box>

							<Box className={'view-btn'}>
								<span>View Car</span>
							</Box>
						</Box>
					</Stack>
				</Stack>

				{/* Compare Cars Modal */}
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
						<CompareModalContent cars={[car]} />
					</Box>
				</Modal>
			</>
		);
	}
};

export default CarCard;
