import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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

interface TopSellerProps {
	initialInput: SellersInquiry;
}

const TopBrands = (props: TopSellerProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topSellers, setTopSellers] = useState<Member[]>([]);
	const router = useRouter();

	// DEBUG: log initial input received
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
			// console.log('getSellers list:', data?.getSellers?.list);
			// console.log('total sellers:', data?.getSellers?.list?.length);
			setTopSellers(data?.getSellers?.list);
		},
	});

	/** HANDLERS **/
	const likeMemberdHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			// execution: likeTargetSeller Mutation
			await likeTargetMember({
				variables: { input: id },
			});

			// execution: getSellersRefetch
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

	// if (topSellers) console.log('topSellers: +++', topSellers);
	// if (!topSellers) return null;

	console.log('🔥 Rendering topSellers:', topSellers.length);
	console.table(topSellers);

	if (device === 'mobile') {
		return <h1>HOMEPAGE - TOP BRANDS</h1>;
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
