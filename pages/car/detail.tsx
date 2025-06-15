import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const CarDetail: NextPage = () => {
	return (
		<div className={'car-detail-list'}>
			<Stack className={'container'}>CAR DETAIL LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(CarDetail);
