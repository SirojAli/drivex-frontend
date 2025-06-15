import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

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
							<span>Search</span>
							<SearchIcon className={'btn'} />
						</Box>
					</Stack>
					<Stack className={'search-logo'}>
						<Box className={'logo'}>
							<img src="/img/icons/suv.png" alt="" />
							<span>SUV</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/coupe.png" alt="" />
							<span>Coupe</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/minivan.png" alt="" />
							<span>Minivan</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/sedan.png" alt="" />
							<span>Sedan</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/icons/truck.png" alt="" />
							<span>Pickup Truck</span>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default HeaderFilter;
