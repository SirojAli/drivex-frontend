import React from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Container, Stack } from '@mui/material';
import SellerBlogList from '../../../libs/components/seller/SellerBlogList';

const MyBlogs: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column' }}>
			{/* <h1 className={'list-title'}>MY BLOGS</h1> */}
			<Stack className={'blog-listing'}>
				<SellerBlogList />
			</Stack>
		</Container>
	);
};

export default withSellerLayout(MyBlogs);
