import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const cardData = [
	{
		image: '/img/cars/header1.jpg',
		title: '2024 Hyundai Staria Premium Review',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non egestas justo.',
	},
	{
		image: '/img/cars/header1.jpg',
		title: '2024 Toyota Fortuner Hybrid Review',
		description: 'Get ready for the next-gen Toyota Fortuner with hybrid tech.',
	},
	{
		image: '/img/cars/header1.jpg',
		title: '2024 Kia Seltos First Impressions',
		description: 'Here’s what’s new with the refreshed Kia Seltos.',
	},
];

const CarReviewCard = ({ index }: { index: number }) => {
	const { image, title, description } = cardData[index - 1];

	return (
		<Stack
			className={'review-card'}
			sx={{
				backgroundImage: `url(${image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Box className={'review-card-content'}>
				<h2>{title}</h2>
				<p>{description}</p>
				<div className={'review-btn'}>
					<p>Review detail</p>
				</div>
			</Box>
		</Stack>
	);
};

export default CarReviewCard;
