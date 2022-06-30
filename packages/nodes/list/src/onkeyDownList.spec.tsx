/** @jsx jsx */

import { getPlugin, HotkeyPlugin, Hotkeys } from '@udecode/plate-core';
import { createListPlugin } from '@udecode/plate-list';
import { jsx } from '@udecode/plate-test-utils';
import { createPlateUIEditor } from '@udecode/plate-ui/src/utils/createPlateUIEditor';
import * as isHotkey from 'is-hotkey';
import { onKeyDownList } from './onKeyDownList';

jsx;
/*
input:
1. E1
2. |E2

output:
1. E1
  1. |E2
*/
it('should indent single list item (start of item)', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
        </hli>
        <hli>
          <hlic>
            <cursor />
            E2
          </hlic>
        </hli>
      </hul>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
          <hul>
            <hli>
              <hlic>
                <cursor />
                E2
              </hlic>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any;
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  onKeyDownList(editor, getPlugin<HotkeyPlugin>(editor, 'ul'))(event as any);
  expect(editor.children).toEqual(output.children);
});

/*
input:
1. E1
2. E2|

output:
1. E1
  1. E2|
*/
it('should indent single list item (end of item)', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
        </hli>
        <hli>
          <hlic>
            E2
            <cursor />
          </hlic>
        </hli>
      </hul>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
          <hul>
            <hli>
              <hlic>
                E2
                <cursor />
              </hlic>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any;
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  onKeyDownList(editor, getPlugin<HotkeyPlugin>(editor, 'ul'))(event as any);
  expect(editor.children).toEqual(output.children);
});

/*
input:
1. E1
2. |E2
3. E3|

output:
1. E1
  1. |E2
  2. E3|
*/
it('should indent multiple list items (start/end)', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
        </hli>
        <hli>
          <hlic>
            <focus />
            E2
          </hlic>
        </hli>
        <hli>
          <hlic>
            E3
            <anchor />
          </hlic>
        </hli>
      </hul>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
          <hul>
            <hli>
              <hlic>
                <focus />
                E2
              </hlic>
            </hli>
            <hli>
              <hlic>
                E3<anchor />
              </hlic>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  const event = new KeyboardEvent('keydown', { key: 'Tab' }) as any;
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  onKeyDownList(editor, getPlugin<HotkeyPlugin>(editor, 'ul'))(event as any);
  expect(editor.children).toEqual(output.children);
});

/*
input:
1. E1
  1. |E2
  2. E3|

output:
1. E1
2. |E2
3. E3|
*/
it('should un-indent multiple list items (start/end)', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
          <hul>
            <hli>
              <hlic>
                <focus />
                E2
              </hlic>
            </hli>
            <hli>
              <hlic>
                E3
                <anchor />
              </hlic>
            </hli>
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
        </hli>
        <hli>
          <hlic>
            <focus />
            E2
          </hlic>
        </hli>
        <hli>
          <hlic>
            E3
            <anchor />
          </hlic>
        </hli>
      </hul>
    </editor>
  ) as any;

  const event = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'Tab',
  }) as any;
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  onKeyDownList(editor, getPlugin<HotkeyPlugin>(editor, 'list'))(event as any);
  expect(editor.children).toEqual(output.children);
});

/*
input:
1. E1
  1. |E2
  2. E3
|

output:
1. E1
2. |E2
3. E3
|
*/
it('should un-indent multiple list items (start/out)', () => {
  const input = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
          <hul>
            <hli>
              <hlic>
                <focus />
                E2
              </hlic>
            </hli>
            <hli>
              <hlic>E3</hlic>
            </hli>
            <anchor />
          </hul>
        </hli>
      </hul>
    </editor>
  ) as any;

  const output = (
    <editor>
      <hul>
        <hli>
          <hlic>E1</hlic>
        </hli>
        <hli>
          <hlic>
            <focus />
            E2
          </hlic>
        </hli>
        <hli>
          <hlic>
            E3
            <anchor />
          </hlic>
        </hli>
      </hul>
    </editor>
  ) as any;

  const event = new KeyboardEvent('keydown', {
    shiftKey: true,
    key: 'Tab',
  }) as any;
  const editor = createPlateUIEditor({
    editor: input,
    plugins: [createListPlugin()],
  });

  onKeyDownList(editor, getPlugin<HotkeyPlugin>(editor, 'list'))(event as any);
  expect(editor.children).toEqual(output.children);
});