module.exports = {
    async redirects() {
      return [
        {
          source: '/frame',
          destination: '/',
          permanent: true,
        },
      ]
    },
  }