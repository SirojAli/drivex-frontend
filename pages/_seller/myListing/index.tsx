import React from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Container, Stack } from '@mui/material';
import SellerCarList from '../../../libs/components/seller/SellerCarList';

const MyListing: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column' }}>
			{/* <h1 className={'list-title'}>MY LISTING</h1> */}
			<Stack className={'car-listing'}>
				<SellerCarList />
			</Stack>
		</Container>
	);
};

export default withSellerLayout(MyListing);
