import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import CommunityHome from './CommunityHome';

const CommunityBoards = () => {
	return (
		<Stack className={'community-board'}>
			<Stack className={'container'}>
				<Box className={'blog-text'}>
					<h2>Top Blogs</h2>
				</Box>
				<Stack>
					<CommunityHome />
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CommunityBoards;
