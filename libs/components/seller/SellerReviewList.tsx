import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Stack, Avatar, Typography, Pagination, Rating } from '@mui/material';

const mockReviews = [
  {
    id: '1',
    carId: 'car1',
    content: 'Amazing car!',
    date: new Date('2025-08-03'),
    memberName: 'John Doe',
  },
  {
    id: '2',
    carId: 'car2',
    content: 'Really smooth ride.',
    date: new Date('2025-08-05'),
    memberName: 'Jane Smith',
  },
  {
    id: '3',
    carId: 'car3',
    content: 'Highly recommend this car.',
    date: new Date('2025-08-08'),
    memberName: 'Alice Johnson',
  },
  {
    id: '4',
    carId: 'car1',
    content: 'Good condition and well maintained.',
    date: new Date('2025-08-10'),
    memberName: 'Bob Brown',
  },
  {
    id: '5',
    carId: 'car2',
    content: 'Loved the experience!',
    date: new Date('2025-08-12'),
    memberName: 'Clara Lee',
  },
  {
    id: '6',
    carId: 'car3',
    content: 'Excellent seller communication.',
    date: new Date('2025-08-14'),
    memberName: 'David Kim',
  },
  {
    id: '7',
    carId: 'car1',
    content: 'Smooth transaction.',
    date: new Date('2025-08-16'),
    memberName: 'Eva Green',
  },
  {
    id: '8',
    carId: 'car2',
    content: 'Car was as described.',
    date: new Date('2025-08-18'),
    memberName: 'Frank White',
  },
  {
    id: '9',
    carId: 'car3',
    content: 'Very satisfied with the purchase.',
    date: new Date('2025-08-19'),
    memberName: 'Grace Hall',
  },
  {
    id: '10',
    carId: 'car1',
    content: 'Would buy again!',
    date: new Date('2025-08-20'),
    memberName: 'Henry Young',
  },
];

const ITEMS_PER_PAGE = 5;

const SellerReviewList = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(mockReviews.length / ITEMS_PER_PAGE);

  const handleChange = (_: any, value: number) => setPage(value);

  const displayedReviews = mockReviews.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Box className="review-list-box">
      <Stack spacing={3} className="review-list">
        {displayedReviews.map((review) => (
          <Box key={review.id} className="review-item" display="flex" gap={2}>
            <Avatar>{review.memberName[0]}</Avatar>
            <Box className="review-content">
              <Box className="header" display="flex" justifyContent="space-between">
                <Typography className="name">{review.memberName}</Typography>
                <Typography className="time">{review.date.toLocaleDateString()}</Typography>
              </Box>
              <Rating value={5} readOnly size="small" />
              <Typography className="text">{review.content}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
      <Box className="pagination-box">
        <Pagination count={pageCount} page={page} onChange={handleChange} color="primary" />
      </Box>
    </Box>
  );
};

export default SellerReviewList;
