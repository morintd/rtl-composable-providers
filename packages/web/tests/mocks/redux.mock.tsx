/* eslint-disable import/prefer-default-export */
import { PreloadedState, configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { rootReducer } from '../../src/store/store';

import { ProvidersRenderOptions } from '../testing';

export const withRedux = (children: ReactElement, options: ProvidersRenderOptions) => {
  return <Provider store={options.store ?? generateStore()}>{children}</Provider>;
};

export const generateStore = (preloadedState?: PreloadedState<typeof rootReducer>) => {
  return configureStore({
    preloadedState,
    reducer: rootReducer,
  });
};
