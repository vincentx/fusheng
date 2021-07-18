module.exports = {
  testEnvironment: "jsdom",
  roots: ["src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: [
    "./setupTests.ts",
    "@testing-library/jest-dom/extend-expect",
  ],
  moduleNameMapper: {
    "^.+\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["^.+\\.(css|sass|scss)$"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
