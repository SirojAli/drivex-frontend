import React from 'react';
import { Box, Stack } from '@mui/material';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { REACT_APP_API_URL } from '../../../libs/config';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import Link from 'next/link';

const CarReviewCard = ({ index }: { index: number }) => {
	const router = useRouter();

	/** Query only "REVIEWS" articles */
	const { data, loading, error } = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: {
				page: 1,
				limit: 3,
				sort: 'createdAt',
				direction: 'DESC',
				search: {
					articleCategory: BoardArticleCategory.REVIEWS,
				},
			},
		},
		fetchPolicy: 'cache-first',
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading reviews</p>;

	const articles = data?.getBoardArticles?.list || [];
	const article = articles[index - 1];

	if (!article) return null;

	const detailHref = {
		pathname: '/community/detail',
		query: {
			articleCategory: article.articleCategory ?? BoardArticleCategory.REVIEWS,
			id: article._id,
		},
	};

	return (
		<Stack
			className={'review-card'}
			sx={{
				backgroundImage: `url(${REACT_APP_API_URL}/${article.articleImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Box className={'review-card-content'}>
				<h2>{article.articleTitle}</h2>
				<p>{article.articleContent?.slice(0, 100)}...</p>
				<div className={'review-btn'}>
					<Link href={detailHref}>
						<p>Review detail</p>
					</Link>
				</div>
			</Box>
		</Stack>
	);
};

export default CarReviewCard;
