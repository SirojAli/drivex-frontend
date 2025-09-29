import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import withSellerLayout from '../../libs/components/layout/LayoutSeller';

const SellerHome: NextPage = (props: any) => {
  const router = useRouter();

  /** LIFECYCLES **/
  useEffect(() => {
    console.log('Router object:', router);
    router.push('/_seller/dashboard');
  }, []);
  return <></>;
};

export default withSellerLayout(SellerHome);
