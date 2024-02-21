import { createSlice } from "@reduxjs/toolkit";
import { logOut } from "../redux/auth/operations";
import { fetchTrips, addTrip } from "./operations";

const handlePending = state => {
	state.isLoading = true;
	state.error = null;
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
	extraReducers: builder => {
		builder
			.addCase(fetchTrips.pending, handlePending)
			.addCase(fetchTrips.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.items = payload;
			})
			.addCase(fetchTrips.rejected, handleRejected)
			.addCase(addTrip.pending, handlePending)
			.addCase(addTrip.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.items.push(payload);
			})
			.addCase(addTrip.rejected, handleRejected)
			.addCase(logOut.fulfilled, state => {
				state.items = [];
				state.isLoading = false;
			});
	},
});

export const tripsReducer = tripsSlice.reducer;
