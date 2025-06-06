import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const ArticleList: NextPage = () => {
	console.log('ARTICLE LIST PAGE');
	return <Container>ARTICLE LIST</Container>;
};

export default withLayoutBasic(ArticleList);
