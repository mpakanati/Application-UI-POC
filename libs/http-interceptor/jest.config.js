module.exports = {
  name: 'http-interceptor',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/http-interceptor',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
