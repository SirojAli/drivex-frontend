import React from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Container, Stack } from '@mui/material';
import SellerReviewList from '../../../libs/components/seller/SellerReviewList';

const AllReviews: NextPage = ({ initialInquiry, ...props }: any) => {
  return (
    <Container maxWidth={false}>
      <h2
        className={'dash-title'}
        style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}
      >
        All Reviews
      </h2>
      <Stack className={'all-reviews'}>
        <SellerReviewList />
      </Stack>
    </Container>
  );
};

export default withSellerLayout(AllReviews);
