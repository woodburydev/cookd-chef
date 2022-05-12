import FavoriteCuisines from 'src/screens/Profile/Bio';
import Feedback from '@screens/Profile/Feedback';
import PaymentMethods from 'src/screens/Profile/ContactInfo';
import PrivacyPolicy from '@screens/Profile/PrivacyPolicy';
import Rewards from '@screens/Profile/Rewards';
import TOS from 'src/screens/Profile/TOS';
import Reviews from 'src/screens/Profile/Reviews';
import Menus from 'src/screens/Profile/Menus';
import Bio from 'src/screens/Profile/Bio';
import BankingInfo from 'src/screens/Profile/BankingInfo';
import InviteChef from 'src/screens/Profile/InviteChef';
import ContactInfo from 'src/screens/Profile/ContactInfo';

export const ProfileRoutes = {
  REWARDS: {
    name: 'REWARDS',
    displayName: 'Rewards',
    component: Rewards,
    iconType: 'material-community',
    iconName: 'gift-outline',
  },
  REVIEWS: {
    name: 'REVIEWS',
    displayName: 'Reviews',
    component: Reviews,
    iconType: 'material-community',
    iconName: 'chef-hat',
  },
  MENUS: {
    name: 'MENUS',
    displayName: 'Menus',
    component: Menus,
    iconType: 'material-community',
    iconName: 'cancel',
  },
  BIO: {
    name: 'BIO',
    displayName: 'Bio',
    component: Bio,
    iconType: 'material-community',
    iconName: 'food-drumstick',
  },
  FAVORITE_CUISINES: {
    name: 'FAVORITE_CUISINES',
    displayName: 'Favorite Cuisines',
    component: FavoriteCuisines,
    iconType: 'material-community',
    iconName: 'phone',
  },
  CONTACT_INFO: {
    name: 'CONTACT_INFO',
    displayName: 'Contact Info',
    component: ContactInfo,
    iconType: 'material-community',
    iconName: 'wallet-outline',
  },
  BANKING_INFO: {
    name: 'BANKING_INFO',
    displayName: 'Banking Info',
    component: BankingInfo,
    iconType: 'material-community',
    iconName: 'wallet-outline',
  },
  INVITE_CHEF: {
    name: 'INVITE_CHEF',
    displayName: 'Invite A Chef',
    component: InviteChef,
    iconType: 'font-awesome',
    iconName: 'smile-o',
  },
  PRIVACY_POLICY: {
    name: 'PRIVACY_POLICY',
    displayName: 'Privacy Policy',
    component: PrivacyPolicy,
    iconType: 'ionicon',
    iconName: 'lock-closed-outline',
  },

  TERMS_OF_SERVICE: {
    name: 'TERMS_OF_SERVICE',
    displayName: 'Terms Of Service',
    component: TOS,
    iconType: 'ionicon',
    iconName: 'ios-information-circle-outline',
  },
  FEEDBACK: {
    name: 'FEEDBACK',
    displayName: 'Leave Feedback',
    component: Feedback,
    iconType: 'material',
    iconName: 'feedback',
  },
};
