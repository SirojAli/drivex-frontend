import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Typography, Tooltip } from '@mui/material';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { Member } from '../../types/member/member';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import StarIcon from '@mui/icons-material/Star';

interface BrandCardProps {
	seller: Member;
	likeMemberHandler: (user: any, id: string) => Promise<void>;
	onClick?: () => void;
}

const BrandCard = ({ seller, likeMemberHandler }: BrandCardProps) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	const imagePath: string = seller?.memberImage
		? `${REACT_APP_API_URL}/${seller.memberImage}`
		: '/img/profile/defaultUser.png';
	const isLiked = seller?.meLiked;

	const pushDetailHandler = async (memberId: string, brandSlug: string) => {
		await router.push(`/brand/${seller.brandSlug}`);
	};

	if (device === 'mobile') {
		return <div>BRAND CARD</div>;
	} else {
		return (
			<Stack
				className={'seller-box'}
				onClick={() => seller.brandSlug && pushDetailHandler(seller._id, seller.brandSlug)}
			>
				<Stack className={'seller-img'}>
					<img src={imagePath} alt="brand-img" loading="lazy" />
				</Stack>
				<Stack className={'seller-info'}>
					<Box className={'main-info'}>
						<Box className={'main-stage'}>
							<div className={'seller-name'}>
								<Typography className={'name'}>{seller?.memberFullName}</Typography>
							</div>
							<div
								className={`action-btn like-btn ${seller?.meLiked && seller?.meLiked[0]?.myFavorite ? 'liked' : ''}`}
								onClick={(e) => {
									e.stopPropagation();
									likeMemberHandler(user, seller._id);
								}}
							>
								<FavoriteIcon className={'heart-icon'} />
							</div>
						</Box>
						<Box className={'second-stage'}>
							<div className={'seller-location'}>
								<LocationOnIcon fontSize="small" /> {seller?.memberAddress}
							</div>
							<div className={'seller-contact'}>
								<PhoneAndroidIcon fontSize="small" /> {seller?.memberPhone}
							</div>
						</Box>
					</Box>
					<Box className={'rating-info'}>
						<div className={'rating'}>
							{[...Array(5)].map((_, idx) => (
								<StarIcon key={idx} fontSize="small" />
							))}
						</div>
						<Box className={'rating-meta'}>
							<Box className={'like'}>
								<Typography className={'like-count'}>{seller?.memberLikes}</Typography>
								<FavoriteIcon className={'mui-icon'} />
							</Box>
							<div className={'divider'}></div>
							<Box className={'view'}>
								<Typography className={'view-count'}>{seller?.memberViews}</Typography>
								<VisibilityIcon className={'mui-icon'} />
							</Box>
						</Box>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default BrandCard;
