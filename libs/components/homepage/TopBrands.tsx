import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import TopBrandCard from './TopBrandCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const TopBrands = () => {
	const [topBrands, setTopBrands] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8]);

	return (
		<Stack className={'top-brands'}>
			<Stack className={'container'}>
				<Box className={'brand-text'}>
					<h2>Top Brands</h2>
					<div className={'view-all'}>
						<p>View all</p>
						<ArrowRightAltIcon className={'arrow'} />
					</div>
				</Box>

				{topBrands.length === 0 ? (
					<Box className={'empty-list'}>Top Brands Empty</Box>
				) : (
					<Swiper
						className={'brand-car-swiper'}
						slidesPerView={'auto'}
						spaceBetween={20}
						modules={[Autoplay, Navigation, Pagination]}
						navigation={{
							nextEl: '.swiper-brand-next',
							prevEl: '.swiper-brand-prev',
						}}
					>
						{topBrands.map((brand, index) => (
							<SwiperSlide key={index} className={'brand-slide'}>
								<TopBrandCard />
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</Stack>
		</Stack>
	);
};

export default TopBrands;
