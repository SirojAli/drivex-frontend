import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
const TuiEditor = dynamic(() => import('../.././../libs/components/community/Teditor'), {
	ssr: false,
});

const AddBlog: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<div className={'add-blog'}>
			<h2 className={'dash-title'} style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}>
				Write Blog
			</h2>
			<Stack className={'blog-boxes'}>
				<TuiEditor />
			</Stack>
		</div>
	);
};

export default withSellerLayout(AddBlog);
