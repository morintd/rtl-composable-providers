import React from 'react';

import { fireEvent, render, screen, generateStore, waitFor } from '../../tests';
import Counter, { GET_COUNTER, SET_COUNTER } from '../Counter';

describe('Counter', () => {
  it('Should display a default value', () => {
    const store = generateStore({ counter: { value: 5 } });
    render(<Counter />, { providers: { store } });
    expect(screen.queryByText('Counter: 5')).toBeInTheDocument();
  });

  it('Should increment', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('+'));
    expect(screen.queryByText('Counter: 1')).toBeInTheDocument();
  });

  it('Should decrement', () => {
    render(<Counter />);
    fireEvent.click(screen.getByText('-'));
    expect(screen.queryByText('Counter: -1')).toBeInTheDocument();
  });

  it('Should load counter', async () => {
    const query = { request: { query: GET_COUNTER }, result: { data: { counter: 5 } } };
    render(<Counter />, { providers: { graphql: [query] } });

    fireEvent.click(screen.getByText('load'));

    await waitFor(() => {
      expect(screen.queryByText('Counter: 5')).toBeInTheDocument();
    });
  });

  it('Should save counter', async () => {
    const query = {
      request: { query: SET_COUNTER, variables: { counter: 1 } },
      result: jest.fn().mockReturnValue({ data: { setCounter: 1 } }),
    };

    render(<Counter />, { providers: { graphql: [query] } });

    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('save'));

    await waitFor(() => {
      expect(query.result).toHaveBeenCalled();
    });
  });
});
