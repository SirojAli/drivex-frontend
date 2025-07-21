import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Car } from '../../types/car/car';
import { Member } from '../../types/member/member';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography } from '@mui/material';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';

interface BrandCardProps {
	seller: any;
	likeMemberHandler: any;
}

const BrandCard = (props: BrandCardProps) => {
	const { seller, likeMemberHandler } = props;
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	const imagePath: string = seller?.memberImage
		? `${REACT_APP_API_URL}/${seller?.memberImage}`
		: '/img/profile/defaultUser.png';
	const isLiked = seller?.isLikedByCurrentUser;

	/** HANDLERS **/
	const pushDetailHandler = async (memberId: string, brandName: string) => {
		await router.push({
			pathname: '/brand/detail',
			query: {
				id: memberId,
				brand: brandName,
			},
		});
	};

	if (device === 'mobile') {
		return <div>BRAND CARD</div>;
	} else {
		return (
			<div className="car-box" onClick={() => pushDetailHandler(seller._id, seller.memberNick)}>
				<div className="car-img">
					<img src={imagePath} alt="brand-img" />
				</div>
				<div className="car-info">
					<div className="main-info">
						<div className="main-stage">
							<div className="car-name">
								<div>{seller?.memberNick}</div>
							</div>
							<div
								className="like-button"
								onClick={(e) => {
									e.stopPropagation();
									likeMemberHandler(user, seller?._id);
								}}
							>
								<FavoriteIcon
									className="like-icon"
									style={{
										color: isLiked ? '#dc3545' : 'white',
									}}
								/>
							</div>
						</div>
						<div className="second-stage">
							<div className="car-location">
								<div>{seller?.memberAddress}</div>
							</div>
							<div className="car-contact">
								<div>{seller?.memberPhone}</div>
							</div>
						</div>
					</div>
					<div className="rating-info">
						<div className="rating">⭐⭐⭐⭐⭐</div>
						<div className="rating-meta">
							<div className="like">
								<div className="like-count">{seller?.memberLikes}</div>
								<div className="like-icon-wrapper">
									<FavoriteIcon className="mui-icon" />
								</div>
							</div>
							<div className="divider"></div>
							<div className="view">
								<div className="view-count">{seller?.memberViews}</div>
								<div className="view-icon-wrapper">
									<VisibilityIcon className="mui-icon" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default BrandCard;
