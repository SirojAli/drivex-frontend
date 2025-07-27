import React from 'react';
import { Stack, Box } from '@mui/material';
import { Member } from '../../types/member/member';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../config';

interface TopBrandCardProps {
	seller: Member;
	likeMemberdHandler: any;
}

const TopBrandCard = (props: TopBrandCardProps) => {
	const { seller, likeMemberdHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const pushDetailHandler = async (memberId: string) => {
		console.log('memberId:', memberId);
		await router.push({
			pathname: '/brand/detail',
			query: { id: memberId },
		});
	};

	if (device === 'mobile') {
		return <h1>HOMEPAGE - TOP BRANDS</h1>;
	} else {
		return (
			<Stack className={'top-brand-card'}>
				<Stack
					className={'brand-box'}
					key={seller._id}
					onClick={() => {
						pushDetailHandler(seller._id);
					}}
				>
					<div className={'brand-logo-wrapper'}>
						<img
							src={seller?.memberImage ? `${REACT_APP_API_URL}/${seller?.memberImage}` : '/img/profile/defaultUser.png'}
							alt="brand-name"
							loading="lazy"
						/>
					</div>
					<Box className={'brand-info'}>
						<p className={'brand-name'}>{seller.memberNick}</p>
						<span className={'brand-total'}>{seller.memberCars} Cars</span>
					</Box>
				</Stack>
			</Stack>
		);
	}
};

export default TopBrandCard;
