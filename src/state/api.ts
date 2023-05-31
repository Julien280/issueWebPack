import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {GetActivityResponse} from "./types";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl:"/alinkedin/",credentials: "include"}),
  reducerPath: "main",
  tagTypes: ["activity","test"],
  endpoints: (build) => ({
    //Array<GetActivityResponse>
    getActivity: build.query<any, void>({
      query: () => "/activity",
      providesTags: ["activity"],
    }),
  }),
});

export const { useGetActivityQuery  } = api;

//# sourceMappingURL=api.js.map