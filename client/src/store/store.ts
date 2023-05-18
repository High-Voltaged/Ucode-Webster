import { configureStore, combineReducers } from '@reduxjs/toolkit';
import frameReducer from './slices/frame-slice';
import fontListReducer from './slices/font-list-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import stageObjectReducer from './slices/stage-object-slice';
import selectedObjectReducer from './slices/selected-objects-slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['selected', 'fontList'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    frame: frameReducer,
    stage: stageObjectReducer,
    selected: selectedObjectReducer,
    fontList: fontListReducer,
  }),
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      // immutableCheck: { warnAfter: 128 },
      immutableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
