import React from 'react';
import {Row, Col} from 'antd';

import {NewRepositoryFrom} from '../../../components/repository/New';
import i18n from '../../../i18n';
import {getTitle} from '../../../common/document';

export default function (props: React.PropsWithChildren<any>) {
  getTitle(i18n.t('repository.create_repository'));

  return (
    <div>
      <Row>
        <Col md={12} xs={24}>
          <NewRepositoryFrom/>
        </Col>
      </Row>
    </div>
  );
}
