import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, Box, List, ListItem, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Link from 'next/link';
import { Member } from '../../types/member/member';
import { REACT_APP_API_URL } from '../../config';
import { useQuery } from '@apollo/client';
import { GET_MEMBER } from '../../../apollo/user/query';
import { T } from '../../types/common';
import PhoneIcon from '@mui/icons-material/Phone';

interface MemberMenuProps {
  subscribeHandler: any;
  unsubscribeHandler: any;
}

const MemberMenu = (props: MemberMenuProps) => {
  const { subscribeHandler, unsubscribeHandler } = props;
  const device = useDeviceDetect();
  const router = useRouter();

  const category: any = router.query?.category;
  const [member, setMember] = useState<Member | null>(null);
  const { memberId } = router.query;

  /** APOLLO REQUESTS **/
  const { refetch: getMemberRefetch } = useQuery(GET_MEMBER, {
    fetchPolicy: 'network-only',
    variables: { input: memberId },
    skip: !memberId,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => setMember(data?.getMember),
  });

  if (device === 'mobile') {
    return <div>MEMBER MENU MOBILE</div>;
  }

  return (
    <Stack
      width={'100%'}
      padding={'30px 24px'}
      sx={{
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Profile Section */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #eee',
          }}
        >
          <img
            src={
              member?.memberImage
                ? `${REACT_APP_API_URL}/${member?.memberImage}`
                : '/img/profile/defaultUser.svg'
            }
            alt={'member-photo'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>
        <Stack spacing={0.8}>
          <Typography fontWeight="bold" fontSize="1.2rem">
            {member?.memberNick}
          </Typography>
          <Box display="flex" alignItems="center" gap={0.5}>
            <PhoneIcon sx={{ fontSize: 18, color: '#777' }} />
            <Typography fontSize="0.9rem" color="text.secondary">
              {member?.memberPhone}
            </Typography>
          </Box>
          <Typography fontSize="16px" fontWeight="bold" color="red">
            {member?.memberType}
          </Typography>
        </Stack>
      </Stack>

      {/* Follow Button */}
      <Stack mb={3}>
        {member?.meFollowed?.[0]?.myFollowing ? (
          <Button
            variant="contained"
            onClick={() => unsubscribeHandler(member?._id, getMemberRefetch, memberId)}
            sx={{
              background: '#b71c1c',
              color: '#fff',
              textTransform: 'none',
              ':hover': { background: '#b71c1c' },
            }}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => subscribeHandler(member?._id, getMemberRefetch, memberId)}
            sx={{
              background: '#1da1f2',
              color: '#fff',
              textTransform: 'none',
              ':hover': { background: '#0d8ddb' },
            }}
          >
            Follow
          </Button>
        )}
      </Stack>

      {/* Menu Sections */}
      <Stack spacing={3}>
        {/* Details */}
        <Stack>
          <Typography fontWeight="bold" mb={1}>
            Details
          </Typography>
          <List sx={{ padding: 0 }}>
            {[
              { key: 'followers', label: 'Followers', count: member?.memberFollowers },
              { key: 'followings', label: 'Followings', count: member?.memberFollowings },
            ].map(({ key, label, count }) => (
              <ListItem
                key={key}
                sx={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  background: category === key ? '#ff7101' : 'transparent',
                  color: category === key ? '#fff' : '#333',
                  borderRadius: '8px',
                  mb: 0.5,
                  ':hover': { background: category === key ? '#ff7101' : '#f8f8f8' },
                }}
              >
                <Link
                  href={{
                    pathname: '/member',
                    query: { ...router.query, category: key },
                  }}
                  scroll={false}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Typography>{label}</Typography>
                  {/* <Typography>{count}</Typography> */}
                </Link>
              </ListItem>
            ))}
          </List>
        </Stack>

        {/* Community */}
        <Stack>
          <Typography fontWeight="bold" mb={1}>
            Community
          </Typography>
          <List sx={{ padding: 0 }}>
            <ListItem
              sx={{
                padding: '8px 12px',
                cursor: 'pointer',
                background: category === 'articles' ? '#ff7101' : 'transparent',
                color: category === 'articles' ? '#fff' : '#333',
                borderRadius: '8px',
                ':hover': { background: category === 'articles' ? '#ff7101' : '#f8f8f8' },
              }}
            >
              <Link
                href={{
                  pathname: '/member',
                  query: { ...router.query, category: 'articles' },
                }}
                scroll={false}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Typography>Articles</Typography>
                {/* <Typography>{member?.memberArticles}</Typography> */}
              </Link>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MemberMenu;
