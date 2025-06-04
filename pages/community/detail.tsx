import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const ArticleDetail: NextPage = () => {
	console.log('ARTICLE DETAIL PAGE');
	return (
		<>
			<Stack sx={{ background: '#81c784' }}>HEADER</Stack>
			<Container>ARTICLE LIST DETAIL</Container>
			<Stack sx={{ background: '#a1887f' }}>FOOTER</Stack>
		</>
	);
};

export default withLayoutBasic(ArticleDetail);
