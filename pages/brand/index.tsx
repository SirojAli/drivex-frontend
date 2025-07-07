import React, { useState, ChangeEvent } from 'react';
import { NextPage } from 'next';
import { Stack, Box, Button, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BrandCard from '../../libs/components/brand/BrandCard';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';

const carCards = new Array(15).fill({
	name: 'KIA',
	location: 'Busan, South Korea',
	phone: '+8210 7777 7777',
	views: '1.2K',
	likes: 234,
	image: '/img/logo/kia2.png',
});

const itemsPerPage = 8;

const BrandList: NextPage = () => {
	const device = useDeviceDetect();
	const [page, setPage] = useState(1);

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	const startIdx = (page - 1) * itemsPerPage;
	const cardsToShow = carCards.slice(startIdx, startIdx + itemsPerPage);

	if (device === 'mobile') {
		return <Stack>CAR BRAND MOBILE</Stack>;
	} else {
		return (
			<div id="brand-list-page">
				<Stack className={'container'}>
					<Box className={'filter-search-box'}>
						<Box className={'filter-box'}>
							{['Top', 'Best', 'Popular', 'New'].map((filter) => (
								<div key={filter} className={'filter-button'}>
									<p>{filter}</p>
								</div>
							))}
						</Box>
						<Box className={'search-box'}>
							<form className={'search-form'}>
								<input type="search" placeholder="Search Car Brand" className={'search-input'} />
								<Button type="submit" className={'search-btn'}>
									<SearchIcon />
								</Button>
							</form>
						</Box>
					</Box>

					<Stack className={'main-config'}>
						<Stack className={'list-config'}>
							<BrandCard cars={cardsToShow} />
						</Stack>
						<Stack className={'pagination-box'}>
							<Pagination
								page={page}
								count={Math.ceil(carCards.length / itemsPerPage)}
								onChange={handlePageChange}
								shape="circular"
								color="primary"
							/>
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

export default withLayoutBasic(BrandList);
