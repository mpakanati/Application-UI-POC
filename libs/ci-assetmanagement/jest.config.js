module.exports = {
  name: 'ci-assetmanagement',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ci-assetmanagement',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
