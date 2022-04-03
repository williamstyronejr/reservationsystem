exports.uploadFirebaseFile = jest.fn(
  async (file: any, fileName: string, path = '') => ({
    fieldName: file.fieldName,
    name: fileName || file.originalname,
    url: 'test.google.com',
  }),
);

exports.removeFirebaseFile = jest.fn(async (fileName: string) => true);
