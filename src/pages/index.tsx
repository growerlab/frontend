import React from 'react';
import { withTranslation } from 'react-i18next';

const index = function(props: any) {
  const { t } = props;
  const titleStyle = {
    fontSize: '24vm',
    textAlign: 'center',
  };

  document.title = t('website.title');

  return (
    <div>
      <h2 style={titleStyle}>Rethinking Git</h2>
    </div>
  );
};

export default withTranslation()(index);
