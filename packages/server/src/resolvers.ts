let savedCounter = 0;

export default {
  Query: {
    counter() {
      return savedCounter;
    },
  },
  Mutation: {
    setCounter(_: any, { counter }: { counter: number }) {
      savedCounter = counter;
      return savedCounter;
    },
  },
};
