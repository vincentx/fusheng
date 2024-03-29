import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { REPORTS_RESOURCE_PATH } from "./src/utils/constant";

export const mockServer = setupServer(
  rest.get(REPORTS_RESOURCE_PATH, (req, res, ctx) =>
    res(
      ctx.json({
        reports: [
          { name: "spec1", url: "url1" },
          { name: "spec2", url: "url2" },
        ],
      }),
    ),
  ),

  rest.get(`${REPORTS_RESOURCE_PATH}/spec1`, (req, res, ctx) =>
    res(ctx.body("<html><body>Hello world!</body></html>")),
  ),
);

beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());
