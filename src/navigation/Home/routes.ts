import Home from 'src/screens/Home/Home';
import Message from 'src/screens/Home/Message';
import Order from 'src/screens/Home/Order';
import Profile from 'src/screens/Home/Profile';
import Search from 'src/screens/Home/Search';
import Verification from 'src/screens/Profile/Verification';

export const HomeRoutes = {
  HOME: {
    displayName: 'Home',
    name: 'HOME',
    component: Home,
  },
  MESSAGE: {
    displayName: 'Message',
    name: 'MESSAGE',
    component: Message,
  },
  SEARCH: {
    displayName: 'Search',
    name: 'SEARCH',
    component: Search,
  },
  ORDER: {
    displayName: 'Order',
    name: 'ORDER',
    component: Order,
  },
  PROFILE: {
    displayName: 'Profile',
    name: 'PROFILE',
    component: Profile,
  },
  VERIFICATION: {
    displayName: 'Verification', // this isnt displayed in the bottom row, its an extra screen we can navigate to
    name: 'VERIFICATION',
    component: Verification,
  },
};
