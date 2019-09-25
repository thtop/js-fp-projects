import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';

import { addMsg, subtractMsg } from './Update';

const { div, button } = hh(h);

function view(dispatch, model) {
  return div([
    div(
      {
        className: 'f2 b mb3'
      },
      `Count: ${model}`
    ),
    button(
      {
        className: 'pv1 ph3 mr2 bg-blue white bn',
        onclick: () => dispatch(addMsg)
      },
      '+'
    ),
    button(
      {
        className: 'pv1 ph3 bg-orange white bn',
        onclick: () => dispatch(subtractMsg)
      },
      '-'
    )
  ]);
}

export default view;
