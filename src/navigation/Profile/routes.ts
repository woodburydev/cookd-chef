import ContactInfo from '@screens/Profile/ContactInfo';
import FavoriteChefs from '@screens/Profile/FavoriteChefs';
import FavoriteCuisines from '@screens/Profile/FavoriteCuisines';
import Feedback from '@screens/Profile/Feedback';
import InviteFriend from '@screens/Profile/InviteFriend';
import PaymentMethods from '@screens/Profile/PaymentMethods';
import PrivacyPolicy from '@screens/Profile/PrivacyPolicy';
import Rewards from '@screens/Profile/Rewards';
import Allergies from 'src/screens/Profile/Allergies';
import TOS from 'src/screens/Profile/TOS';

export const ProfileRoutes = {
  REWARDS: {
    name: 'REWARDS',
    displayName: 'Rewards',
    component: Rewards,
    iconType: 'material-community',
    iconName: 'gift-outline',
  },
  FAVORITE_CHEFS: {
    name: 'FAVORITE_CHEFS',
    displayName: 'Favorite Chefs',
    component: FavoriteChefs,
    iconType: 'material-community',
    iconName: 'chef-hat',
  },
  ALLERGIES: {
    name: 'ALLERGIES',
    displayName: 'Allergies',
    component: Allergies,
    iconType: 'material-community',
    iconName: 'cancel',
  },
  FAVORITE_CUISINES: {
    name: 'FAVORITE_CUISINES',
    displayName: 'Favorite Cuisines',
    component: FavoriteCuisines,
    iconType: 'material-community',
    iconName: 'food-drumstick',
  },
  CONTACT_INFO: {
    name: 'CONTACT_INFO',
    displayName: 'Contact Info',
    component: ContactInfo,
    iconType: 'material-community',
    iconName: 'phone',
  },
  PAYMENT_METHODS: {
    name: 'PAYMENT_METHODS',
    displayName: 'Payment Methods',
    component: PaymentMethods,
    iconType: 'material-community',
    iconName: 'wallet-outline',
  },
  INVITE_FRIEND: {
    name: 'INVITE_FRIEND',
    displayName: 'Invite A Friend',
    component: InviteFriend,
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
