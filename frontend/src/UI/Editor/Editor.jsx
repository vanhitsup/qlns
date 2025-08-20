import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import "./editor.css";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import MyOnChangePlugin from "@/UI/Editor/plugins/OnChangePlugin";
import toast from "react-hot-toast";
import { cn } from "@/utils/functions";
import UpdateContentPlugin from "@/UI/Editor/plugins/UpdateContentPlugin";

function Placeholder({ isEdit }) {
  if (!isEdit) return null;
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

export default function Editor({ onChange, isEdit, defaultContent, content }) {
  const editorConfig = {
    theme: ExampleTheme,
    onError(error) {
      toast.error(error.message);
    },
    editable: isEdit || false,
    editorState: defaultContent || null,
    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };
  if (onChange && typeof onChange !== "function") {
    onChange(defaultContent);
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className={cn("editor-container")}>
        {isEdit && <ToolbarPlugin />}
        <div
          className={cn("editor-inner", {
            "bg-transparent": !isEdit,
          })}
        >
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder isEdit={isEdit} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MyOnChangePlugin onChange={onChange} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <UpdateContentPlugin content={content} />
        </div>
      </div>
    </LexicalComposer>
  );
}
