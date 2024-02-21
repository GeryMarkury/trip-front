import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrips = createAsyncThunk("trips/fetchAll", async (_, thunkAPI) => {
	try {
		const response = await axios.get("/trips");
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});

export const addTrip = createAsyncThunk("trips/addTrip", async (trip, thunkAPI) => {
	try {
		const response = await axios.post("/trips", trip);
		return response.data;
	} catch (e) {
		return thunkAPI.rejectWithValue(e.message);
	}
});
