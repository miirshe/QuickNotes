import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { userSlices } from './slices/UserSlices';
import { noteSlices } from './slices/NoteSlices';
export const store = configureStore({
    reducer : {
        [userSlices.reducerPath] : userSlices.reducer,
        [noteSlices.reducerPath] : noteSlices.reducer,
    },

    middleware : (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userSlices.middleware).concat(noteSlices.middleware)
})
setupListeners(store.dispatch);