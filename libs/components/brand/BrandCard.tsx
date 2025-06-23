import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface CarCard {
	name: string;
	location: string;
	phone: string;
	views: string;
	likes: number;
	image: string;
}

interface BrandCardProps {
	cars: CarCard[];
}

const BrandCard: React.FC<BrandCardProps> = ({ cars }) => {
	return (
		<div className={'brand-config'}>
			<div className={'car-boxes'}>
				{cars.map((car, idx) => (
					<div className={'car-box'} key={idx}>
						<div className={'car-img'}>
							<img src={car.image} alt={car.name} />
						</div>
						<div className={'car-info'}>
							<div className={'main-info'}>
								<div className={'main-stage'}>
									<div className={'car-name'}>
										<div>{car.name}</div>
									</div>
									<div className={'like-button'}>
										<FavoriteIcon className={'like-icon'} />
									</div>
								</div>
								<div className={'second-stage'}>
									<div className={'car-location'}>
										<div>{car.location}</div>
									</div>
									<div className={'car-contact'}>
										<div>{car.phone}</div>
									</div>
								</div>
							</div>
							<div className={'rating-info'}>
								<div className={'rating'}>⭐⭐⭐⭐⭐</div>
								<div className={'rating-meta'}>
									<div className={'like'}>
										<div className={'like-count'}>{car.likes}</div>
										<div className={'like-icon-wrapper'}>
											<FavoriteIcon className={'mui-icon'} />
										</div>
									</div>
									<div className={'divider'}></div>
									<div className={'view'}>
										<div className={'view-count'}>{car.views}</div>
										<div className={'view-icon-wrapper'}>
											<VisibilityIcon className={'mui-icon'} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BrandCard;
