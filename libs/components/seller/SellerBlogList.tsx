import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Pagination, Stack } from '@mui/material';
import cookies from 'js-cookie';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';

const SellerBlogList = (props: any) => {
	const totalPages = 3;
	const [currentPage, setCurrentPage] = useState(1);
	const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className={'list-boxes'}>
			<h3>Blog Listing</h3>
			<Stack className={'blog-box'}>
				<Box className={'title-bar'}>
					<p className={'list'}>Listing</p>
					<div className={'divr'}></div>
					<p className={'stat'}>Status</p>
					<div className={'divr'}></div>
					<p className={'date'}>Date</p>
					<div className={'divr'}></div>
					<p className={'act'}>Action</p>
				</Box>
				<Stack className={'blog-listing'}>
					<Box className={'blog-items'}>
						{/* CAR NAME */}
						<Box className={'blog-content'}>
							<Box className={'blog-img'}>
								<img src="/img/cars/header1.jpg" alt="blog-img" />
							</Box>
							<Box className={'blog-info'}>
								<h5>How to choose BMW X1 Drive</h5>
								<span>The BMW X1 blends luxury, performance, and BMW X1 blends luxury, performance, and...</span>
								<p>NEWS</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* CAR STATUS */}
						<Box className={'blog-status'}>
							<Box className={'status-active'}>
								<p className={'active'}>Active</p>
							</Box>
							{/* <Box className={'status-delete'}>
								<p className={'delete'}>Delete</p>
							</Box> */}
						</Box>
						<div className={'divr'}></div>

						{/* DATE */}
						<Box className={'blog-date'}>
							<p>July 25, 2025</p>
						</Box>
						<div className={'divr'}></div>

						{/* ACTIONS */}
						<Box className={'blog-action'}>
							<Box className={'blog-edit'}>
								<EditIcon className={'icon'} />
								<p>Edit</p>
							</Box>
							<Box className={'blog-delete'}>
								<DeleteIcon className={'icon'} />
								<p>Delete</p>
							</Box>
						</Box>
					</Box>
					<div className={'divider'}></div>

					<Box className={'blog-items'}>
						{/* CAR NAME */}
						<Box className={'blog-content'}>
							<Box className={'blog-img'}>
								<img src="/img/cars/header1.jpg" alt="blog-img" />
							</Box>
							<Box className={'blog-info'}>
								<h5>How to choose BMW X1 Drive</h5>
								<span>The BMW X1 blends luxury, performance, and BMW X1 blends luxury, performance, and...</span>
								<p>NEWS</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* CAR STATUS */}
						<Box className={'blog-status'}>
							{/* <Box className={'status-active'}>
								<p className={'active'}>Active</p>
							</Box> */}
							<Box className={'status-delete'}>
								<p className={'delete'}>Delete</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* DATE */}
						<Box className={'blog-date'}>
							<p>July 25, 2025</p>
						</Box>
						<div className={'divr'}></div>

						{/* ACTIONS */}
						<Box className={'blog-action'}>
							<Box className={'blog-edit'}>
								<EditIcon className={'icon'} />
								<p>Edit</p>
							</Box>
							<Box className={'blog-delete'}>
								<DeleteIcon className={'icon'} />
								<p>Delete</p>
							</Box>
						</Box>
					</Box>
					<div className={'divider'}></div>

					<Box className={'blog-items'}>
						{/* CAR NAME */}
						<Box className={'blog-content'}>
							<Box className={'blog-img'}>
								<img src="/img/cars/header1.jpg" alt="blog-img" />
							</Box>
							<Box className={'blog-info'}>
								<h5>How to choose BMW X1 Drive</h5>
								<span>The BMW X1 blends luxury, performance, and BMW X1 blends luxury, performance, and...</span>
								<p>NEWS</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* CAR STATUS */}
						<Box className={'blog-status'}>
							<Box className={'status-active'}>
								<p className={'active'}>Active</p>
							</Box>
							{/* <Box className={'status-delete'}>
								<p className={'delete'}>Delete</p>
							</Box> */}
						</Box>
						<div className={'divr'}></div>

						{/* DATE */}
						<Box className={'blog-date'}>
							<p>July 25, 2025</p>
						</Box>
						<div className={'divr'}></div>

						{/* ACTIONS */}
						<Box className={'blog-action'}>
							<Box className={'blog-edit'}>
								<EditIcon className={'icon'} />
								<p>Edit</p>
							</Box>
							<Box className={'blog-delete'}>
								<DeleteIcon className={'icon'} />
								<p>Delete</p>
							</Box>
						</Box>
					</Box>
					<div className={'divider'}></div>

					<Box className={'blog-items'}>
						{/* CAR NAME */}
						<Box className={'blog-content'}>
							<Box className={'blog-img'}>
								<img src="/img/cars/header1.jpg" alt="blog-img" />
							</Box>
							<Box className={'blog-info'}>
								<h5>How to choose BMW X1 Drive</h5>
								<span>The BMW X1 blends luxury, performance, and BMW X1 blends luxury, performance, and...</span>
								<p>NEWS</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* CAR STATUS */}
						<Box className={'blog-status'}>
							<Box className={'status-active'}>
								<p className={'active'}>Active</p>
							</Box>
							{/* <Box className={'status-delete'}>
								<p className={'delete'}>Delete</p>
							</Box> */}
						</Box>
						<div className={'divr'}></div>

						{/* DATE */}
						<Box className={'blog-date'}>
							<p>July 25, 2025</p>
						</Box>
						<div className={'divr'}></div>

						{/* ACTIONS */}
						<Box className={'blog-action'}>
							<Box className={'blog-edit'}>
								<EditIcon className={'icon'} />
								<p>Edit</p>
							</Box>
							<Box className={'blog-delete'}>
								<DeleteIcon className={'icon'} />
								<p>Delete</p>
							</Box>
						</Box>
					</Box>
					<div className={'divider'}></div>

					<Box className={'blog-items'}>
						{/* CAR NAME */}
						<Box className={'blog-content'}>
							<Box className={'blog-img'}>
								<img src="/img/cars/header1.jpg" alt="blog-img" />
							</Box>
							<Box className={'blog-info'}>
								<h5>How to choose BMW X1 Drive</h5>
								<span>The BMW X1 blends luxury, performance, and BMW X1 blends luxury, performance, and...</span>
								<p>NEWS</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* CAR STATUS */}
						<Box className={'blog-status'}>
							<Box className={'status-delete'}>
								<p className={'delete'}>Delete</p>
							</Box>
						</Box>
						<div className={'divr'}></div>

						{/* DATE */}
						<Box className={'blog-date'}>
							<p>July 25, 2025</p>
						</Box>
						<div className={'divr'}></div>

						{/* ACTIONS */}
						<Box className={'blog-action'}>
							<Box className={'blog-edit'}>
								<EditIcon className={'icon'} />
								<p>Edit</p>
							</Box>
							<Box className={'blog-delete'}>
								<DeleteIcon className={'icon'} />
								<p>Delete</p>
							</Box>
						</Box>
					</Box>
					<div className={'divider'}></div>
				</Stack>
			</Stack>
			{/* Pagination */}
			{totalPages > 1 && (
				<Box className={'pagination-box'}>
					<Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
				</Box>
			)}
		</div>
	);
};

export default SellerBlogList;
