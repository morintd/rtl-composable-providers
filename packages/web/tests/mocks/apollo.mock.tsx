import React, { ReactElement } from 'react';
import { MockedProvider as MockedProviderBroken } from '@apollo/client/testing';
import { MockedProviderProps, MockedProviderState } from '@apollo/client/testing/react/MockedProvider';

import { ProvidersRenderOptions } from '../testing';

const MockedProvider = MockedProviderBroken as React.ComponentClass<MockedProviderProps, MockedProviderState>;

export function withApollo(children: ReactElement, options: ProvidersRenderOptions) {
  return (
    <MockedProvider mocks={options.graphql ?? []} addTypename={false}>
      {children}
    </MockedProvider>
  );
}
