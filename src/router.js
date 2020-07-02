const Router = {
  Home: {
    Index: '/',
    Register: '/register',
    Login: '/login',
    ActivateUser: '/activate_user/:code',
  },
  User: {
    Index: '/user/',
    Repository: {
      New: '/user/repos/new',
      List: '/user/repos',
      Show: '/user/repos/:repoPath',
    },
  },
  Namespace: {
    Repository: '/:namespacePath/:repoPath',
  },
};

module.exports = Router;
