import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';

import { MemberPanelList } from '../../../libs/components/admin/users/MemberList';
import { Box, InputAdornment, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import TablePagination from '@mui/material/TablePagination';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../../libs/types/common';
import { sweetErrorHandling } from '../../../libs/sweetAlert';

const AddBlog: NextPage = ({ initialInquiry, ...props }: any) => {
	return <h1>ADD BLOG</h1>;
};

export default withSellerLayout(AddBlog);
