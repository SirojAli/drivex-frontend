import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Stack, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const TuiEditor = dynamic(() => import('../.././../libs/components/community/Teditor'), { ssr: false });

const AddBlog: NextPage = ({ initialInquiry, ...props }: any) => {
	return (
		<div className={'add-blog'}>
			<h3>Write Blog</h3>
			<Stack className={'blog-boxes'}>
				<TuiEditor />
			</Stack>
		</div>
	);
};

export default withSellerLayout(AddBlog);
