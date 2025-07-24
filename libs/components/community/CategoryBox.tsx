import React from 'react';
import { Stack, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CategoryBox = () => {
	return (
		<Stack className={'category-boxes'}>
			{/* Search */}
			<Stack className={'search-box'}>
				<h3>Search Blog</h3>
				<Box className={'input-box'}>
					<SearchIcon className={'icon'} />
					<input type="search" placeholder="Search..." className={'search-input'} />
				</Box>
			</Stack>
			{/* Categories */}
			<Stack className={'cat-type-box'}>
				<h3>Search Blog</h3>
				<Stack className={'type-box'}>
					<Box className={'catg'}>
						<p>All Blogs</p>
						<span>(82)</span>
					</Box>
					<Box className={'catg'}>
						<p>News</p>
						<span>(12)</span>
					</Box>
					<Box className={'catg'}>
						<p>Reviews</p>
						<span>(22)</span>
					</Box>
					<Box className={'catg'}>
						<p>Event</p>
						<span>(15)</span>
					</Box>
					<Box className={'catg'}>
						<p>Buying Guide</p>
						<span>(32)</span>
					</Box>
					<Box className={'catg'}>
						<p>Sales Promotion</p>
						<span>(12)</span>
					</Box>
					<Box className={'catg'}>
						<p>Car Announcement</p>
						<span>(22)</span>
					</Box>
				</Stack>
			</Stack>
			{/* Top Blogs */}
			<Stack className={'top-blog-box'}>
				<h3>Top Blogs</h3>
				<Box className={'top-blogs'}>
					<Box className={'blog'}>
						<img src="/img/cars/header1.jpg" alt="" />
						<Box className={'content'}>
							<p>Key Real Estate Trends to Watch in 2024</p>
							<div className={'time'}>
								<CalendarTodayIcon className={'icon'} />
								<span>February 16, 2024</span>
							</div>
						</Box>
					</Box>

					<Box className={'blog'}>
						<img src="/img/cars/header1.jpg" alt="" />
						<Box className={'content'}>
							<p>Key Real Estate Trends to Watch in 2024</p>
							<div className={'time'}>
								<CalendarTodayIcon className={'icon'} />
								<span>February 16, 2024</span>
							</div>
						</Box>
					</Box>
					<Box className={'blog'}>
						<img src="/img/cars/header1.jpg" alt="" />
						<Box className={'content'}>
							<p>Key Real Estate Trends to Watch in 2024</p>
							<div className={'time'}>
								<CalendarTodayIcon className={'icon'} />
								<span>February 16, 2024</span>
							</div>
						</Box>
					</Box>
					<Box className={'blog'}>
						<img src="/img/cars/header1.jpg" alt="" />
						<Box className={'content'}>
							<p>Key Real Estate Trends to Watch in 2024</p>
							<div className={'time'}>
								<CalendarTodayIcon className={'icon'} />
								<span>February 16, 2024</span>
							</div>
						</Box>
					</Box>
				</Box>
			</Stack>
			{/* Tags */}
			<Stack className={'tag-box'}>
				<Stack className={'tag'}>
					<span>KIA</span>
				</Stack>
				<Stack className={'tag'}>
					<span>BMW</span>
				</Stack>
				<Stack className={'tag'}>
					<span>News</span>
				</Stack>
				<Stack className={'tag'}>
					<span>Event</span>
				</Stack>
				<Stack className={'tag'}>
					<span>Audi</span>
				</Stack>
				<Stack className={'tag'}>
					<span>Lexus</span>
				</Stack>
				<Stack className={'tag'}>
					<span>Lamborghini</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CategoryBox;
