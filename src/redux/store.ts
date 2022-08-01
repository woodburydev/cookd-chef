import {
  Action,
  applyMiddleware,
  combineReducers,
  configureStore,
  createAction,
} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {endpoint} from 'src/config/api';
import auth from '@react-native-firebase/auth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: `${endpoint}`}),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUser: builder.query<any, string | void>({
      query: (userId?: string | undefined) =>
        userId ? `/cook/${userId}` : `/cook/${auth()?.currentUser?.uid}`,
      providesTags: ['User'],
    }),
    addUser: builder.mutation<FormData, any>({
      query: (payload: any) => ({
        url: '/cook',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<any, any>({
      query: (payload: any) => ({
        url: '/cook/update',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const menuApi = createApi({
  reducerPath: 'menuApi',
  baseQuery: fetchBaseQuery({baseUrl: `${endpoint}`}),
  tagTypes: ['Menu'],
  endpoints: builder => ({
    getMenusFromUser: builder.query<any, any>({
      query: fbuuid => `/menu/${fbuuid}`,
      providesTags: ['Menu'],
    }),
    getMenuImage: builder.query<any, any>({
      query: uuid => `/menu/image/${uuid}`,
      providesTags: ['Menu'],
    }),
    addMenu: builder.mutation<FormData, any>({
      query: (payload: any) => ({
        url: '/menu',
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }),
      invalidatesTags: ['Menu'],
    }),
    updateMenu: builder.mutation<FormData, any>({
      query: (payload: any) => ({
        url: '/menu',
        method: 'PUT',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }),
      invalidatesTags: ['Menu'],
    }),
  }),
});

export const profilePictureApi = createApi({
  reducerPath: 'profilePictureApi',
  baseQuery: fetchBaseQuery({baseUrl: `${endpoint}`}),
  tagTypes: ['Post'],
  endpoints: builder => ({
    getProfilePicture: builder.query<string, void>({
      query: () => `/cook/profilePicture?user=${auth().currentUser?.uid}`,
      providesTags: ['Post'],
    }),
    addProfilePicture: builder.mutation<FormData, any>({
      query: payload => ({
        url: '/cook/profilePicture',
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data;',
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const updateUserRefetchAction = createAction<boolean>('USER_UPDATE_REFETCH');
export const showToastAction = createAction<{type: string; text1: string; text2: string}>(
  'TOAST_MESSAGE',
);

export const {useGetUserQuery, useUpdateUserMutation, useLazyGetUserQuery, useAddUserMutation} =
  userApi;

export const {useGetProfilePictureQuery, useAddProfilePictureMutation} = profilePictureApi;

export const {
  useAddMenuMutation,
  useGetMenusFromUserQuery,
  useUpdateMenuMutation,
  useGetMenuImageQuery,
} = menuApi;

// const loadingUserReducer = (state = {loadingUser: false}, action: any) => {
//   switch (action.type) {
//     case 'LOADING_USER':
//       return {...state, loadingUser: action.payload};
//     default:
//       return state;
//   }
// };

const initialState = {
  updateUserRefetch: false,
  toastMessage: {
    type: '',
    text1: '',
    text2: '',
  },
};

const mainReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'USER_UPDATE_REFETCH':
      return {...state, updateUserRefetch: action.payload};
    case 'TOAST_MESSAGE':
      return {...state, toastMessage: action.payload};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [profilePictureApi.reducerPath]: profilePictureApi.reducer,
  [menuApi.reducerPath]: menuApi.reducer,
  mainReducer,
  // loadingUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(profilePictureApi.middleware)
      .concat(menuApi.middleware),
});
