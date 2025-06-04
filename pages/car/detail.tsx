import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutFull from '../../libs/components/layout/LayoutFull';

const CarDetail: NextPage = () => {
	console.log('CAR LIST DETAIL PAGE');
	return (
		<>
			<Stack sx={{ background: '#81c784' }}>HEADER</Stack>
			<Container>CAR LIST DETAIL</Container>
			<Stack sx={{ background: '#a1887f' }}>FOOTER</Stack>
		</>
	);
};

export default withLayoutFull(CarDetail);
