import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const ArticleDetail: NextPage = () => {
	console.log('ARTICLE DETAIL PAGE');
	return <Container>ARTICLE DETAIL</Container>;
};

export default withLayoutBasic(ArticleDetail);
