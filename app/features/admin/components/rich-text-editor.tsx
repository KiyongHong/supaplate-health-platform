import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Image as ImageIcon,
} from "lucide-react";

import { cn } from "~/core/lib/utils";

interface RichTextEditorProps {
  content: string | object | null;
  onChange: (html: string, json: object) => void;
  className?: string;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  className,
  placeholder = "Write something amazing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty before:content-[attr(data-placeholder)] before:text-stone-400 before:float-left before:h-0 before:pointer-events-none",
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline hover:text-blue-800",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-4",
        },
      }),
    ],
    content: content || "",
    editorProps: {
      attributes: {
        class: "prose prose-stone max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className={cn("overflow-hidden rounded-md border border-stone-200 bg-white", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-stone-200 bg-stone-50 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          icon={Strikethrough}
          title="Strikethrough"
        />
        <div className="mx-1 h-6 w-px bg-stone-300" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          icon={Heading1}
          title="H1"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          icon={Heading2}
          title="H2"
        />
        <div className="mx-1 h-6 w-px bg-stone-300" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          icon={List}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          icon={ListOrdered}
          title="Ordered List"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          icon={Quote}
          title="Blockquote"
        />
        <div className="mx-1 h-6 w-px bg-stone-300" />
        <ToolbarButton
          onClick={setLink}
          isActive={editor.isActive("link")}
          icon={LinkIcon}
          title="Link"
        />
        <ToolbarButton
          onClick={addImage}
          isActive={false}
          icon={ImageIcon}
          title="Image"
        />
        <div className="mx-1 h-6 w-px bg-stone-300" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          icon={Undo}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          icon={Redo}
          title="Redo"
        />
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  icon: React.ElementType;
  title: string;
}

function ToolbarButton({ onClick, isActive, disabled, icon: Icon, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded p-1.5 transition-colors hover:bg-stone-200 disabled:opacity-50",
        isActive ? "bg-stone-200 text-stone-900" : "text-stone-600",
      )}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
