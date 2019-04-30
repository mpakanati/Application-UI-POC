import { storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs/angular';

import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { UiCoreModule } from '@cc/ui-core';
import {CardComponent} from '../libs/ui-core/src/lib/card/card.component';
import {TileComponent} from '../libs/ui-core/src/lib/tile/tile.component';
import { CardHeader,Tile,Style} from '@cc/ui-core';


storiesOf('Tile Component', module)
  .addDecorator(
    moduleMetadata({
      declarations: [TileComponent]
    })
  )
  .add('Tile Component', () => ({
    template: `
      <cc-tile
        [tile]="tile"
        [tileBodyStyle] ="tileBodyStyle"
       >
      </cc-tile>
    `,
    props: {
        tile :[{
            'class': 'icon-Completed iconStyle',
          }, {
      
            'class': 'tile-header',
            value: '40'
          }, {
            'class': 'tile-footer',
            'value': 'Completed'
          }],
         
      onAction: action('Action happened')
    }
  }));

 