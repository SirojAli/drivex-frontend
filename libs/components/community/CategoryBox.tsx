import React from 'react';
import { Stack, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { BoardArticle } from '../../types/board-article/board-article';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../../libs/config';
import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import { T } from '../../../libs/types/common';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { Messages } from '../../../libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../../libs/sweetAlert';
import { BoardArticlesInquiry } from '../../types/board-article/board-article.input';
import { BoardArticleCategory } from '../../enums/board-article.enum';

const categoryLabels: { [key in BoardArticleCategory]: string } = {
	[BoardArticleCategory.NEWS]: 'News',
	[BoardArticleCategory.REVIEWS]: 'Reviews',
	[BoardArticleCategory.EVENT]: 'Event',
	[BoardArticleCategory.GUIDE]: 'Buying Guide',
	[BoardArticleCategory.PROMOTION]: 'Sales Promotion',
	[BoardArticleCategory.ANNOUNCEMENT]: 'Car Announcement',
};

const CategoryBox = ({ initialInput, ...props }: T) => {
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [topArticles, setTopArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);

	/** APOLLO REQUESTS **/
	const {
		loading: topArticlesLoading,
		data: topArticlesData,
		error: topArticlesError,
		refetch: topArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-first',
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'articleLikes',
				direction: 'DESC',
				search: {},
			},
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopArticles(data?.getBoardArticles?.list);
			setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		const categoryFilter: BoardArticlesInquiry = {
			...searchCommunity,
			page: 1,
			limit: 12,
			// @ts-ignore
			search: articleCategory
				? {
						...searchCommunity.search,
						articleCategory: articleCategory as BoardArticleCategory, // ✅ CAST HERE
				  }
				: {}, // If "All", remove category filter
		};

		setSearchCommunity(categoryFilter);
		refetchArticles(categoryFilter);
	}, [articleCategory]);

	const refetchArticles = async (filter: BoardArticlesInquiry) => {
		const { data } = await topArticlesRefetch({ input: filter });
		setTopArticles(data?.getBoardArticles?.list || []);
		setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total || 0);
	};

	/** HANDLERS **/
	const handleCategoryClick = (category: string | null) => {
		const queryParams = category ? { articleCategory: category } : {};
		router.push({ pathname: router.pathname, query: queryParams }, undefined, { shallow: true });
	};

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
					<Box className={`catg ${!articleCategory ? 'active' : ''}`} onClick={() => handleCategoryClick(null)}>
						<p>All Blogs</p>
						{/* <span>({totalCount})</span> */}
					</Box>

					{Object.entries(categoryLabels).map(([key, label]) => (
						<Box
							className={`catg ${articleCategory === key ? 'active' : ''}`}
							key={key}
							onClick={() => handleCategoryClick(key)}
						>
							<p>{label}</p>
							{/* <span>({categoryCounts[key] || 0})</span> */}
						</Box>
					))}
				</Stack>
			</Stack>

			{/* Top Blogs */}
			<Stack className={'top-blog-box'}>
				<h3>Top Blogs</h3>
				<Box className={'top-blogs'}>
					{topArticles.map((article) => (
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
					<span>Genesis</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default CategoryBox;
