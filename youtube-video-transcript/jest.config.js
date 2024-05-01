module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@youtube-video-core(.*)$": "<rootDir>/../youtube-video-core/src$1"
    }
};