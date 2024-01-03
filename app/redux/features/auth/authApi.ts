import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLoggedIn, userLoggedOut } from "./authSlice";

type RegisterResponse = {
    message: string;
    activationToken: string;
};

type RegisterData = {};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegisterResponse, RegisterData>({
            query: (data) => ({
                url: 'user/register',
                method: 'POST',
                body: data,
                credentials: 'include' as const,
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userRegistration({
                        token: result.data.activationToken,
                    }));
                } catch (err) {
                    console.error(err);
                }
            },
        }),

        activation: builder.mutation({
            query: ({ activation_token, activation_code }) => ({
                url: 'user/active-user',
                method: 'POST',
                body: {
                    activation_token,
                    activation_code,
                },
            }),
        }),
        login: builder.mutation({
            query: ({ email, password }) => ({
                url: 'user/login',
                method: 'POST',
                body: {
                    email,
                    password,
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({
                        accessToken: result.data.activationToken,
                        user: result.data.user,
                    }))
                }
                catch (error) {
                    console.error(error);
                }
            }
        }),
        socialAuth: builder.mutation({
            query: ({ email, password, avatar }) => ({
                url: 'user/social-auth',
                method: 'POST',
                body: {
                    email,
                    password,
                    avatar
                },
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedIn({
                        accessToken: result.data.activationToken,
                        user: result.data.user,
                    }))
                }
                catch (error) {
                    console.error(error);
                }
            }
        }),
        logout: builder.query({
            query: () => ({
                url: 'user/logout',
                method: 'GET',
                credentials: "include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled
                    dispatch(userLoggedOut())
                }
                catch (error) {
                    console.error(error);
                }
            }
        })
    }),
});

// Extracting hooks
export const {
    useRegisterMutation,
    useActivationMutation,
    useLoginMutation,
    useSocialAuthMutation,
    useLogoutQuery,
} = authApi;

