export const linkAppCode = `import React from 'react';
import { Link } from '@styled-icons/material/Link';
import { createLinkPlugin, LinkToolbarButton, Plate } from '@udecode/plate';
import { basicNodesPlugins } from './basic-nodes/basicNodesPlugins';
import { editableProps } from './common/editableProps';
import { plateUI } from './common/plateUI';
import { linkValue } from './link/linkValue';
import { Toolbar } from './toolbar/Toolbar';
import { createMyPlugins, MyValue } from './typescript/plateTypes';

const plugins = createMyPlugins([...basicNodesPlugins, createLinkPlugin()], {
  components: plateUI,
});

export default () => (
  <>
    <Toolbar>
      <LinkToolbarButton icon={<Link />} />
    </Toolbar>

    <Plate<MyValue>
      editableProps={editableProps}
      plugins={plugins}
      initialValue={linkValue}
    />
  </>
);
`;

export const linkAppFile = {
  '/LinkApp.tsx': linkAppCode,
};
