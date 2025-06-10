import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HeaderFilter = () => {
	return (
		<>
			<Stack className={'header-box'}>
				<Stack className={'header-text'}>
					<p className={'bold'}>Let's find your next drive</p>
					<span className={'short'}>Explore Top Brand Cars</span>
					<Box className={'detail'}>
						<p>View Detail</p>
					</Box>
				</Stack>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={'box on'}>
							<span>Brands</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={'box'}>
							<span>Car type</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={'box'}>
							<span>Fuel Type</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={'box'}>
							<span>Transmission</span>
							<ExpandMoreIcon />
						</Box>
						<Box className={'search-btn'}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>
					<Stack className={'search-logo'}>
						<Box className={'logo'}>
							<img src="/img/icons/search_white.svg" alt="" />
							<span>SUV</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/search_white.svg" alt="" />
							<span>Sedan</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/search_white.svg" alt="" />
							<span>Coupe</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/search_white.svg" alt="" />
							<span>Hatchback</span>
							<Box className={'logo'}>
								<img src="/img/icons/search_white.svg" alt="" />
								<span>Crossover</span>
							</Box>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default HeaderFilter;
