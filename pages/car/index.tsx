import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const CarList: NextPage = () => {
	console.log('CAR LIST PAGE');
	return <Container>CAR LIST</Container>;
};

export default withLayoutBasic(CarList);
