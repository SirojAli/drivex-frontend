import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';

const CarList: NextPage = () => {
	console.log('CAR LIST PAGE');
	return (
		<>
			<Stack sx={{ background: '#81c784' }}>HEADER</Stack>
			<Container>CAR LIST</Container>
			<Stack sx={{ background: '#a1887f' }}>FOOTER</Stack>
		</>
	);
};

// export default withLayoutFull(CarList);
export default CarList;
