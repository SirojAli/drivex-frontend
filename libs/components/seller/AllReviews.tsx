import React from 'react';
import Link from 'next/link';
import { Box, Stack, Avatar, Typography, Rating } from '@mui/material';

const reviews = [
	{
		name: 'Bessie Cooper',
		avatar: '/img/avatars/bessie.jpg',
		rating: 5,
		text: 'Maecenas eu lorem et urna accumsan vestibulum vel vitae magna.',
		time: '3 days ago',
		car: {
			id: 'bmw-x1',
			name: 'BMW X1 2022',
		},
	},
	{
		name: 'Annette Black',
		avatar: '/img/avatars/annette.jpg',
		rating: 4,
		text: 'Nullam rhoncus dolor arcu, et commodo tellus semper vitae.',
		time: '3 days ago',
		car: {
			id: 'audi-a6',
			name: 'Audi A6 2021',
		},
	},
	{
		name: 'Ralph Edwards',
		avatar: '/img/avatars/ralph.jpg',
		rating: 5,
		text: 'Vivamus viverra semper convallis. Integer vestibulum tempus tincidunt.',
		time: '3 days ago',
		car: {
			id: 'mercedes-c300',
			name: 'Mercedes C300 2020',
		},
	},
	{
		name: 'Jerome Bell',
		avatar: '/img/avatars/jerome.jpg',
		rating: 5,
		text: 'Sed turpis neque, iaculis blandit viverra ut, dapibus eget nisi.',
		time: '3 days ago',
		car: {
			id: 'tesla-model3',
			name: 'Tesla Model 3 2023',
		},
	},
];

const AllReviews = () => {
	return (
		<Box className={'all-reviews'}>
			<Box className={'review-boxes'}>
				<h3>Recent Reviews</h3>
				<Stack className={'review-list'} spacing={3}>
					{reviews.map((review, index) => (
						<Box className={'review-item'} key={index}>
							<Avatar src={review.avatar} className={'avatar'} />
							<Box className={'review-content'}>
								<Box className={'header'}>
									<Typography className={'name'}>{review.name}</Typography>
									<Typography className={'time'}>{review.time}</Typography>
								</Box>
								<Rating value={review.rating} readOnly size="small" className={'custom-rating'} />
								<Typography className={'text'}>{review.text}</Typography>
								<Typography className={'car'}>
									Reviewed:&nbsp;
									<Link href={`/cars/${review.car.id}`}>{review.car.name}</Link>
								</Typography>
							</Box>
						</Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
};

export default AllReviews;
