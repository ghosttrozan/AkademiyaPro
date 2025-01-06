// src/features/school/schoolSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  _id: '',
  name: 'Reliable Public School',
  address: 'near hp gas agency, kota road, suket, rajasthan',
  contactNumber: '01234568789',
  establishedYear: 2005,
  schoolType: '',
  principal: '',
  classes: [],
  teachers: [],
  students: [],
  academicYears: [],
  tagLine: 'AcademyPro - Best School Management Software',
  schoolEmail: 'example@gmail.com',
  schoolWebsite: 'www.example.com',
  logo: '',
  createdAt: null, // Set to null as it's a date/time field
};

const schoolSlice = createSlice({
  name: 'school',
  initialState,
  reducers: {
    setSchool: (state, action) => {
      // Update the state with fields from the payload
      const {
        _id,
        name,
        address,
        contactNumber,
        establishedYear,
        schoolType,
        principal,
        tagLine,
        schoolEmail,
        schoolWebsite,
        logo,
      } = action.payload;

      // Assign payload values to the state
      state._id = _id ?? state._id;
      state.name = name ?? state.name;
      state.address = address ?? state.address;
      state.contactNumber = contactNumber ?? state.contactNumber;
      state.establishedYear = establishedYear ?? state.establishedYear;
      state.schoolType = schoolType ?? state.schoolType;
      state.principal = principal ?? state.principal;
      state.tagLine = tagLine ?? state.tagLine;
      state.schoolEmail = schoolEmail ?? state.schoolEmail;
      state.schoolWebsite = schoolWebsite ?? state.schoolWebsite;
      state.logo = logo ?? state.logo;
    },
    // Add more actions as needed
  },
});

export const { setSchool } = schoolSlice.actions;

export default schoolSlice.reducer;
