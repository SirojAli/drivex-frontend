import { Container, Stack, Box, Pagination } from '@mui/material';
import { NextPage } from 'next';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BlogCard from '../../libs/components/community/BlogCard';
import CategoryBox from '../../libs/components/community/CategoryBox';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BoardArticlesInquiry } from '../../libs/types/board-article/board-article.input';
import { T } from '../../libs/types/common';
import { BoardArticle } from '../../libs/types/board-article/board-article';
import { useMutation, useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../apollo/user/query';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../apollo/user/mutation';
import { Messages } from '../../libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

const Community: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [topArticles, setTopArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	if (articleCategory) initialInput.search.articleCategory = articleCategory;

	/** APOLLO REQUESTS **/
	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	// All Articles (views)
	const {
		loading: boardArticlesLoading,
		data: boardArticlesData,
		error: boardArticlesError,
		refetch: boardArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'network-only',
		variables: { input: searchCommunity },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticles(data?.getBoardArticles?.list);
			setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (searchCommunity.page !== initialInput.page) {
			boardArticlesRefetch({ input: searchCommunity });
		}
	}, [searchCommunity.page]);

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	const likeArticleHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user?._id) throw new Error(Messages.error2);

			await likeTargetBoardArticle({
				variables: { input: id },
			});

			await boardArticlesRefetch({ input: searchCommunity });
			await sweetTopSmallSuccessAlert('Success! ', 800);
		} catch (err: any) {
			console.log('ERROR, likeArticleHandler: ', err.message);
			sweetMixinErrorAlert(err.message);
		}
	};

	if (device === 'mobile') {
		return <Stack>COMMUNITY PAGE MOBILE</Stack>;
	} else {
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
								{boardArticles.map((article: BoardArticle) => (
									<BlogCard key={article._id} article={article} likeArticleHandler={likeArticleHandler} />
								))}
							</Stack>

							<Stack className={'pagination-box'}>
								<Pagination
									page={searchCommunity.page}
									count={Math.ceil(totalCount / searchCommunity.limit)}
									onChange={paginationHandler}
									shape="circular"
									color="primary"
								/>
							</Stack>
						</Stack>

						{/* Right Box */}
						<Stack className={'right-box'}>
							<CategoryBox topArticles={topArticles} />
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

Community.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'articleViews',
		direction: 'DESC',
		search: {},
	},
};

export default withLayoutFull(Community);
