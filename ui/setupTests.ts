import "@testing-library/jest-dom";

export const MOCK_ENV = {
  SERVER_HOST: "https://mock.server.host",
};

beforeAll(() => {
  process.env = MOCK_ENV;
});
