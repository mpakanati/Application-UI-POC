module.exports = {
  name: 'google-place-suggestion',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/google-place-suggestion',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
