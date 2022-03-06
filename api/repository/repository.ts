import { RepositoryArgs, TypeRepositories, TypeRepository } from "./types";
// import { SessionService } from "../../services/auth/session";

export class Repository {
  repo: RepositoryArgs;

  constructor(args: RepositoryArgs) {
    this.repo = args;
    if (this.repo.ownerPath === undefined) {
      // const current = getUserInfo();
      // if (current !== null) {
      //   this.repo.ownerPath = current.namespacePath;
      // }
    }
  }

  get(repoPath: string): TypeRepository | null {
    return null;
  }

  list(): TypeRepositories | null {
    return null;
  }
}
