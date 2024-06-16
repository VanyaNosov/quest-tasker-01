import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { serverUrl } from '../../helpers/constants'
import { FileType, FolderType, Notice, SearchedItems, TaskType } from '../../../types'

const baseUrl = `${serverUrl}/api/`

export const getItems = createApi({
    reducerPath: 'getItems',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getUserNotices: builder.query<Notice[], string>({
            query: (userId) => ({
                url: `notices/?userId=${userId}`,
            }),
        }),
        getUserFiles: builder.query<FileType[], string>({
            query: (userId) => ({
                url: `files/?userId=${userId}`,
            }),
        }),
        getUserFolders: builder.query<FolderType[], string>({
            query: (userId) => ({
                url: `folders/?userId=${userId}`,
            }),
        }),
        getUserFolder: builder.query<FolderType, { userId: string, folderId: string }>({
            query: ({ userId, folderId }) => ({
                url: `folders/${folderId}?userId=${userId}`,
            }),
        }),
        getFavouriteFolders: builder.query<FolderType[], string>({
            query: (userId) => ({
                url: `folders/favourites?userId=${userId}`,
            }),
        }),
        getUserTasks: builder.query<TaskType[], string>({
            query: (userId) => ({
                url: `tasks?userId=${userId}`,
            }),
        }),
        getSearchedItems: builder.query<SearchedItems, { userId: string, searchTerm: string }>({
            query: ({ userId, searchTerm }) => ({
                url: `search?searchTerm=${searchTerm}&userId=${userId}`,
            }),
        }),
    }),
})


export const { useGetUserNoticesQuery, useGetUserFoldersQuery,
    useGetUserFolderQuery, useGetFavouriteFoldersQuery, useGetUserTasksQuery,
    useGetSearchedItemsQuery, useGetUserFilesQuery
} = getItems