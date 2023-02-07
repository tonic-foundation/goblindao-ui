import React from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

const AceEditorArea: React.FC<IAceEditorProps> = ({
  mode = 'json',
  theme = 'github',
  showGutter = false,
  height = '70px',
  ...props
}) => {
  return (
    <AceEditor
      {...props}
      fontSize={14}
      cursorStart={10}
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
