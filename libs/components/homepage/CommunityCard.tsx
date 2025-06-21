import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const CommunityCard = ({ initialInput, ...props }: any) => {
	return (
		<Stack className={'main-blog'}>
			<Stack className={'post'}>
				<Stack className={'img-box'}>
					<img src="/img/cars/header1.jpg" alt="" />
					<Box className={'date'}>
						<p>July 7, 2025</p>
					</Box>
				</Stack>
				<Stack className={'content'}>
					<Box className={'heading'}>
						<Box className={'name-type'}>
							<p className={'name'}>William Sam</p>
							<div className={'dvr'}></div>
							<span className={'type'}>Guide</span>
						</Box>
						<h2>Get Ready For A Diesel Toyota Fortuner In...</h2>
					</Box>
					<span>
						The sub-4 metre SUV segment has been quite active over the last six months or so, with the launch of various
						facelifted...
					</span>
				</Stack>
			</Stack>
			<div className={'divider'}></div>
			<Stack className={'listing'}>
				<Box className={'blog'}>
					<img src="/img/cars/header1.jpg" alt="" />
					<Stack className={'content'}>
						<Box className={'heading'}>
							<Box className={'name-type'}>
								<p className={'name'}>William Sam</p>
								<div className={'dvr'}></div>
								<span className={'type'}>Guide</span>
							</Box>
							<h2>Get Ready For A Diesel Toyota Fortuner In...</h2>
						</Box>
						<span>The sub-4 metre SUV segment has been quite with the launch of various facelifted...</span>
					</Stack>
				</Box>
				<div className={'dvr'}></div>
				<Box className={'blog'}>
					<img src="/img/cars/header1.jpg" alt="" />
					<Stack className={'content'}>
						<Box className={'heading'}>
							<Box className={'name-type'}>
								<p className={'name'}>William Sam</p>
								<div className={'dvr'}></div>
								<span className={'type'}>Guide</span>
							</Box>
							<h2>Get Ready For A Diesel Toyota Fortuner In...</h2>
						</Box>
						<span>The sub-4 metre SUV segment has been quite with the launch of various facelifted...</span>
					</Stack>
				</Box>
				<div className={'dvr'}></div>
				<Box className={'blog'}>
					<img src="/img/cars/header1.jpg" alt="" />
					<Stack className={'content'}>
						<Box className={'heading'}>
							<Box className={'name-type'}>
								<p className={'name'}>William Sam</p>
								<div className={'dvr'}></div>
								<span className={'type'}>Guide</span>
							</Box>
							<h2>Get Ready For A Diesel Toyota Fortuner In...</h2>
						</Box>
						<span>The sub-4 metre SUV segment has been quite with the launch of various facelifted...</span>
					</Stack>
				</Box>
				<Box className={'see-more'}>
					<span>View all news</span>
					<ArrowRightAltIcon className={'arrow'} />
				</Box>
			</Stack>
		</Stack>
	);
};

export default CommunityCard;
