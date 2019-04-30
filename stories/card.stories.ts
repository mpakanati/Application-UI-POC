import { storiesOf } from '@storybook/angular';
import { withKnobs, text } from '@storybook/addon-knobs/angular';

import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { UiCoreModule } from '@cc/ui-core';
import {CardComponent} from '../libs/ui-core/src/lib/card/card.component';
import { CardHeader,Tile,Style} from '@cc/ui-core';


storiesOf('Card Component', module)
  .addDecorator(
    moduleMetadata({
      declarations: [CardComponent]
    })
  )
  .add('Base Component', () => ({
    template: `
      <cc-card
        [badge]="badge"
        [cardHeader]= cardHeader
        [cardBodyStyle] = cardBodyStyle
       >
      </cc-card>
    `,
    props: {
      badge: text('badge', '8'),
      cardHeader: {value:"Ticket",style:{}},
      cardBodyStyle:{'background-color': 'aqua','height': '200px'},
      onAction: action('Action happened')
    }
  }))
  .add('With Expand Icon', () => ({
    template: `
      <cc-card
        [badge]="badge"
        [cardHeader]= cardHeader
        [expandIcon] = expandIcon
        [cardBodyStyle] = cardBodyStyle
       >
      </cc-card>
    `,
    props: {
      badge: text('badge', '8'),
      cardHeader: {value:"Ticket",style:{}},
      cardBodyStyle:{'height': '200px'},
      expandIcon:true,
      onAction: action('Action happened')
    }
  }));
 