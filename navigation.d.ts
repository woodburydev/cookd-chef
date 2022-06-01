// navigation.d.ts

import {
  HomeNavigationRoutes,
  LoginNavigationRoutes,
  MessageNavigationRoutes,
  ProfileNavigationRoutes,
} from 'src/navigation/NavigationTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends LoginNavigationRoutes,
        ProfileNavigationRoutes,
        MessageNavigationRoutes,
        HomeNavigationRoutes {}
  }
}
