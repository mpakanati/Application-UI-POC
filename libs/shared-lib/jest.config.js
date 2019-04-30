module.exports = {
  name: 'shared-lib',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/shared-lib',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
