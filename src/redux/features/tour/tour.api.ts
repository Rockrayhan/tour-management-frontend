import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),

    getTourType: builder.query({
      query: () => ({
        url: "tour/tour-types",
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: ["TOUR"],
    }),

    updateTourType: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/tour/tour-types/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["TOUR"],
    }),


    deleteTourType: builder.mutation({
      query: ({ id }) => ({
        url: `/tour/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),



  }),
});

export const { useGetTourTypeQuery,
   useAddTourTypeMutation,
  useUpdateTourTypeMutation,
  useDeleteTourTypeMutation,
  } = tourApi;
