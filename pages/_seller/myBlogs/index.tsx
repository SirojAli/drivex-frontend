import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Container, Stack, Pagination, Box } from '@mui/material';
import SellerBlogList from '../../../libs/components/seller/SellerBlogList';
import { useReactiveVar, useQuery } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { BoardArticle } from '../../../libs/types/board-article/board-article';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';

interface SellerCommunity {
	page: number;
	limit: number;
	sort: string;
	direction: string;
	search: { memberId?: string };
}

const MyBlogs: NextPage = ({ initialInquiry, ...props }: any) => {
	const user = useReactiveVar(userVar);

	// --- BLOG STATE ---
	const [articleList, setArticleList] = useState<BoardArticle[]>([]);
	const [articleTotal, setArticleTotal] = useState<number>(0);
	const [articlePage, setArticlePage] = useState<number>(1);
	const [articleLimit] = useState<number>(5);

	// --- Query input ---
	const articleInput: SellerCommunity = {
		page: articlePage,
		limit: articleLimit,
		sort: 'createdAt',
		direction: 'DESC',
		search: { memberId: user._id },
	};

	// --- GET ARTICLES QUERY ---
	const {
		loading: articlesLoading,
		data: articlesData,
		refetch: articlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		variables: { input: articleInput },
		skip: !user?._id,
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});

	// --- Update state when query data changes ---
	useEffect(() => {
		if (articlesData?.getBoardArticles) {
			setArticleList(articlesData.getBoardArticles.list || []);
			setArticleTotal(articlesData.getBoardArticles.metaCounter?.[0]?.total || 0);
		}
	}, [articlesData]);

	// --- Refetch articles when page/user changes ---
	useEffect(() => {
		if (user._id) {
			articlesRefetch({ input: articleInput });
		}
	}, [articlePage, articleLimit, user._id]);

	// --- Pagination handler ---
	const handleArticlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setArticlePage(value);
	};

	return (
		<Container maxWidth={false}>
			<h2 className={'list-title'} style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}>
				My Blogs
			</h2>

			<Stack className={'blog-listing-box'}>
				<Stack className={'blog-listing'}>
					<Box className={'title-bar'}>
						<p className={'list'}>Listing</p>
						<p className={'stat'}>Status</p>
						<p className={'date'}>Date</p>
						<p className={'act'}>Action</p>
					</Box>

					{articleList.length === 0 ? (
						<p>No Articles found!</p>
					) : (
						articleList.map((article, idx) => <SellerBlogList key={idx} article={article} />)
					)}
				</Stack>

				<Stack className={'pagination-box'}>
					<Pagination
						page={articlePage}
						count={Math.ceil(articleTotal / articleLimit)}
						onChange={handleArticlePageChange}
						color="primary"
					/>
				</Stack>
			</Stack>
		</Container>
	);
};

export default withSellerLayout(MyBlogs);
