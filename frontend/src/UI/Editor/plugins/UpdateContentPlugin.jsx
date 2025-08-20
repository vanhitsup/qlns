import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

function UpdateContentPlugin({ content }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (content) {
      editor.update(() => {
        const newEditorState = editor.parseEditorState(content);
        editor.setEditorState(newEditorState);
      });
    }
  }, [content, editor]);
  return null;
}

export default UpdateContentPlugin;
