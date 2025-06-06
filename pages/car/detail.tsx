import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const CarDetail: NextPage = () => {
	console.log('CAR DETAIL PAGE');
	return <Container>CAR DETAIL</Container>;
};

export default withLayoutBasic(CarDetail);
