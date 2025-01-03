// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom", // Para testar componentes React
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest", // Transpilar JSX/TSX
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock para estilos
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
}
