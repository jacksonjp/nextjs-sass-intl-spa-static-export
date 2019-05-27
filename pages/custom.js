// @flow

import React from 'react';
import { withRouter } from 'next/router';

const Page = props => {
  const { router } = props;
  const { query } = router;
  const { search } = query;
  return <div>{search}</div>;
};

export default withRouter(Page);
