module.exports = {
    preset: "ts-jest",
    testMatch: ["<rootDir>/tests/*.test.ts"],
    testEnvironment: "node",
    moduleNameMapper: {
        "^@youtube-video-core(.*)$": "<rootDir>/src/youtube-video-core/src$1"
    }
};