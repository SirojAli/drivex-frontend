import { Stack, Box, Container } from '@mui/material';
import { NextPage } from 'next';
import withLayoutMain from '../libs/components/layout/LayoutMain';
import TopBrands from '../libs/components/homepage/TopBrands';
import Advertisement from '../libs/components/homepage/Advertisement';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import CarReview from '../libs/components/homepage/CarReview';
import PopularCars from '../libs/components/homepage/PopularCars';
import CompareCars from '../libs/components/homepage/CompareCars';

const Home: NextPage = () => {
	return (
		<Stack>
			<Stack className={'home-page'}>
				<TopBrands />
				<PopularCars />
				<Advertisement />
				<CompareCars />
				<CarReview />
				<CommunityBoards />
			</Stack>
		</Stack>
	);
};

export default withLayoutMain(Home);
