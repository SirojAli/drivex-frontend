import React, { useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { T } from '../../types/common';
import { useMutation, useQuery } from '@apollo/client';
import { GET_VISITED } from '../../../apollo/user/query';
import { Car } from '../../types/car/car';
import CarCard from '../car/CarCard';
import { Message } from '../../enums/common.enum';
import { LIKE_TARGET_CAR } from '../../../apollo/user/mutation';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';

const RecentlyVisited: NextPage = () => {
  const device = useDeviceDetect();

  const [recentlyVisited, setRecentlyVisited] = useState<Car[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 9 });

  /** APOLLO REQUESTS **/
  const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

  const {
    loading: getVisitedLoading,
    data: getVisitedData,
    error: getVisitedError,
    refetch: getVisitedRefetch,
  } = useQuery(GET_VISITED, {
    fetchPolicy: 'network-only',
    variables: { input: searchVisited },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setRecentlyVisited(data.getVisited?.list || []);
      setTotal(data.getVisited?.metaCounter?.[0]?.total || 0);
    },
  });

  /** HANDLERS **/
  const paginationHandler = (e: React.ChangeEvent<unknown>, value: number) => {
    setSearchVisited((prev) => ({ ...prev, page: value }));
  };

  const likeCarHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetCar({ variables: { input: id } });

      await getVisitedRefetch({ input: { ...searchVisited } });

      await sweetTopSmallSuccessAlert('Success! ', 800);
    } catch (err: any) {
      console.error('ERROR, likeCarHandler: ', err.message);
      await sweetMixinErrorAlert(err.message);
    }
  };

  if (device === 'mobile') {
    return <div>Recently Visited - Mobile version coming soon!</div>;
  }

  return (
    <div id="my-favorites-page">
      <Stack className="main-title-box">
        <Stack className="right-box">
          <Typography className="main-title">Recently Visited</Typography>
          {/* <Typography className="sub-title">We are glad to see you again!</Typography> */}
        </Stack>
      </Stack>

      <Stack className="favorites-list-box">
        {recentlyVisited.length ? (
          recentlyVisited.map((car: Car) => (
            <CarCard
              key={`${car._id}-${car.meLiked?.[0]?.myFavorite ? 'liked' : 'unliked'}`}
              car={car}
              allCars={recentlyVisited}
              likeCarHandler={likeCarHandler}
              recentlyVisited={true}
            />
          ))
        ) : (
          <div className="no-data">
            <img src="/img/icons/icoAlert.svg" alt="No recently visited cars" />
            <p>No recently visited cars found!</p>
          </div>
        )}
      </Stack>

      {recentlyVisited.length > 0 && (
        <Stack className="pagination-config">
          <Stack className="pagination-box">
            <Pagination
              count={Math.ceil(total / searchVisited.limit)}
              page={searchVisited.page}
              shape="circular"
              color="primary"
              onChange={paginationHandler}
            />
          </Stack>
          <Stack className="total-result">
            <Typography>
              Total {total} recently visited car{total > 1 ? 's' : ''}
            </Typography>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default RecentlyVisited;
