import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Pagination, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { userVar } from '../../../apollo/store';
import { T } from '../../types/common';
import { BoardArticle } from '../../types/board-article/board-article';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '../../../apollo/user/query';
import { Messages } from '../../config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import CommunityCard from '../community/CommunityCard';

interface SearchCommunity {
  page: number;
  limit: number;
  sort: string;
  direction: string;
  search: { memberId?: string };
}

const MemberArticles: NextPage = ({ initialInput, ...props }: T) => {
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const profileMemberId = router.query?.memberId as string | undefined;

  const [searchCommunity, setSearchCommunity] = useState<SearchCommunity>({
    ...initialInput,
    search: { memberId: profileMemberId || user._id },
  });
  const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    if (profileMemberId || user?._id) {
      setSearchCommunity((prev) => ({
        ...prev,
        search: { memberId: profileMemberId || user._id },
      }));
    }
  }, [profileMemberId, user?._id]);

  /** APOLLO REQUESTS **/
  const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);

  const {
    loading: boardArticlesLoading,
    data: boardArticlesData,
    error: getBoardArticlesError,
    refetch: boardArticlesRefetch,
  } = useQuery(GET_BOARD_ARTICLES, {
    fetchPolicy: 'network-only',
    variables: { input: searchCommunity },
    notifyOnNetworkStatusChange: true,
    onCompleted(data: T) {
      setBoardArticles(data?.getBoardArticles?.list ?? []);
      setTotalCount(data?.getBoardArticles?.metaCounter?.[0]?.total ?? 0);
    },
    skip: !(profileMemberId || user?._id),
  });

  useEffect(() => {
    if (profileMemberId || user?._id) {
      boardArticlesRefetch({ input: searchCommunity });
    }
  }, [searchCommunity, profileMemberId, user?._id]);

  /** HANDLERS **/
  const paginationHandler = (_: any, value: number) => {
    setSearchCommunity({ ...searchCommunity, page: value });
  };

  const likeArticleHandler = async (e: React.MouseEvent, currentUser: any, id: string) => {
    try {
      e.stopPropagation();
      if (!id) return;
      if (!currentUser?._id) throw new Error(Messages.error2);

      await likeTargetBoardArticle({
        variables: { input: id },
      });

      await boardArticlesRefetch({ input: searchCommunity });
      await sweetTopSmallSuccessAlert('Success!', 800);
    } catch (err: any) {
      console.error('ERROR, likeArticleHandler:', err.message);
      sweetMixinErrorAlert(err.message);
    }
  };

  if (device === 'mobile') {
    return <>ARTICLE PAGE MOBILE</>;
  } else {
    return (
      <div id="my-articles-page">
        <Stack className={'main-title-box'}>
          <Stack className={'right-box'}>
            <Typography className={'main-title'}>Article</Typography>
            {/* <Typography className={'sub-title'}>We are glad to see you again!</Typography> */}
          </Stack>
        </Stack>
        <Stack className={'article-list-box'}>
          {boardArticles?.length > 0 ? (
            boardArticles.map((boardArticle: BoardArticle) => (
              <CommunityCard
                key={boardArticle._id}
                article={boardArticle}
                likeArticleHandler={likeArticleHandler}
              />
            ))
          ) : (
            <div className={'no-data'}>
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Articles found!</p>
            </div>
          )}
        </Stack>

        {boardArticles?.length > 0 && (
          <Stack className={'pagination-conf'}>
            <Stack className={'pagination-box'}>
              <Pagination
                count={Math.ceil(totalCount / searchCommunity.limit)}
                page={searchCommunity.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </Stack>
            <Stack className={'total'}>
              <Typography>Total {totalCount} articles available</Typography>
            </Stack>
          </Stack>
        )}
      </div>
    );
  }
};

MemberArticles.defaultProps = {
  initialInput: {
    page: 1,
    limit: 6,
    sort: 'createdAt',
    direction: 'DESC',
    search: {},
  },
};

export default MemberArticles;
