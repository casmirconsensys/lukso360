module.exports.onCronjob = async ({ request }) => {
    switch (request.method) {
      case 'exampleMethodOne':
        return snap.request({
          method: 'snap_notify',
          params: {
            type: 'inApp',
            message: `Hello, world!`,
          },
        });
  
      default:
        throw new Error('Method not found.');
    }
  };