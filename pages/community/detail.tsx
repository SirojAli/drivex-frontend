import { Stack, Button, Typography, Box } from '@mui/material';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import withLayoutFull from '../../libs/components/layout/LayoutFull';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { CommentInput, CommentsInquiry } from '../../libs/types/comment/comment.input';
import { Comment } from '../../libs/types/comment/comment';
import { userVar } from '../../apollo/store';
import { BoardArticle } from '../../libs/types/board-article/board-article';
import { T } from '../../libs/types/common';
import { GET_COMMENTS } from '../../apollo/admin/query';
import { Messages, REACT_APP_API_URL } from '../../libs/config';
import { GET_BOARD_ARTICLE } from '../../apollo/user/query';
import { CREATE_COMMENT, LIKE_TARGET_BOARD_ARTICLE, UPDATE_COMMENT } from '../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { CommentGroup, CommentStatus } from '../../libs/enums/comment.enum';

const CommunityDetail: NextPage = ({ initialComment, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;

	const articleId = query?.id as string;
	const articleCategory = query?.articleCategory as string;

	const [comment, setComment] = useState<string>('');
	const user = useReactiveVar(userVar);

	const [boardArticle, setBoardArticle] = useState<BoardArticle>();
	const [memberImage, setMemberImage] = useState<string>('/img/community/articleImg.png');

	// Comment related states
	const [commentInquiry, setCommentInquiry] = useState<CommentsInquiry>({
		...initialComment,
		limit: initialComment?.limit ?? 5,
		page: initialComment?.page ?? 1,
		search: {
			commentRefId: initialComment?.search?.commentRefId ?? '',
		},
	});
	const [articleComments, setArticleComments] = useState<Comment[]>([]);
	const [commentTotal, setCommentTotal] = useState<number>(0);
	const [insertCommentData, setInsertCommentData] = useState<CommentInput>({
		commentGroup: CommentGroup.ARTICLE,
		commentContent: '',
		commentRefId: '',
	});

	/** APOLLO REQUESTS **/
	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);
	const [createComment] = useMutation(CREATE_COMMENT);
	const [updateComment] = useMutation(UPDATE_COMMENT);

	// Chosen Article Rendering
	const {
		loading: boardArticleLoading,
		data: boardArticleData,
		error: getBoardArticleError,
		refetch: boardArticleRefetch,
	} = useQuery(GET_BOARD_ARTICLE, {
		fetchPolicy: 'network-only',
		variables: { input: articleId },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticle(data?.getBoardArticle);
			if (data?.getBoardArticle?.memberData?.memberImage) {
				setMemberImage(`${process.env.REACT_APP_API_URL}/${data?.getBoardArticle?.memberData?.memberImage}`);
			}
		},
	});

	// Comment Rendering
	const {
		loading: getCommentsLoading,
		data: getCommentsData,
		error: getCommentsError,
		refetch: getCommentsRefetch,
	} = useQuery(GET_COMMENTS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: commentInquiry },
		skip: !commentInquiry?.search?.commentRefId,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			if (data?.getComments?.list) {
				setArticleComments(data.getComments.list);
			} else {
				setArticleComments([]);
			}
			setCommentTotal(data?.getComments?.metaCounter?.[0]?.total ?? 0);
		},
	});

	/** LIFECYCLES **/
	// Update commentRefId and insertCommentData when articleIdFromQuery changes
	useEffect(() => {
		if (articleId) {
			setCommentInquiry((prev) => ({
				...prev,
				search: {
					...prev.search,
					commentRefId: articleId,
				},
			}));

			setInsertCommentData((prev) => ({
				...prev,
				commentRefId: articleId,
			}));
		}
	}, [articleId]);

	// Refetch comments when commentInquiry changes
	useEffect(() => {
		if (commentInquiry.search.commentRefId) {
			getCommentsRefetch({ input: commentInquiry });
		}
	}, [commentInquiry, getCommentsRefetch]);

	/** HANDLERS **/
	// Handle comment input change
	const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInsertCommentData((prev) => ({
			...prev,
			commentContent: e.target.value,
		}));
	};

	// Create new comment
	const createCommentHandler = async () => {
		try {
			if (!user?._id) throw new Error(Messages.error2);
			if (!insertCommentData.commentContent?.trim()) {
				await sweetMixinErrorAlert('Comment cannot be empty.');
				return;
			}
			await createComment({ variables: { input: insertCommentData } });

			// Clear comment input
			setInsertCommentData((prev) => ({
				...prev,
				commentContent: '',
			}));

			// Refresh comments
			await getCommentsRefetch({ input: commentInquiry });
			await boardArticleRefetch({ input: articleId });

			await sweetTopSmallSuccessAlert('Your comment was submitted successfully!');
		} catch (err: any) {
			await sweetMixinErrorAlert(err.message || 'Failed to submit comment.');
		}
	};

	// Handle pressing Enter to submit comment
	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			createCommentHandler();
		}
	};

	const commentPaginationChangeHandler = async () => {
		const updatedInquiry = {
			...commentInquiry,
			limit: 15,
		};

		setCommentInquiry(updatedInquiry);

		await getCommentsRefetch({ input: updatedInquiry });
	};

	const goMemberPage = (id?: string) => {
		if (!id) return;

		if (id === user?._id) {
			router.push('/mypage');
		} else {
			router.push(`/member?memberId=${id}`);
		}
	};

	const handleShare = () => {
		const carUrl = window.location.href;
		navigator.clipboard.writeText(carUrl).then(() => {
			alert('🔗 Link copied to clipboard!');
		});
	};

	if (device === 'mobile') {
		return <Stack>ARTICLE DETAIL PAGE MOBILE</Stack>;
	} else {
		return (
			<div id="community-detail-page">
				<Stack className={'container'}>
					{/* Sub-Header */}
					<Stack className={'sub-header'}>
						<Link href={'/'} className={'link'}>
							Home
						</Link>
						<ArrowForwardIosIcon className={'arrow'} />
						<span>Blog Detail</span>
					</Stack>

					{/* Title */}
					<Stack className={'car-list-title'}>
						<Stack className={'blog-title'}>
							<h1>{boardArticle?.articleTitle}</h1>
							<Stack className={'title-box'}>
								<Box className={'t-box'}>
									<AccountCircleIcon className={'icon'} />
									<p onClick={() => goMemberPage(boardArticle?.memberData?._id)} style={{ cursor: 'pointer' }}>
										{boardArticle?.memberData?.memberNick}
									</p>
								</Box>
								<Box className={'t-box'}>
									<FolderOpenIcon className={'icon'} />
									<p className={'catg'}>{boardArticle?.articleCategory}</p>
								</Box>
								<Box className={'t-box'}>
									<ChatIcon className={'icon2'} />
									<span>{boardArticle?.articleComments ?? 0} comments</span>
								</Box>
								<Box className={'t-box'}>
									<CalendarTodayIcon className={'icon2'} />
									<span>
										{new Date(boardArticle?.createdAt || '').toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</Box>
							</Stack>
						</Stack>
						<div className={'divider'}></div>
					</Stack>

					{/* Main */}
					<Stack className={'main-box'}>
						<Stack className={'left-box'}>
							<Stack className={'blog-content'}>
								{/* Blog Img */}
								<Stack className={'img-box'}>
									<img src={`${REACT_APP_API_URL}/${boardArticle?.articleImage}`} alt={'article'} loading="lazy" />
								</Stack>

								{/* Blog Content */}
								<Stack className={'content-box'}>
									<span>
										{boardArticle?.articleContent &&
											(() => {
												const sentences = boardArticle.articleContent
													.split('.')
													.map((s) => s.trim())
													.filter(Boolean);

												const first = sentences[0] || '';
												const second = sentences.slice(1, 4).join('. ') || '';
												const third = sentences.slice(4).join('. ') || '';

												return (
													<>
														<p>{first}.</p>
														{second && <p>{second}.</p>}
														{third && <p>{third}.</p>}
													</>
												);
											})()}
									</span>
								</Stack>

								<div className={'divider'}></div>

								{/* Tag & Share */}
								<Stack className={'tag-share'}>
									<Box className={'tags'}>
										<p>Tags:</p>
										<Box className={'tag'}>
											<span>DriveX</span>
										</Box>
										<Box className={'tag'}>
											<span className={'catg'}>{boardArticle?.articleCategory}</span>
										</Box>
										<Box className={'tag'}>
											<span>Car Culture</span>
										</Box>
									</Box>

									<Box className={'share'}>
										<p>Share this post:</p>
										<Box className={'social'} onClick={handleShare}>
											<FacebookIcon className={'icon'} />
										</Box>
										<Box className={'social'} onClick={handleShare}>
											<LinkedInIcon className={'icon'} />
										</Box>
										<Box className={'social'} onClick={handleShare}>
											<XIcon className={'icon'} />
										</Box>
										<Box className={'social'} onClick={handleShare}>
											<InstagramIcon className={'icon'} />
										</Box>
									</Box>
								</Stack>
								<div className={'divider'}></div>

								{/* Reviews */}
								<Stack id="review" className="reviews">
									<Typography className="section-title">Comments ({commentTotal})</Typography>

									{articleComments.length === 0 && <Typography>No reviews yet. Be the first to leave one!</Typography>}

									{articleComments.map((r, idx) => {
										const imagePath = r.memberData?.memberImage
											? `${REACT_APP_API_URL}/${r.memberData.memberImage}`
											: '/img/logo/default.png';

										return (
											<Box key={r._id ?? idx} className="review">
												<Box className="avatar-name-wrapper">
													<Box
														className="avatar"
														onClick={() => {
															if (r.memberData?._id) {
																goMemberPage(r.memberData._id);
															}
														}}
														style={{ cursor: 'pointer' }}
													>
														{r.memberData?.memberImage?.[0] ? (
															<img src={imagePath} alt="user-avatar" className="avatar-img" />
														) : (
															<span>{r.memberData?.memberNick?.[0] ?? 'U'}</span>
														)}
													</Box>
													<Box
														className="avatar-name"
														onClick={() => {
															if (r.memberData?._id) {
																goMemberPage(r.memberData._id);
															}
														}}
														style={{ cursor: 'pointer' }}
													>
														<Typography className="user-name">{r.memberData?.memberFullName ?? 'User'}</Typography>
													</Box>
													<Typography className="date">{new Date(r.createdAt).toLocaleDateString()}</Typography>
												</Box>

												<Box className="content">
													<Typography className="comment">{r.commentContent}</Typography>
												</Box>
											</Box>
										);
									})}

									{commentTotal > (commentInquiry.limit ?? 5) && commentInquiry.limit !== 15 && (
										<Box className="show-more" onClick={commentPaginationChangeHandler}>
											<Typography className="more-link">View more reviews</Typography>
											<Box className="arrow">
												<ArrowDownwardIcon className="icon" />
											</Box>
										</Box>
									)}
								</Stack>

								{/* Post Comment */}
								{user?._id ? (
									<Stack className={'leave-comment'}>
										<Typography className={'main-title'}>Leave A Review</Typography>
										{/* <Typography className={'review-title'}>Review</Typography> */}

										<textarea
											value={insertCommentData.commentContent}
											onChange={({ target: { value } }) =>
												setInsertCommentData((prev) => ({ ...prev, commentContent: value }))
											}
											onKeyDown={handleKeyPress}
										/>

										<Box className={'submit-btn'} component={'div'}>
											<Button
												className={'submit-review'}
												disabled={!insertCommentData.commentContent.trim()}
												onClick={createCommentHandler}
											>
												<Typography className={'title'}>Submit Comment</Typography>
												<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
													<g clipPath="url(#clip0_6975_3642)">
														<path
															d="M16.1571 0.5H6.37936C6.1337 0.5 5.93491 0.698792 5.93491 0.944458C5.93491 1.19012 6.1337 1.38892 6.37936 1.38892H15.0842L0.731781 15.7413C0.558156 15.915 0.558156 16.1962 0.731781 16.3698C0.818573 16.4566 0.932323 16.5 1.04603 16.5C1.15974 16.5 1.27345 16.4566 1.36028 16.3698L15.7127 2.01737V10.7222C15.7127 10.9679 15.9115 11.1667 16.1572 11.1667C16.4028 11.1667 16.6016 10.9679 16.6016 10.7222V0.944458C16.6016 0.698792 16.4028 0.5 16.1571 0.5Z"
															fill="#fff"
															stroke="#fff"
															strokeWidth="1.5"
														/>
													</g>
													<defs>
														<clipPath id="clip0_6975_3642">
															<rect width="16" height="16" fill="white" transform="translate(0.601562 0.5)" />
														</clipPath>
													</defs>
												</svg>
											</Button>
										</Box>
									</Stack>
								) : (
									<Stack className={'leave-comment'}>
										<Typography className={'main-title'}>Leave A Review</Typography>
										<Typography className={'review-title'}>
											You must <strong>log in</strong> to leave a comment.
										</Typography>
										<Button variant="outlined" href="/account/join" sx={{ mt: 2 }}>
											Login to Comment
										</Button>
									</Stack>
								)}
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</div>
		);
	}
};

CommunityDetail.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		direction: 'DESC',
		search: { commentRefId: '' },
	},
};

export default withLayoutFull(CommunityDetail);
