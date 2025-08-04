import React from 'react';
import { Stack, Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { BoardArticle } from '../../types/board-article/board-article';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { REACT_APP_API_URL } from '../../../libs/config';
import Moment from 'react-moment';

interface BlogCardProps {
	article: BoardArticle;
	likeArticleHandler: any;
}

const BlogCard = (props: BlogCardProps) => {
	const { article, likeArticleHandler } = props;
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	return (
		<Stack className={'blog-boxes'}>
			<Stack className={'blog-box'}>
				<Stack className={'img-box'}>
					<img src={`${REACT_APP_API_URL}/${article?.articleImage}`} alt={'article'} loading="lazy" />
					<Stack className="date">
						<Typography className="full-date">
							<Moment format="MMMM D, YYYY">{article.createdAt}</Moment>
						</Typography>
					</Stack>
					<div
						className={`action-btn like-btn ${article?.meLiked?.[0]?.myFavorite ? 'liked' : ''}`}
						onClick={() => likeArticleHandler(user, article?._id)}
					>
						<FavoriteIcon className="heart-icon" />
					</div>
				</Stack>
				<Stack className={'content-box'}>
					<Box className={'heading'}>
						<Box className={'content'}>
							<p className={'author'}>{article?.memberData?.memberNick}</p>
							<div className={'dvr'}></div>
							<span className={'type'}>{article?.articleCategory}</span>
						</Box>
						<h3>{article?.articleTitle}</h3>
					</Box>
					<span>{article?.articleContent}</span>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default BlogCard;
