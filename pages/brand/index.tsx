import React, { useState } from 'react';
import { NextPage } from 'next';
import { Stack } from '@mui/material';
import BrandCard from '../../libs/components/brand/BrandCard';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { Member } from '../../libs/types/member/member';
import { LIKE_TARGET_MEMBER } from '../../apollo/user/mutation';
import { GET_SELLERS } from '../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../libs/types/common';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { Messages } from '../../libs/config';

const BrandList: NextPage = ({ initialInput }: any) => {
	const device = useDeviceDetect();
	const router = useRouter();

	const [searchFilter, setSearchFilter] = useState<any>(
		router?.query?.input ? JSON.parse(router?.query?.input as string) : initialInput,
	);
	const [sellers, setSellers] = useState<Member[]>([]);
	const [total, setTotal] = useState<number>(0);

	/** APOLLO **/
	const [likeTargetMember] = useMutation(LIKE_TARGET_MEMBER);

	const { refetch: getSellersRefetch } = useQuery(GET_SELLERS, {
		variables: { input: searchFilter },
		fetchPolicy: 'network-only',
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setSellers(data?.getSellers?.list || []);
			setTotal(data?.getSellers?.metaCounter?.[0]?.total || 0);
		},
	});

	const likeMemberHandler = async (user: any, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);

			await likeTargetMember({ variables: { input: id } });
			await getSellersRefetch({ input: searchFilter });
			await sweetTopSmallSuccessAlert('Success!', 800);
		} catch (err: any) {
			console.log('LIKE MEMBER ERROR:', err.message);
			sweetMixinErrorAlert(err.message);
		}
	};

	if (device === 'mobile') {
		return <Stack>CAR BRAND MOBILE</Stack>;
	}

	return (
		<div id="brand-list-page">
			<Stack className="container">
				<Stack className="brand-grid">
					{sellers?.length === 0 ? (
						<div className="no-data">
							<img src="/img/icons/icoAlert.svg" alt="no-sellers" />
							<p>No Sellers found!</p>
						</div>
					) : (
						sellers.map((seller: Member) => (
							<BrandCard
								key={seller._id}
								seller={seller}
								likeMemberHandler={likeMemberHandler}
								onClick={() =>
									router.push({
										pathname: '/brand/detail',
										query: {
											id: seller._id,
											brand: encodeURIComponent(seller.memberNick),
										},
									})
								}
							/>
						))
					)}
				</Stack>
			</Stack>
		</div>
	);
};

BrandList.defaultProps = {
	initialInput: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'ASC',
		search: {},
	},
};

export default withLayoutBasic(BrandList);
