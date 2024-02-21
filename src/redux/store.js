import {
	configureStore,
	createSerializableStateInvariantMiddleware,
	// Tuple,
} from "@reduxjs/toolkit";
import { tripsReducer } from "./tripsSlice.js";
import { filterReducer } from "./filterSlice";
import { authReducer } from "./auth/slice.js";
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
	key: "auth",
	storage,
	whitelist: ["token"],
};

const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const serializableMiddleware = createSerializableStateInvariantMiddleware({
	ignoredActions,
});

export const store = configureStore({
	reducer: {
		auth: persistReducer(authPersistConfig, authReducer),
		trips: tripsReducer,
		filter: filterReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(serializableMiddleware),
	devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
