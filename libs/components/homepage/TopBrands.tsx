import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import TopBrandCard from './TopBrandCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { SellersInquiry } from '../../types/member/member.input';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_MEMBER } from '../../../apollo/user/mutation';
import { GET_SELLERS } from '../../../apollo/user/query';
import { T } from '../../types/common';
import { Member } from '../../types/member/member';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { useRouter } from 'next/router';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TopSellerProps {
	initialInput: SellersInquiry;
}

const TopBrands = (props: TopSellerProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topSellers, setTopSellers] = useState<Member[]>([]);
	const router = useRouter();

	console.log('initialInput:', initialInput);

	/** APOLLO REQUESTS **/
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const {
		loading: getSellersLoading,
		data: getSellersData,
		error: getSellersError,
		refetch: getSellersRefetch,
	} = useQuery(GET_SELLERS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopSellers(data?.getSellers?.list);
		},
	});

	/** HANDLERS **/
	const likeMemberdHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetMember({
				variables: { input: id },
			});

			await getSellersRefetch({ input: initialInput });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.log('ERROR, likeSellerdHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const viewBrandsHandler = async () => {
		await router.push({
			pathname: '/brand',
		});
	};

	console.log('Rendering topSellers:', topSellers.length);
	console.table(topSellers);

	if (device === 'mobile') {
		return (
			<Stack className={'top-brands'}>
				<Box className="brand-text">
					<h2>Top Brands</h2>
				</Box>

				<Stack className="brands-list" spacing={2}>
					{topSellers.length === 0 ? (
						<Box className="empty-list">Top Brands Empty</Box>
					) : (
						<Swiper
							className={'top-brand-swiper'}
							// slidesPerView={3}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
							breakpoints={{
								320: { slidesPerView: 1 }, // very small mobile
								480: { slidesPerView: 2 }, // medium mobile
								768: { slidesPerView: 3 }, // tablet + desktop
							}}
						>
							{topSellers.map((seller: Member) => (
								<SwiperSlide key={seller._id} className={'top-brand-slide'}>
									<TopBrandCard seller={seller} likeMemberdHandler={likeMemberdHandler} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-brands'}>
				<Stack className={'container'}>
					<Box className={'brand-text'}>
						<h2>Top Brands</h2>
						<div
							className={'view-all'}
							onClick={() => {
								viewBrandsHandler();
							}}
						>
							<p>View all</p>
							<ArrowRightAltIcon className={'arrow'} />
						</div>
					</Box>

					{topSellers.length === 0 ? (
						<Box className={'empty-list'}>Top Brands Empty</Box>
					) : (
						<Swiper
							className={'brand-car-swiper'}
							slidesPerView={6}
							spaceBetween={20}
							loop={false}
							autoplay={false}
							modules={[Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-brand-next',
								prevEl: '.swiper-brand-prev',
							}}
						>
							{topSellers.map((seller: Member) => (
								<SwiperSlide className={'brand-slide'} key={seller?._id}>
									<TopBrandCard seller={seller} likeMemberdHandler={likeMemberdHandler} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</Stack>
			</Stack>
		);
	}
};

TopBrands.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'memberLikes',
		direction: 'DESC',
	},
};

export default TopBrands;
