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
      New: '/user/repositories/new',
      List: '/user/repositories',
    },
  },
  Namespace: {
    Repository: '/:namespacePath/:repoPath',
  },
};

module.exports = Router;
