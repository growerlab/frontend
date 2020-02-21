import { FormComponentProps } from 'antd/lib/form';
import RepositoryList from '../../../components/repository/List';

export default function(props: FormComponentProps) {
  const { form } = props;
  return (
    <div>
      <RepositoryList ownerPath="moli"></RepositoryList>
    </div>
  );
}
