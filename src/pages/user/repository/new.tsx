import { Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import NewRepositoryFrom from '../../../components/repository/New';

export default function(props: FormComponentProps) {
  return (
    <div>
      <Row>
        <Col md={12} xs={24}>
          <NewRepositoryFrom></NewRepositoryFrom>
        </Col>
      </Row>
    </div>
  );
}
