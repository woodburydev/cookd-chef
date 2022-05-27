// navigation.d.ts

import {
  HomeNavigationRoutes,
  LoginNavigationRoutes,
  ProfileNavigationRoutes,
} from 'src/navigation/NavigationTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends LoginNavigationRoutes,
        ProfileNavigationRoutes,
        HomeNavigationRoutes {}
  }
}
