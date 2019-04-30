module.exports = {
  name: 'fleet',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/fleet/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
