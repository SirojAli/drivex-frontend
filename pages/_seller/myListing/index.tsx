import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withSellerLayout from '../../../libs/components/layout/LayoutSeller';
import { Box, Container, Stack, Pagination } from '@mui/material';
import SellerCarList from '../../../libs/components/seller/SellerCarList';
import { useReactiveVar, useQuery } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { Car } from '../../../libs/types/car/car';
import { GET_CARS } from '../../../apollo/user/query';

const MyListing: NextPage = ({ initialInquiry, ...props }: any) => {
  const user = useReactiveVar(userVar);
  const router = useRouter();

  // --- CAR LIST STATE ---
  const [carList, setCarList] = useState<Car[]>([]);
  const [carTotal, setCarTotal] = useState<number>(0);
  const [carPage, setCarPage] = useState<number>(1);
  const [carLimit] = useState<number>(8);

  // --- Query inputs ---
  const carInput = {
    page: carPage,
    limit: carLimit,
    search: { memberId: user._id },
  };

  // --- GET CARS QUERY ---
  const {
    loading: carsLoading,
    data: carsData,
    refetch: carsRefetch,
  } = useQuery(GET_CARS, {
    variables: { input: carInput },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  // --- Update car state when data changes ---
  useEffect(() => {
    if (carsData?.getCars) {
      setCarList(carsData.getCars.list || []);
      setCarTotal(carsData.getCars.metaCounter?.[0]?.total || 0);
    }
  }, [carsData]);

  // --- Refetch cars when page or user changes ---
  useEffect(() => {
    if (user?._id) {
      carsRefetch({ input: carInput });
    }
  }, [carPage, carLimit, user._id]);

  // --- Pagination Handler ---
  const handleCarPageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCarPage(value);
  };

  return (
    <Container maxWidth={false}>
      <h2
        className={'dash-title'}
        style={{ marginBottom: '20px', fontSize: '30px', fontWeight: 600 }}
      >
        My Car Listings
      </h2>
      <Stack className={'car-listing-box'}>
        <Stack className={'car-listing'}>
          <Box className={'title-bar'}>
            <p className={'list'}>Listing</p>
            <p className={'stat'}>Status</p>
            <p className={'date'}>Date</p>
            <p className={'act'}>Action</p>
          </Box>
          {carList.length === 0 ? (
            <p>No Cars found!</p>
          ) : (
            carList.map((car, idx) => <SellerCarList key={idx} car={car} />)
          )}
        </Stack>

        <Stack className={'pagination-box'}>
          <Pagination
            page={carPage}
            count={Math.ceil(carTotal / carLimit)}
            onChange={handleCarPageChange}
            color="primary"
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default withSellerLayout(MyListing);
