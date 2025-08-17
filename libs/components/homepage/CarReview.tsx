import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import CarReviewCard from './CarReviewCard';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from 'next/link';

const CarReview = () => {
	const [carReview, setCarReview] = useState<number[]>([1, 2, 3]);

	return (
		<Stack className={'car-review'}>
			<Stack className={'container'}>
				<Box className={'review-text'}>
					<h2>News, reviews & Video</h2>
					<Link
						href={{
							pathname: '/community',
							query: { articleCategory: 'REVIEWS' },
						}}
						passHref
					>
						<div className={'view-all'} style={{ cursor: 'pointer' }}>
							<p>View all</p>
							<ArrowRightAltIcon className={'arrow'} />
						</div>
					</Link>
				</Box>

				<Box className={'review-swiper-container'}>
					<div className={'switch-btn swiper-review-prev'}>
						<ArrowBackIosNewIcon />
					</div>

					<Swiper
						className={'review-swiper'}
						slidesPerView={'auto'}
						spaceBetween={30}
						modules={[Autoplay, Navigation]}
						navigation={{
							nextEl: '.swiper-review-next',
							prevEl: '.swiper-review-prev',
						}}
						loop={true}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
					>
						{carReview.map((id: number) => (
							<SwiperSlide key={id}>
								<CarReviewCard index={id} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className={'switch-btn swiper-review-next'}>
						<ArrowBackIosNewIcon />
					</div>
				</Box>
			</Stack>
		</Stack>
	);
};

export default CarReview;
