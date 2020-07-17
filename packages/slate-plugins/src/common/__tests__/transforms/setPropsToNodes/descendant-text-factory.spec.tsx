/** @jsx jsx */

import { jsx } from '../../../../__test-utils__/jsx';
import { isDescendant } from '../../../queries/index';
import { setPropsToNodes } from '../../../transforms/index';

const node = (<htext>test</htext>) as any;

const props = { a: 1 };

const output = (<htext a={1}>test</htext>) as any;

it('should set props to the text node using a factory', () => {
  setPropsToNodes(node, () => props, { filter: ([n]) => isDescendant(n) });
  expect(node).toEqual(output);
});