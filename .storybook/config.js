import { configure } from '@storybook/angular';
import { setOptions } from '@storybook/addon-options';


// https://github.com/storybooks/storybook/tree/master/addons/options#getting-started
setOptions({
  name: 'Terra Stories',
  url: '#',
  hierarchyRootSeparator: /\|/,
});

function loadStories() {
  // load all from  /src/stories/*.stories.ts files
  const req = require.context('../stories', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
 // require('../stories/index.js');
}

configure(loadStories, module);