import React, { useState, ChangeEvent, useEffect } from 'react';
import { NextPage } from 'next';
import { Stack, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import CarCard from '../../libs/components/car/CarCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import { CarsInquiry } from '../../libs/types/car/car.input';
import { Message } from '../../libs/enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';
import { useRouter } from 'next/router';
import { LIKE_TARGET_CAR } from '../../apollo/user/mutation';
import { Car } from '../../libs/types/car/car';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { T } from '../../libs/types/common';
import { GET_CARS } from '../../apollo/user/query';
import { Direction } from '../../libs/enums/common.enum';
import { CarBrand } from '../../libs/enums/car.enum';

interface BrandCarsProps {
  initialInput: CarsInquiry;
}

const BrandDetail: NextPage = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const { brandSlug } = router.query;

  const [chosenBrandCars, setChosenBrandCars] = useState<Car[]>([]);
  const [searchFilter, setSearchFilter] = useState<CarsInquiry>(initialInput);
  const [searchQuery, setSearchQuery] = useState('');
  const [brandName, setBrandName] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('Featured');

  /** APOLLO REQUESTS **/
  const [likeTargetCar] = useMutation(LIKE_TARGET_CAR);

  // CHANGED FROM useQuery TO useLazyQuery
  const [getCars, { loading: getCarsLoading, data: getCarsData, error: getCarsError }] =
    useLazyQuery(GET_CARS, {
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data: T) => {
        if (data?.getCars?.list && Array.isArray(data.getCars.list)) {
          setChosenBrandCars(data.getCars.list);
        } else {
          setChosenBrandCars([]);
        }
      },
    });

  // UPDATED: Extract brand name from slug and trigger car query
  useEffect(() => {
    if (!router.isReady || typeof brandSlug !== 'string') return;

    const brandCode = brandSlug.split('-')[0].toUpperCase(); // e.g. 'bmw-KR' => 'BMW'
    setBrandName(brandCode);

    const newInput: CarsInquiry = {
      ...searchFilter,
      page: 1,
      search: {
        ...searchFilter.search,
        brandList: [brandCode as CarBrand],
      },
    };

    setSearchFilter(newInput);
    getCars({ variables: { input: newInput } });
  }, [brandSlug, router.isReady]);

  // UPDATED: Trigger search when filter changes
  useEffect(() => {
    if (searchFilter?.search?.brandList?.length) {
      getCars({ variables: { input: searchFilter } });
    }
  }, [searchFilter]);

  /** HANDLERS **/
  const likeCarHandler = async (user: T, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);
      await likeTargetCar({ variables: { input: id } });
      await getCars({ variables: { input: searchFilter } });
      await sweetTopSmallSuccessAlert('Success! ', 800);
    } catch (err: any) {
      console.log('ERROR, likeCarHandler: ', err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newInput = {
      ...searchFilter,
      search: {
        ...searchFilter.search,
        carModel: searchQuery,
      },
      page: 1,
    };
    setSearchFilter(newInput);
    getCars({ variables: { input: newInput } });
  };

  // FILTER TABS
  const filterMap: Record<string, Partial<CarsInquiry>> = {
    Featured: {
      sort: 'carViews',
      direction: Direction.DESC,
      search: { brandList: searchFilter.search.brandList },
    },
    Popular: {
      sort: 'carLikes',
      direction: Direction.DESC,
      search: { brandList: searchFilter.search.brandList },
    },
    New: {
      sort: 'carYear',
      direction: Direction.DESC,
      search: { brandList: searchFilter.search.brandList, carYear: { min: 2025, max: 2025 } },
    },
    Upcoming: {
      sort: 'carYear',
      direction: Direction.DESC,
      search: { brandList: searchFilter.search.brandList, carYear: { min: 2026, max: 2026 } },
    },
  };

  const handleFilterClick = (filterKey: string) => {
    const filterUpdate = filterMap[filterKey];
    if (!filterUpdate) return;

    setActiveFilter(filterKey);

    const preservedSearch = {
      brandList: searchFilter.search.brandList,
      ...filterUpdate.search,
    };

    const updatedInput: CarsInquiry = {
      ...searchFilter,
      sort: filterUpdate.sort ?? searchFilter.sort,
      direction: filterUpdate.direction ?? searchFilter.direction,
      search: preservedSearch,
      page: 1,
    };

    setSearchFilter(updatedInput);
    getCars({ variables: { input: updatedInput } });
  };

  const viewCarHandler = async () => {
    await router.push({
      pathname: '/car/detail',
    });
  };

  if (device === 'mobile') {
    return <Stack>CAR BRAND DETAIL MOBILE</Stack>;
  } else {
    return (
      <div id="brand-detail-page">
        <Stack className={'container-box'}>
          {/* Header */}
          <Box className={'brand-header'}>
            <h2 className={'brand-name'}>{chosenBrandCars[0]?.carBrand || brandName || 'Brand'}</h2>
          </Box>

          {/* Filter and Search */}
          <Box className={'filter-search-box'}>
            <Box className={'filter-box'}>
              {['Featured', 'Popular', 'New', 'Upcoming'].map((filter) => (
                <div
                  key={filter}
                  className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filter)}
                >
                  <p>{filter}</p>
                </div>
              ))}
            </Box>

            <Box className={'search-box'}>
              <form className={'search-form'} onSubmit={searchHandler}>
                <input
                  type="search"
                  placeholder="Search car"
                  className={'search-input'}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <Button type="submit" className={'search-btn'}>
                  <SearchIcon />
                </Button>
              </form>
            </Box>
          </Box>

          {/* Car Cards */}
          <Box className={'car-list-box'}>
            <Stack className={'car-list'}>
              {chosenBrandCars?.length === 0 ? (
                <p>No cars found for this brand.</p>
              ) : (
                chosenBrandCars.map((car, index) => (
                  <CarCard
                    key={index}
                    car={car}
                    allCars={chosenBrandCars}
                    likeCarHandler={likeCarHandler}
                  />
                ))
              )}
            </Stack>
          </Box>
        </Stack>
      </div>
    );
  }
};

BrandDetail.defaultProps = {
  initialInput: {
    page: 1,
    limit: 24,
    sort: 'carViews',
    direction: 'DESC',
    search: { carStatus: ['ACTIVE', 'SOLD'] },
  },
};

export default withLayoutBasic(BrandDetail);
