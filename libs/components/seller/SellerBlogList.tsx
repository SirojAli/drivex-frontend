import React, { useEffect, useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import Link from 'next/link';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Pagination,
  Stack,
} from '@mui/material';
import cookies from 'js-cookie';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import EditIcon from '@mui/icons-material/Edit';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoardArticle } from '../../types/board-article/board-article';
import { REACT_APP_API_URL } from '../../config';
import Moment from 'react-moment';
import { BoardArticleStatus } from '../../enums/board-article.enum';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface SellerArticleProps {
  article: BoardArticle;
  onStatusChange?: (id: string, status: BoardArticleStatus) => void;
}

const SellerBlogList = (props: SellerArticleProps) => {
  const router = useRouter();

  const { article, onStatusChange } = props;
  const [status, setStatus] = useState<BoardArticleStatus>(article.articleStatus);

  const isActive = article.articleStatus === BoardArticleStatus.ACTIVE;
  const isDeleted = article.articleStatus === BoardArticleStatus.DELETE;

  /** HANDLERS **/
  const viewBlogDetail = (e: React.SyntheticEvent, article: BoardArticle) => {
    router.push(
      {
        pathname: '/community/detail',
        query: { articleCategory: article?.articleCategory, id: article?._id },
      },
      undefined,
      { shallow: true },
    );
  };

  const handleChangeStatus = (newStatus: BoardArticleStatus) => {
    setStatus(newStatus);
    if (onStatusChange) onStatusChange(article._id, newStatus);
  };

  return (
    <div className={'blog-list-boxes'}>
      <Stack className={'blog-list'}>
        <Box className={'blog-items'}>
          {/* CAR NAME */}
          <Box className={'blog-content'} onClick={(e: any) => viewBlogDetail(e, article)}>
            <Box className={'blog-img'}>
              <img
                src={`${REACT_APP_API_URL}/${article?.articleImage}`}
                alt={'article'}
                loading="lazy"
              />
            </Box>
            <Box className={'blog-info'}>
              <h5>{article.articleTitle}</h5>
              <p>{article.articleCategory}</p>
            </Box>
          </Box>
          <div className={'divr'}></div>

          {/* CAR STATUS */}
          <Box className={'blog-status'}>
            {status === BoardArticleStatus.ACTIVE && (
              <Box className="status-active">
                <p className="active">Active</p>
              </Box>
            )}
            {status === BoardArticleStatus.DELETE && (
              <Box className="status-delete">
                <p className="delete">Delete</p>
              </Box>
            )}
          </Box>
          <div className={'divr'}></div>

          {/* DATE */}
          <Box className={'blog-date'}>
            <Moment format="MMMM D, YYYY">{article.createdAt}</Moment>
          </Box>
          <div className={'divr'}></div>

          {/* ACTIONS */}
          <Box className={'blog-action'}>
            <Box
              className="blog-edit"
              onClick={() => handleChangeStatus(BoardArticleStatus.ACTIVE)}
              style={{ cursor: 'pointer' }}
            >
              <CheckCircleOutlineIcon className="icon" />
              <p>Active</p>
            </Box>
            <Box
              className="blog-delete"
              onClick={() => handleChangeStatus(BoardArticleStatus.DELETE)}
              style={{ cursor: 'pointer' }}
            >
              <DeleteIcon className="icon" />
              <p>Delete</p>
            </Box>
          </Box>
        </Box>
        <div className={'divider'}></div>
      </Stack>
    </div>
  );
};

export default SellerBlogList;
