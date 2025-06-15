import { Container, Stack } from '@mui/material';
import { NextPage } from 'next';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';

const CSList: NextPage = () => {
	return (
		<div className={'cs-list'}>
			<Stack className={'container'}>CS LIST</Stack>
		</div>
	);
};

export default withLayoutBasic(CSList);
