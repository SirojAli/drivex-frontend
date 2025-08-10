import { Container, Stack, Box, Pagination } from '@mui/material';
import { NextPage } from 'next';
import withLayoutFull from '../../libs/components/layout/LayoutFull';
import Link from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CommunityCard from '../../libs/components/community/CommunityCard';
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
import { BoardArticleCategory } from '../../libs/enums/board-article.enum';

const Community: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;

	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);

	/** Default to ALL-BLOGS on first load **/
	useEffect(() => {
		if (!articleCategory) {
			router.replace({ pathname: router.pathname, query: { articleCategory: 'ALL' } }, undefined, { shallow: true });
		}
	}, []);

	/** Apollo Query **/
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
			setTotalCount(data?.getBoardArticles?.metaCounter?.[0]?.total ?? 0);
		},
	});

	/** React to category change **/
	useEffect(() => {
		const isAll = articleCategory === 'ALL';

		const newSearch: BoardArticlesInquiry = {
			...searchCommunity,
			page: 1,
			search: isAll
				? {}
				: {
						articleCategory: articleCategory?.toUpperCase() as BoardArticleCategory,
				  },
		};
		setSearchCommunity(newSearch);
	}, [articleCategory]);

	/** Pagination handler **/
	const paginationHandler = (_: T, page: number) => {
		setSearchCommunity({ ...searchCommunity, page });
	};

	/** Like Handler **/
	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

	const likeArticleHandler = async (user: T, id: string) => {
		try {
			if (!user?._id) throw new Error(Messages.error2);
			await likeTargetBoardArticle({ variables: { input: id } });
			await boardArticlesRefetch({ input: searchCommunity });
			await sweetTopSmallSuccessAlert('Success!', 800);
		} catch (err: any) {
			sweetMixinErrorAlert(err.message);
		}
	};

	if (device === 'mobile') {
		return <Stack>COMMUNITY PAGE MOBILE</Stack>;
	} else {
		return (
			<div id="community-list-page">
				<Stack className={'container'}>
					{/* Breadcrumbs */}
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
						{/* Left */}
						<Stack className={'left-box'}>
							<Stack className={'blog-card-box'}>
								{boardArticles.map((article: BoardArticle) => (
									<CommunityCard key={article._id} article={article} likeArticleHandler={likeArticleHandler} />
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

						{/* Right */}
						<Stack className={'right-box'}>
							<CategoryBox />
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
