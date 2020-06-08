import { gql } from 'apollo-boost';

export interface Repository {
  uuid: string;
  name: string;
  path: string;
  description: string;
  createdAt: number;
  Public: boolean;
  // StartCount: number;
  // ForkCount: number;
  // LastUpdatedAt: number;
  pathGroup: string;
  gitHttpURL: string;
  gitSshURL: string;
}

export interface TypeRepositories {
  repositories: Repository[];
}

export interface TypeRepository {
  repository: Repository;
}

export interface TypeRepositoriesArgs {
  ownerPath: string;
}

export interface TypeRepositoryArgs {
  ownerPath: string;
  path: string;
}

export const GQL_QUERY_REPOSITORIES = gql`
  query repositories($ownerPath: String!) {
    repositories(ownerPath: $ownerPath) {
      uuid
      path
      name
      description
      createdAt
      owner {
        name
        username
      }
      pathGroup
      gitHttpURL
      gitSshURL
    }
  }
`;

export const GQL_QUERY_REPOSITORY = gql`
  query repository($ownerPath: String!, $path: String!) {
    repository(ownerPath: $ownerPath, path: $path) {
      uuid
      path
      name
      description
      createdAt
      owner {
        name
        username
      }
      pathGroup
      gitHttpURL
      gitSshURL
    }
  }
`;
