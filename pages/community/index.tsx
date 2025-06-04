import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const ArticleList: NextPage = () => {
	console.log('ARTICLE LIST PAGE');
	return (
		<>
			<Stack sx={{ background: '#81c784' }}>HEADER</Stack>
			<Container>ARTICLE LIST</Container>
			<Stack sx={{ background: '#a1887f' }}>FOOTER</Stack>
		</>
	);
};

export default withLayoutBasic(ArticleList);
