import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Store } from '@reduxjs/toolkit';
import { MockedResponse } from '@apollo/client/testing';

import { withRedux } from './mocks';
import { withApollo } from './mocks/apollo.mock';

export type ProvidersRenderOptions = {
  store?: Store;
  graphql?: MockedResponse[];
};

export type CustomRenderOptions = {
  providers?: ProvidersRenderOptions;
};

type ComposableProvider = (children: ReactElement, options: ProvidersRenderOptions) => ReactElement;

const providers: ComposableProvider[] = [withRedux, withApollo];

const composeProviders = (children: ReactElement, options: ProvidersRenderOptions) => {
  return providers.reduce((component, provider) => {
    return provider(component, options);
  }, children);
};

const AllTheProviders = (options: ProvidersRenderOptions = {}) => {
  return ({ children }: { children: ReactElement }) => {
    return composeProviders(children, options);
  };
};

const customRender = (ui: ReactElement, options: CustomRenderOptions & Omit<RenderOptions, 'wrapper'> = {}) => {
  const { providers, ...others } = options;
  render(ui, { wrapper: AllTheProviders(providers), ...others });
};

export { generateStore } from './mocks';
export * from '@testing-library/react';
export { customRender as render };
