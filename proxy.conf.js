const PROXY_CONFIG = [
    {
        context: [
            "/api",
            "/resources"
        ],
        "changeOrigin": true,
        target: "http://localhost:9981",
        secure: false
    }
];

module.exports = PROXY_CONFIG;
