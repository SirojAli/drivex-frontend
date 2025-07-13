import React, { useEffect, useState } from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Pagination, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';

const carData = [
	{
		id: 1,
		name: 'BMW X1 Drive',
		specs: 'auto transmission, petrol',
		price: '$73,000',
		status: 'Active',
		date: 'July 25, 2025',
		image: '/img/cars/header1.jpg',
	},
	{
		id: 2,
		name: 'BMW X1 Drive',
		specs: 'auto transmission, petrol',
		price: '$73,000',
		status: 'Sold',
		date: 'July 25, 2025',
		image: '/img/cars/header1.jpg',
	},
	{
		id: 1,
		name: 'BMW X1 Drive',
		specs: 'auto transmission, petrol',
		price: '$73,000',
		status: 'Active',
		date: 'July 25, 2025',
		image: '/img/cars/header1.jpg',
	},
	{
		id: 3,
		name: 'BMW X1 Drive',
		specs: 'auto transmission, petrol',
		price: '$73,000',
		status: 'Sold',
		date: 'July 25, 2025',
		image: '/img/cars/header1.jpg',
	},
	{
		id: 4,
		name: 'BMW X1 Drive',
		specs: 'auto transmission, petrol',
		price: '$73,000',
		status: 'Delete',
		date: 'July 25, 2025',
		image: '/img/cars/header1.jpg',
	},
];

const SellerCarList = (props: any) => {
	const totalPages = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className={'list-boxes'}>
			<h3>Car Listing</h3>

			<Stack className={'car-box'}>
				<Box className={'title-bar'}>
					<p className={'list'}>Listing</p>
					<div className={'divr'}></div>
					<p className={'stat'}>Status</p>
					<div className={'divr'}></div>
					<p className={'date'}>Date</p>
					<div className={'divr'}></div>
					<p className={'act'}>Action</p>
				</Box>

				<Stack className={'car-listing'}>
					{Array.from({ length: 5 }).map((_, i) => (
						<React.Fragment key={i}>
							<Box className={'car-items'}>
								<Box className={'car-content'}>
									<Box className={'car-img'}>
										<img src="/img/cars/header1.jpg" alt="car-img" />
									</Box>
									<Box className={'car-info'}>
										<h5>BMW X1 Drive</h5>
										<span>auto transmission, petrol</span>
										<p>$73,000</p>
									</Box>
								</Box>

								<div className={'divr'}></div>

								<Box className={'car-status'}>
									{i % 3 === 0 && (
										<Box className={'status-active'}>
											<p className={'active'}>Active</p>
										</Box>
									)}
									{i % 3 === 1 && (
										<Box className={'status-sold'}>
											<p className={'sold'}>Sold</p>
										</Box>
									)}
									{i % 3 === 2 && (
										<Box className={'status-delete'}>
											<p className={'delete'}>Delete</p>
										</Box>
									)}
								</Box>

								<div className={'divr'}></div>

								<Box className={'car-date'}>
									<p>July 25, 2025</p>
								</Box>

								<div className={'divr'}></div>

								<Box className={'car-action'}>
									<Box className={'car-edit'}>
										<EditIcon className={'icon'} />
										<p>Edit</p>
									</Box>
									<Box className={'car-sold'}>
										<DoNotDisturbIcon className={'icon'} />
										<p>Sold</p>
									</Box>
									<Box className={'car-delete'}>
										<DeleteIcon className={'icon'} />
										<p>Delete</p>
									</Box>
								</Box>
							</Box>

							<div className={'divider'}></div>
						</React.Fragment>
					))}
				</Stack>
			</Stack>

			{totalPages > 1 && (
				<Box className={'pagination-box'}>
					<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
				</Box>
			)}
		</div>
	);
};

export default SellerCarList;
