module.exports = {
    proxy: {
        port: 8444,
        url: 'https://www.google.com.ua',
        test: 'https://localhost:8443/js/google.test.js',
        view: 'inject-script',
        cssPlace: '#footc'
    }
}