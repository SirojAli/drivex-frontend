import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';

const carMakes = [
	{ id: 'kia', name: 'Kia', logo: '/img/brands/kia.png' },
	{ id: 'hyundai', name: 'Hyundai', logo: '/img/brands/hyundai.png' },
	{ id: 'genesis', name: 'Genesis', logo: '/img/brands/genesis.png' },
	{ id: 'bmw', name: 'BMW', logo: '/img/brands/bmw.png' },
	{ id: 'merc', name: 'Mercedes-Benz', logo: '/img/brands/merc.png' },
	{ id: 'toyota', name: 'Toyota', logo: '/img/brands/toyota.png' },
	{ id: 'audi', name: 'Audi', logo: '/img/brands/audi.png' },
	{ id: 'tesla', name: 'Tesla', logo: '/img/brands/tesla.png' },
];

const carTypes = [
	{ id: 'sedan', name: 'Sedan', icon: '/img/types/Sedan.png' },
	{ id: 'suv', name: 'SUV', icon: '/img/types/Suv.png' },
	{ id: 'hatchback', name: 'Hatchback', icon: '/img/types/Hatchback.png' },
	{ id: 'crossover', name: 'Crossover', icon: '/img/types/Crossover.png' },
	{ id: 'coupe', name: 'Coupe', icon: '/img/types/Coupe.png' },
	{ id: 'convertible', name: 'Convertible', icon: '/img/types/Convertible.png' },
];

const fuelTypes = ['Petrol', 'Electric', 'Hybrid', 'LPG', 'Diesel'];

const HeaderFilter = () => {
	return (
		<>
			<Stack className={'header-box'}>
				<Stack className={'header-text'}>
					<p className={'bold'}>Find Your Perfect Car Today</p>
					{/* <span className={'short'}>Explore Cars from Leading Global Brands</span> */}
					<span className="short">Discover New Models from Brands You Love</span>
					<Box className={'detail'}>
						<Link href={'/car'} className={'p'}>
							Get Started
						</Link>
					</Box>
				</Stack>
				<Stack className={'search-box'}>
					<Stack className={'select-box'}>
						<Box component={'div'} className={'box on'}>
							<span>Car Make</span>
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
						<Box className={'search-btn'}>
							<span>Search</span>
							<SearchIcon className={'btn'} />
						</Box>
					</Stack>
					<Stack className={'search-logo'}>
						<Box className={'logo'}>
							<img src="/img/types/suv.png" alt="" />
							<span>SUV</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/types/convertible.png" alt="" />
							<span>Coupe</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/types/crossover.png" alt="" />
							<span>Crossover</span>
						</Box>
						<Box className={'logo'}>
							<img src="/img/types/sedan.png" alt="" />
							<span>Sedan</span>
						</Box>
						{/* <Box className={'logo'}>
							<img src="/img/types/hatchback.png" alt="" />
							<span>Hatchback</span>
						</Box> */}
					</Stack>
				</Stack>
			</Stack>
		</>
	);
};

export default HeaderFilter;
