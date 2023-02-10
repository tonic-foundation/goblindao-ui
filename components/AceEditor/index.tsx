import React from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import { useTheme } from 'next-themes';

const AceEditorArea: React.FC<IAceEditorProps> = ({
  mode = 'json',
  theme = 'github',
  showGutter = false,
  height = '70px',
  ...props
}) => {
  const { theme: nextTheme } = useTheme();

  return (
    <AceEditor
      {...props}
      fontSize={14}
      cursorStart={10}
      style={{
        background: 'transparent',
        color: nextTheme === 'dark' ? 'white' : 'black',
      }}
      showGutter={showGutter}
      height={height}
      mode={mode}
      theme={theme}
      showPrintMargin={false}
      width="100%"
      editorProps={{ $blockScrolling: false }}
    />
  );
};

export default AceEditorArea;
