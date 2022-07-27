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
  endpoints: (builder) => ({
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
  }),
});

export const profilePictureApi = createApi({
  reducerPath: 'profilePictureApi',
  baseQuery: fetchBaseQuery({baseUrl: `${endpoint}`}),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getProfilePicture: builder.query<string, void>({
      query: () => `/cook/profilePicture?user=${auth().currentUser?.email}`,
      providesTags: ['Post'],
    }),
    addProfilePicture: builder.mutation<FormData, any>({
      query: (payload) => ({
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

export const {useGetUserQuery, useLazyGetUserQuery, useAddUserMutation} = userApi;

export const {useGetProfilePictureQuery, useAddProfilePictureMutation} = profilePictureApi;

// const loadingUserReducer = (state = {loadingUser: false}, action: any) => {
//   switch (action.type) {
//     case 'LOADING_USER':
//       return {...state, loadingUser: action.payload};
//     default:
//       return state;
//   }
// };

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [profilePictureApi.reducerPath]: profilePictureApi.reducer,
  // loadingUserReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(profilePictureApi.middleware),
});
