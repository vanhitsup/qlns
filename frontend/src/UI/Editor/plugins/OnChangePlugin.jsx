import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export default function MyOnChangePlugin({ onChange }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      const editorStateJSON = editorState.toJSON();
      if (onChange && typeof onChange === "function") {
        onChange(editorStateJSON);
      }
    });
  }, [editor, onChange]);
  return null;
}
