import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';

import { MemberPanelList } from '../../../libs/components/admin/users/MemberList';
import { Box, Container, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../../libs/types/common';
import { sweetErrorHandling } from '../../../libs/sweetAlert';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArticleIcon from '@mui/icons-material/Article';
import StarsIcon from '@mui/icons-material/Stars';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SellerCarList from '../../../libs/components/seller/SellerCarList';
import SellerBlogList from '../../../libs/components/seller/SellerBlogList';
import AllReviews from '../../../libs/components/seller/AllReviews';

const SellerDashboard: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<Container maxWidth={false}>
			<h1>DASHBOARD</h1>
			<Stack className={'main-content'}>
				{/* DASHBOARD */}
				<Stack className={'main-dashboard'}>
					<Box className={'car-dash'}>
						<Box className={'icon'}>
							<DirectionsCarIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Car Listing</h5>
							<span>32</span>
						</Box>
					</Box>
					<Box className={'favorite-dash'}>
						<Box className={'icon'}>
							<StarsIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Favorites</h5>
							<span>12</span>
						</Box>
					</Box>
					<Box className={'blog-dash'}>
						<Box className={'icon'}>
							<ArticleIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Blog Listing</h5>
							<span>32</span>
						</Box>
					</Box>
					<Box className={'review-dash'}>
						<Box className={'icon'}>
							<ReviewsIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Reviews</h5>
							<span>99</span>
						</Box>
					</Box>
				</Stack>

				{/* CAR LISTING */}
				<Stack className={'car-listing'}>
					<SellerCarList />
				</Stack>

				{/* GRAPHIC
				<Stack className={'graphic'}></Stack> */}

				{/* REVIEWS */}
				<Stack className={'all-reviews'}>
					<AllReviews />
				</Stack>

				{/* MY BLOGS */}
				<Stack className={'blog-listing'}>
					<SellerBlogList />
				</Stack>
			</Stack>
		</Container>
	);
};

export default withSellerLayout(SellerDashboard);
