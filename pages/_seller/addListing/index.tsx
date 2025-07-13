import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Stack } from '@mui/material';

const AddListing: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<div className={'add-listing'}>
			<h3>Add Listing</h3>
			<Stack className={'adding-boxes'}>
				{/* UPLOAD IMAGE */}
				<Stack className={'upload-photos'}>
					<h3>Upload Photos</h3>
					<Stack className={''}></Stack>
				</Stack>

				{/* CAR DETAILS */}
				<Stack className={'car-details'}>
					<h3>Car details</h3>
					<Stack className={''}></Stack>
				</Stack>

				{/* SAFETY FEATURES */}
				<Stack className={'safety-feat'}>
					<h3>Safety features</h3>
					<Stack className={''}></Stack>
				</Stack>

				{/* UPLOAD VIDEO */}
				<Stack className={'upload-video'}>
					<h3>Upload Video</h3>
					<Stack className={''}></Stack>
				</Stack>

				{/* SAVE LISTING */}
				<Stack className={'save-button'}>
					<Stack className={'save'}></Stack>
					<Stack className={''}></Stack>
				</Stack>
			</Stack>
		</div>
	);
};

export default withSellerLayout(AddListing);
