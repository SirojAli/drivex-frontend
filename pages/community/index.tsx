import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const ArticleList: NextPage = () => {
	return (
		<div className={'car-list'}>
			<Stack className={'container'}>ARTICLE LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(ArticleList);
