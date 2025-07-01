import { Container, Stack, Box, Pagination } from '@mui/material';
import { NextPage } from 'next';
// import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BlogCard from '../../libs/components/community/BlogCard';
import CategoryBox from '../../libs/components/community/CategoryBox';

const ArticleList: NextPage = () => {
	return (
		<div id="community-list-page">
			<Stack className={'container'}>
				{/* Sub-Header */}
				<Stack className={'sub-header'}>
					<Link href={'/'} className={'link'}>
						Home
					</Link>
					<ArrowForwardIosIcon className={'arrow'} />
					<span>All Blogs</span>
				</Stack>
				{/* Title */}
				<Stack className={'car-list-title'}>
					<h2>Blog List</h2>
				</Stack>

				{/* Main */}
				<Stack className={'main-box'}>
					{/* Left Box */}
					<Stack className={'left-box'}>
						<Stack className={'blog-card-box'}>
							<BlogCard />
						</Stack>
						<Stack className={'pagination-box'}>
							<Pagination
								page={1}
								count={2}
								// onChange={handlePageChange}
								shape="circular"
								color="primary"
							/>
						</Stack>
					</Stack>

					{/* Right Box */}
					<Stack className={'right-box'}>
						<CategoryBox />
					</Stack>
				</Stack>
			</Stack>
		</div>
	);
};

export default withLayoutFull(ArticleList);
