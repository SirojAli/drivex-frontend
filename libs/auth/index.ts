import decodeJWT from 'jwt-decode';
import { initializeApollo } from '../../apollo/client';
import { userVar } from '../../apollo/store';
import { CustomJwtPayload } from '../types/customJwtPayload';
import { sweetMixinErrorAlert } from '../sweetAlert';
import { LOGIN, SIGN_UP } from '../../apollo/user/mutation';

export function getJwtToken(): any {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken') ?? '';
  }
}

export function setJwtToken(token: string) {
  localStorage.setItem('accessToken', token);
}

export const logIn = async (nick: string, password: string): Promise<void> => {
  try {
    const { jwtToken } = await requestJwtToken({ nick, password });

    if (jwtToken) {
      updateStorage({ jwtToken });
      updateUserInfo(jwtToken);
    }
  } catch (err) {
    console.warn('login error', err);
    logOut();
  }
};

const requestJwtToken = async ({
  nick,
  password,
}: {
  nick: string;
  password: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();

  try {
    const result = await apolloClient.mutate({
      mutation: LOGIN,
      variables: { input: { memberNick: nick, memberPassword: password } },
      fetchPolicy: 'network-only',
    });

    console.log('---------- LOGIN ----------');
    const { accessToken } = result?.data?.login;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log('request token error', err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case 'Definer: Login and Password do not match':
        await sweetMixinErrorAlert('Please check your Password again');
        break;
      case 'Definer: User has been blocked!':
        await sweetMixinErrorAlert('User has been blocked!');
        break;
    }
    throw new Error('token error');
  }
};

export const signUp = async (nick: string, password: string, email: string): Promise<void> => {
  try {
    const { jwtToken } = await requestSignUpJwtToken({ nick, password, email });

    if (jwtToken) {
      updateStorage({ jwtToken });
      updateUserInfo(jwtToken);
    }
  } catch (err) {
    console.warn('login error', err);
    logOut();
  }
};

const requestSignUpJwtToken = async ({
  nick,
  password,
  email,
}: {
  nick: string;
  password: string;
  email: string;
}): Promise<{ jwtToken: string }> => {
  const apolloClient = await initializeApollo();

  try {
    const result = await apolloClient.mutate({
      mutation: SIGN_UP,
      variables: {
        input: { memberNick: nick, memberPassword: password, memberEmail: email },
      },
      fetchPolicy: 'network-only',
    });

    console.log('---------- LOGIN ----------');
    const { accessToken } = result?.data?.signup;

    return { jwtToken: accessToken };
  } catch (err: any) {
    console.log('request token error', err.graphQLErrors);
    switch (err.graphQLErrors[0].message) {
      case 'Definer: Login and Password do not match':
        await sweetMixinErrorAlert('Please check your Password again');
        break;
      case 'Definer: User has been blocked!':
        await sweetMixinErrorAlert('User has been blocked!');
        break;
    }
    throw new Error('token error');
  }
};

export const updateStorage = ({ jwtToken }: { jwtToken: any }) => {
  setJwtToken(jwtToken);
  window.localStorage.setItem('login', Date.now().toString());
};

export const updateUserInfo = (jwtToken: any) => {
  if (!jwtToken) return false;

  const claims = decodeJWT<CustomJwtPayload>(jwtToken);
  userVar({
    _id: claims._id ?? '',
    memberType: claims.memberType ?? '',
    memberStatus: claims.memberStatus ?? '',
    memberAuthType: claims.memberAuthType,
    memberEmail: claims.memberEmail ?? '',
    memberPhone: claims.memberPhone ?? '',
    memberNick: claims.memberNick ?? '',
    memberFullName: claims.memberFullName ?? '',
    memberImage:
      claims.memberImage === null || claims.memberImage === undefined
        ? '/img/profile/defaultUser.png'
        : `${claims.memberImage}`,
    memberAddress: claims.memberAddress ?? '',
    memberDescription: claims.memberDescription ?? '',
    memberCars: claims.memberCars,
    memberRank: claims.memberRank,
    memberArticles: claims.memberArticles,
    memberPoints: claims.memberPoints,
    memberLikes: claims.memberLikes,
    memberViews: claims.memberViews,
    memberWarnings: claims.memberWarnings,
    memberBlocks: claims.memberBlocks,
  });
};

export const logOut = () => {
  deleteStorage();
  deleteUserInfo();
  window.location.reload();
};

const deleteStorage = () => {
  localStorage.removeItem('accessToken');
  window.localStorage.setItem('logout', Date.now().toString());
};

const deleteUserInfo = () => {
  userVar({
    _id: '',
    memberType: '',
    memberStatus: '',
    memberAuthType: '',
    memberEmail: '',
    memberPhone: '',
    memberNick: '',
    memberFullName: '',
    memberImage: '',
    memberAddress: '',
    memberDescription: '',
    memberCars: 0,
    memberRank: 0,
    memberArticles: 0,
    memberPoints: 0,
    memberLikes: 0,
    memberViews: 0,
    memberWarnings: 0,
    memberBlocks: 0,
    brandSlug: '',
  });
};
