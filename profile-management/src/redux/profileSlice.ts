import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  name: string;
  email: string;
  age?: string;
}

interface ProfileState {
  data: Profile | null;
}

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    saveProfile: (state, action: PayloadAction<Profile>) => {
      state.data = action.payload;
    },
    clearProfile: (state) => {
      state.data = null;
    },
  },
});

export const { saveProfile, clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
