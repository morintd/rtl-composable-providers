import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { gql, useLazyQuery, useMutation } from '@apollo/client';

import { decrement, increment, load } from './store/counter.slice';
import { RootState } from './store/store';

export const GET_COUNTER = gql`
  query counter {
    counter
  }
`;

export const SET_COUNTER = gql`
  mutation setCounter($counter: Int) {
    setCounter(counter: $counter)
  }
`;

const Counter = () => {
  const counter = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const [getCount, query] = useLazyQuery(GET_COUNTER);
  const [mutate, mutation] = useMutation(SET_COUNTER, { variables: { counter } });

  useEffect(() => {
    if (query.data) dispatch(load(query.data.counter));
  }, [query.data]);

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <button disabled={mutation.loading} onClick={() => mutate()}>
        save
      </button>
      <button disabled={mutation.loading} onClick={() => getCount()}>
        load
      </button>
    </div>
  );
};

export default Counter;
