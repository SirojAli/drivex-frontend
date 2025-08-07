import React from 'react';
import { Stack, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import Moment from 'react-moment';
import { REACT_APP_API_URL } from '../../../libs/config';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { BoardArticle } from '../../types/board-article/board-article';
import { BoardArticleCategory } from '../../enums/board-article.enum';

const categoryLabels: { [key: string]: string } = {
	ALL: 'All Blogs', // Custom tab
	[BoardArticleCategory.NEWS]: 'News',
	[BoardArticleCategory.REVIEWS]: 'Reviews',
	[BoardArticleCategory.EVENT]: 'Event',
	[BoardArticleCategory.GUIDE]: 'Buying Guide',
	[BoardArticleCategory.PROMOTION]: 'Sales Promotion',
	[BoardArticleCategory.ANNOUNCEMENT]: 'Car Announcement',
};

const CategoryBox = () => {
	const router = useRouter();
	const articleCategory = router.query?.articleCategory as string;

	/** Top Blogs **/
	const { data: topData } = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'articleLikes',
				direction: 'DESC',
				search: {},
			},
		},
		fetchPolicy: 'cache-first',
	});

	/** Category Counts **/
	const { data: categoryCountsData, loading: categoryCountsLoading } = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: {
				page: 1,
				limit: 1,
				sort: 'articleViews',
				direction: 'DESC',
			},
		},
	});

	/** Helpers **/
	const topArticles = topData?.getBoardArticles?.list || [];

	const categoryCountsMap: { [key: string]: number } = {};
	categoryCountsData?.getBoardArticles?.metaCounter?.forEach((item: any) => {
		if (item?._id?.articleCategory) {
			categoryCountsMap[item._id.articleCategory.toUpperCase()] = item.total;
		}
	});

	const handleCategoryClick = (category: string | null) => {
		const queryParams = category ? { articleCategory: category } : {};
		router.push({ pathname: router.pathname, query: queryParams }, undefined, { shallow: true });
	};

	return (
		<Stack className={'category-boxes'}>
			{/* Search */}
			{/* <Stack className={'search-box'}>
				<h3>Search Blog</h3>
				<Box className={'input-box'}>
					<SearchIcon className={'icon'} />
					<input type="search" placeholder="Search..." className={'search-input'} />
				</Box>
			</Stack> */}

			{/* Categories */}
			<Stack className={'cat-type-box'}>
				<h3>Categories</h3>
				<Stack className={'type-box'}>
					{Object.entries(categoryLabels).map(([key, label]) => {
						const isActive = articleCategory === key;
						// Assuming categoryCountsMap keys are uppercase strings matching BoardArticleCategory enums
						const count = key === 'ALL' ? undefined : categoryCountsMap[key.toUpperCase()] ?? 0;
						return (
							<Box className={`catg ${isActive ? 'active' : ''}`} key={key} onClick={() => handleCategoryClick(key)}>
								<Box className="catg-content">
									<span className="label">{label}</span>
									{/* {count !== undefined && <span className="count">({count})</span>} */}
								</Box>
							</Box>
						);
					})}
				</Stack>
			</Stack>

			{/* Top Blogs */}
			<Stack className={'top-blog-box'}>
				<h3>Top Blogs</h3>
				<Box className={'top-blogs'}>
					{topArticles.map((article: BoardArticle) => (
						<Box className={'blog'} key={article._id}>
							<img src={`${REACT_APP_API_URL}/${article.articleImage}`} alt={'article'} loading="lazy" />
							<Box className={'content'}>
								<p>{article.articleTitle}</p>
								<div className={'time'}>
									<CalendarTodayIcon className={'icon'} />
									<Moment format="MMMM D, YYYY">{article.createdAt}</Moment>
								</div>
							</Box>
						</Box>
					))}
				</Box>
			</Stack>

			{/* Tags */}
			<Stack className={'tag-box'}>
				{['KIA', 'BMW', 'News', 'Event', 'Audi', 'Lexus', 'Genesis'].map((tag) => (
					<Stack className={'tag'} key={tag}>
						<span>{tag}</span>
					</Stack>
				))}
			</Stack>
		</Stack>
	);
};

export default CategoryBox;
