import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Box, Container, Pagination, Stack } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ArticleIcon from '@mui/icons-material/Article';
import StarsIcon from '@mui/icons-material/Stars';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SellerCarList from '../../../libs/components/seller/SellerCarList';
import SellerBlogList from '../../../libs/components/seller/SellerBlogList';
import SellerReviewList from '../../../libs/components/seller/SellerReviewList';
import useDeviceDetect from '../../../libs/hooks/useDeviceDetect';
import { useReactiveVar, useQuery } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { Car } from '../../../libs/types/car/car';
import { BoardArticle } from '../../../libs/types/board-article/board-article';
import { GET_BOARD_ARTICLES, GET_CARS } from '../../../apollo/user/query';

interface SellerCommunity {
	page: number;
	limit: number;
	sort: string;
	direction: string;
	search: { memberId?: string };
}

const SellerDashboard: NextPage = ({ initialInput, initialComment, ...props }: any) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const router = useRouter();

	// --- CAR LIST ---
	const [carList, setCarList] = useState<Car[]>([]);
	const [carTotal, setCarTotal] = useState<number>(0);
	const [carPage, setCarPage] = useState<number>(1);
	const [carLimit] = useState<number>(5);

	// --- ARTICLE LIST ---
	const [articleList, setArticleList] = useState<BoardArticle[]>([]);
	const [articleTotal, setArticleTotal] = useState<number>(0);
	const [articlePage, setArticlePage] = useState<number>(1);
	const [articleLimit] = useState<number>(5);

	// Query inputs based on pagination and user id filters
	const carInput = {
		page: carPage,
		limit: carLimit,
		search: { memberId: user._id }, // Filter cars by current user
	};

	const articleInput: SellerCommunity = {
		page: articlePage,
		limit: articleLimit,
		sort: 'createdAt',
		direction: 'DESC',
		search: { memberId: user._id },
	};

	// --- GET CARS QUERY ---
	const {
		loading: carsLoading,
		data: carsData,
		refetch: carsRefetch,
	} = useQuery(GET_CARS, {
		variables: { input: carInput },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
	});

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

	// --- Extract all car and article IDs for comments filter ---
	const allCarIds = carList.map((car) => car._id);
	const allArticleIds = articleList.map((article) => article._id);
	const allRefIds = [...allCarIds, ...allArticleIds];

	// --- Effects to update state on data changes ---
	useEffect(() => {
		if (carsData?.getCars) {
			setCarList(carsData.getCars.list || []);
			setCarTotal(carsData.getCars.metaCounter?.[0]?.total || 0);
		}
	}, [carsData]);

	useEffect(() => {
		if (articlesData?.getBoardArticles) {
			setArticleList(articlesData.getBoardArticles.list || []);
			setArticleTotal(articlesData.getBoardArticles.metaCounter?.[0]?.total || 0);
		}
	}, [articlesData]);

	// --- Effects to refetch queries when pagination or user changes ---
	useEffect(() => {
		carsRefetch({ input: carInput });
	}, [carPage, carLimit, user._id]);

	useEffect(() => {
		// refetch articles when page/limit/user change
		if (user._id) {
			articlesRefetch({ input: articleInput });
		}
	}, [articlePage, articleLimit, user._id]);

	// --- Pagination Handlers ---
	const handleCarPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setCarPage(value);
	};

	const handleArticlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setArticlePage(value);
	};

	if (device === 'mobile') {
		return <div>SELLER DASHBOARD PAGE - MOBILE VIEW</div>;
	}

	return (
		<Container maxWidth={false}>
			<h2 className={'dash-title'} style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}>
				DASHBOARD
			</h2>
			<Stack className={'main-content'}>
				{/* DASHBOARD ICONS */}
				<Stack className={'main-dashboard'}>
					<Box className={'car-dash'}>
						<Box className={'icon'}>
							<DirectionsCarIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Car Listing</h5>
							<span>{carTotal}</span>
						</Box>
					</Box>
					<Box className={'favorite-dash'}>
						<Box className={'icon'}>
							<StarsIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Favorites</h5>
							<span>38</span>
						</Box>
					</Box>
					<Box className={'blog-dash'}>
						<Box className={'icon'}>
							<ArticleIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Blog Listing</h5>
							<span>24</span>
						</Box>
					</Box>
					<Box className={'review-dash'}>
						<Box className={'icon'}>
							<ReviewsIcon className={'ic'} />
						</Box>
						<Box className={'content'}>
							<h5>Reviews</h5>
							<span>49</span>
						</Box>
					</Box>
				</Stack>

				{/* CAR LISTING */}
				<Stack className={'car-listing-box'}>
					<h3>Car Listing</h3>
					<Stack className={'car-listing'}>
						<Box className={'title-bar'}>
							<p className={'list'}>Listing</p>
							<p className={'stat'}>Status</p>
							<p className={'date'}>Date</p>
							<p className={'act'}>Action</p>
						</Box>
						{carList.length === 0 ? (
							<p>No Cars found!</p>
						) : (
							carList.map((car, idx) => <SellerCarList key={idx} car={car} />)
						)}
					</Stack>
					<Stack className={'pagination-box'}>
						<Pagination
							page={carPage}
							count={Math.ceil(carTotal / carLimit)}
							onChange={handleCarPageChange}
							color="primary"
						/>
					</Stack>
				</Stack>

				{/* REVIEWS */}
				<Stack className={'review-listing-box'}>
					<h3>Reviews</h3>
					<SellerReviewList />
				</Stack>

				{/* BLOG ARTICLES */}
				<Stack className={'blog-listing-box'}>
					<h3>Blog Listing</h3>
					<Stack className={'car-listing'}>
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
			</Stack>
		</Container>
	);
};

export default withSellerLayout(SellerDashboard);
