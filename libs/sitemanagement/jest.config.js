module.exports = {
  name: 'sitemanagement',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/sitemanagement',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
