// navigation.d.ts

import {
  LoginNavigationRoutes,
  ProfileRouteNames,
} from 'src/navigation/NavigationTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends LoginNavigationRoutes,
        ProfileRouteNames,
        HomeRouteNames {}
  }
}
