import React from 'react';
import { Stack, Box } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useQuery } from '@apollo/client';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { REACT_APP_API_URL } from '../../../libs/config';
import Link from 'next/link';
import Moment from 'react-moment';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { useRouter } from 'next/router';
import { BoardArticle } from '../../types/board-article/board-article';
import useDeviceDetect from '../../hooks/useDeviceDetect';

const CommunityHome = () => {
	const router = useRouter();
	const device = useDeviceDetect();

	const { data, loading, error } = useQuery(GET_BOARD_ARTICLES, {
		variables: {
			input: {
				page: 1,
				limit: 4,
				sort: 'articleLikes',
				direction: 'DESC',
				search: {
					articleCategory: BoardArticleCategory.NEWS,
				},
			},
		},
		fetchPolicy: 'cache-first',
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading community posts</p>;

	const articles: BoardArticle[] = data?.getBoardArticles?.list || [];
	if (!articles.length) return null;

	const [featured, ...rest] = articles;

	/** Navigate to detail page (same logic as CommunityCard) */
	const goToDetail = (article: BoardArticle) => {
		router.push({
			pathname: '/community/detail',
			query: { articleCategory: article?.articleCategory, id: article?._id },
		});
	};

	if (device === 'mobile') {
		return (
			<Stack className={'main-blog'}>
				<Stack className={'post'}>
					<Stack className={'img-box'}>
						<img src={`${REACT_APP_API_URL}/${featured.articleImage}`} alt={featured.articleTitle} />
					</Stack>
					<Stack className={'content'}>
						<Box className={'heading'}>
							<Box className={'name-type'}>
								<span className={'type'}>{featured.articleCategory}</span>
							</Box>
							<h2>{featured.articleTitle}</h2>
						</Box>
						<span>{(featured.articleContent || '').slice(0, 120)}...</span>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'main-blog'}>
				{/* Featured Post */}
				<Stack className={'post'} onClick={() => goToDetail(featured)} style={{ cursor: 'pointer' }}>
					<Stack className={'img-box'}>
						<img src={`${REACT_APP_API_URL}/${featured.articleImage}`} alt={featured.articleTitle} />
						<Box className={'date'}>
							<p>
								<Moment format="MMMM D, YYYY">{featured.createdAt}</Moment>
							</p>
						</Box>
					</Stack>
					<Stack className={'content'}>
						<Box className={'heading'}>
							<Box className={'name-type'}>
								<p className={'name'}>{featured?.memberData?.memberNick ?? 'Unknown Author'}</p>
								<div className={'dvr'}></div>
								<span className={'type'}>{featured.articleCategory}</span>
							</Box>
							<h2>{featured.articleTitle}</h2>
						</Box>
						<span>{(featured.articleContent || '').slice(0, 120)}...</span>
					</Stack>
				</Stack>
				<div className={'divider'}></div>

				{/* Listing Posts */}
				<Stack className={'listing'}>
					{rest.map((article: BoardArticle) => (
						<Box className={'blog'} key={article._id} onClick={() => goToDetail(article)} style={{ cursor: 'pointer' }}>
							<img src={`${REACT_APP_API_URL}/${article.articleImage}`} alt={article.articleTitle} />
							<Stack className={'content'}>
								<Box className={'heading'}>
									<Box className={'name-type'}>
										<p className={'name'}>{article?.memberData?.memberNick ?? 'Unknown Author'}</p>
										<div className={'dvr'}></div>
										<span className={'type'}>{article.articleCategory}</span>
									</Box>
									<h2>{article.articleTitle}</h2>
								</Box>
								<span>{(article.articleContent || '').slice(0, 80)}...</span>
							</Stack>
						</Box>
					))}

					<Link
						href={{
							pathname: '/community',
							query: { articleCategory: 'NEWS' },
						}}
						passHref
					>
						<Box className={'see-more'} style={{ cursor: 'pointer' }}>
							<span>View all news</span>
							<ArrowRightAltIcon className={'arrow'} />
						</Box>
					</Link>
				</Stack>
			</Stack>
		);
	}
};

export default CommunityHome;
