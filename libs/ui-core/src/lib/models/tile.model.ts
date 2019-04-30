import {Style} from './common.model';


  export interface Divider {
    value?: string;
    class?: string;
    style?: Style
  }

  export interface Dividers {
    start?: Divider;
    end?: Divider;
  }

  export interface Tile {
    icon?: string;
    class?: string;
    style?: Style;
    dividers?: Dividers;
    value?: string;
  }
