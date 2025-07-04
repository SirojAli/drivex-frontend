import { Stack, Box, Container } from '@mui/material';
import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';

import withLayoutMain from '../libs/components/layout/LayoutMain';
import TopBrands from '../libs/components/homepage/TopBrands';
import Advertisement from '../libs/components/homepage/Advertisement';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import CarReview from '../libs/components/homepage/CarReview';
import PopularCars from '../libs/components/homepage/PopularCars';
import CompareCars from '../libs/components/homepage/CompareCars';

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TopBrands />
				<PopularCars />
				<Advertisement />
				<CompareCars />
				<CarReview />
				<CommunityBoards />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<TopBrands />
				<PopularCars />
				<Advertisement />
				<CompareCars />
				<CarReview />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
