import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Shipment {
  id: number;
  [key: string]: any;
}

interface ShipmentState {
  shipments: Shipment[];
  isLoading: boolean;
  error: string | null;
}

interface FetchShipmentsParams {
  id?: string;
}

const initialState: ShipmentState = {
  shipments: [],
  isLoading: false,
  error: null,
};

export const fetchShipments = createAsyncThunk(
  'shipment/fetchShipments',
  async (params: FetchShipmentsParams = {}, { rejectWithValue, getState }) => {
    try {
      // @ts-ignore
      const token = getState().auth.token;
      
      if (!token) {
        return rejectWithValue('Token bulunamadı. Lütfen tekrar giriş yapın.');
      }

      const response = await axios.get('https://api.dev.kamion.co/api/admin/shipment', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          'filter[id]': params.id
        }
      });
      
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Yük listesi getirilemedi');
    }
  }
);

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    clearShipmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action: PayloadAction<Shipment[]>) => {
        state.isLoading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearShipmentError } = shipmentSlice.actions;
export default shipmentSlice.reducer; 