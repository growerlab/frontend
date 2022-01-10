import {
  GQL_QUERY_REPOSITORIES,
  GQL_QUERY_REPOSITORY,
  RepositoryArgs,
  TypeRepositories,
  TypeRepository,
} from './types';
import { getUserInfo } from '../auth/session';
import { useQuery } from '@apollo/react-hooks';

export class Repository {
  repo: RepositoryArgs;

  constructor(args: RepositoryArgs) {
    this.repo = args;
    if (this.repo.ownerPath === undefined) {
      const current = getUserInfo();
      if (current !== null) {
        this.repo.ownerPath = current.namespacePath;
      }
    }
  }

  get(): TypeRepository | null {
    if (this.repo.repoPath === undefined) {
      return null;
    }

    const { data, loading } = useQuery<TypeRepository, RepositoryArgs>(GQL_QUERY_REPOSITORY, {
      variables: this.repo,
    });

    if (loading) {
      return null;
    }
    return data as TypeRepository;
  }

  list(): TypeRepositories | null {
    const { data, loading } = useQuery<TypeRepositories, {}>(GQL_QUERY_REPOSITORIES, {
      variables: { ownerPath: this.repo.ownerPath },
    });

    if (loading) {
      return null;
    }
    return data as TypeRepositories;
  }
}
