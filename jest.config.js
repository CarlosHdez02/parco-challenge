module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>/src/tests'],
    testTimeout: 15000,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    }
};