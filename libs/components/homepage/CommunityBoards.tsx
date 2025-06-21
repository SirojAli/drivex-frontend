import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import CommunityCard from './CommunityCard';

const CommunityBoards = () => {
	return (
		<Stack className={'community-board'}>
			<Stack className={'container'}>
				<Box className={'blog-text'}>
					<h2>News to help choose your car</h2>
				</Box>
				<Stack>
					<CommunityCard />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CommunityBoards;
