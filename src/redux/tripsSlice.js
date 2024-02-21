import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../redux/auth/operations";
import { fetchTrips, addTrip } from "./operations";

const handlePending = state => {
	state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
	state.isLoading = false;
	state.error = payload;
};

const tripsSlice = createSlice({
	name: "trips",
	initialState: {
		items: [],
		isLoading: false,
		error: null,
	},
	extraReducers: {
		[fetchTrips.pending]: handlePending,
		[fetchTrips.fulfilled](state, { payload }) {
			state.isLoading = false;
			state.error = null;
			state.items = payload;
		},
		[fetchTrips.rejected]: handleRejected,
		[addTrip.pending]: handlePending,
		[addTrip.fulfilled](state, action) {
			state.isLoading = false;
			state.error = null;
			state.items.push(action.payload);
		},
		[addTrip.rejected]: handleRejected,
		[logOut.fulfilled](state) {
			state.items = [];
			state.error = null;
			state.isLoading = false;
		},
	},
});

export const tripsReducer = tripsSlice.reducer;
