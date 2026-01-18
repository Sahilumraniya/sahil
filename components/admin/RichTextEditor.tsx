"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import BubbleMenuExtension from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import YouTube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { Markdown } from 'tiptap-markdown';
import {
    Bold, Italic, Strikethrough, Underline as UnderlineIcon, Code,
    Heading1, Heading2, Heading3,
    List, ListOrdered, ListTodo, Quote,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Link as LinkIcon, Image as ImageIcon, Youtube, Table as TableIcon,
    Undo, Redo, FileCode, Minus
} from 'lucide-react';
import { useCallback } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-violet-500 hover:text-violet-700 underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl shadow-lg border border-slate-200 dark:border-white/10',
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: 'Write something amazing...',
            }),
            TaskList.configure({
                HTMLAttributes: {
                    class: 'not-prose pl-2',
                },
            }),
            TaskItem.configure({
                nested: true,
            }),
            YouTube.configure({
                controls: false,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Markdown,
            BubbleMenuExtension,
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[300px] px-8 py-6',
            },
        },
        onUpdate: ({ editor }) => {
            const markdown = (editor.storage as any).markdown.getMarkdown();
            onChange(markdown);
        },
    });

    const setLink = useCallback(() => {
        if (!editor) return;
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addYouTube = useCallback(() => {
        const url = prompt('YouTube URL');
        if (url && editor) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    }, [editor]);

    const uploadImage = useCallback(async (file: File) => {
        if (!editor || !file) return;
        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filename: file.name, filetype: file.type }),
            });

            if (!res.ok) throw new Error('Failed to get upload URL');
            const { signedUrl, fileUrl } = await res.json();

            const uploadRes = await fetch(signedUrl, {
                method: 'PUT',
                body: file,
                headers: { 'Content-Type': file.type },
            });

            if (!uploadRes.ok) throw new Error('Upload to S3 failed');

            editor.chain().focus().setImage({ src: fileUrl }).run();
        } catch (error) {
            console.error("Editor Upload Error:", error);
            alert("Failed to upload image.");
        }
    }, [editor]);

    const addImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) await uploadImage(file);
        };
        input.click();
    }, [uploadImage]);

    if (!editor) return null;

    const ToolbarButton = ({ onClick, isActive, icon: Icon, title }: any) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={`p-1.5 rounded-md transition-all ${isActive
                ? 'text-violet-600 bg-violet-100 dark:bg-violet-500/20 dark:text-violet-300'
                : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5'
                }`}
        >
            <Icon size={18} />
        </button>
    );

    const SectionDivider = () => <div className="w-px h-5 bg-slate-200 dark:bg-white/10 mx-1 self-center" />;

    return (
        <div className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-[#111] focus-within:ring-2 focus-within:ring-violet-500 transition-all shadow-sm flex flex-col h-full">

            {/* Bubble Menu */}
            {editor && (
                <BubbleMenu editor={editor}>
                    <div className="flex gap-1 p-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-xl">
                        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={Strikethrough} />
                        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} icon={LinkIcon} />
                        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} icon={Code} />
                    </div>
                </BubbleMenu>
            )}

            {/* Main Toolbar */}
            <div className="sticky top-0 z-50 flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#161616] backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                {/* History */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().undo().run()} isActive={false} icon={Undo} title="Undo" />
                    <ToolbarButton onClick={() => editor.chain().focus().redo().run()} isActive={false} icon={Redo} title="Redo" />
                </div>

                <SectionDivider />

                {/* Typography */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} icon={Heading1} title="H1" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} icon={Heading2} title="H2" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} icon={Heading3} title="H3" />
                </div>

                <SectionDivider />

                {/* Basic Format */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} icon={Bold} title="Bold" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} icon={Italic} title="Italic" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} icon={UnderlineIcon} title="Underline" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} icon={Strikethrough} title="Strike" />
                </div>

                <SectionDivider />

                {/* Alignment */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} icon={AlignLeft} title="Left" />
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} icon={AlignCenter} title="Center" />
                    <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} icon={AlignRight} title="Right" />
                </div>

                <SectionDivider />

                {/* Lists */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} icon={List} title="Bullet List" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} icon={ListOrdered} title="Ordered List" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} icon={ListTodo} title="Task List" />
                </div>

                <SectionDivider />

                {/* Inserts */}
                <div className="flex gap-0.5">
                    <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} icon={LinkIcon} title="Link" />
                    <ToolbarButton onClick={addImage} isActive={editor.isActive('image')} icon={ImageIcon} title="Image" />
                    <ToolbarButton onClick={addYouTube} isActive={editor.isActive('youtube')} icon={Youtube} title="YouTube" />
                    <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} isActive={false} icon={TableIcon} title="Table" />
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} icon={FileCode} title="Code Block" />
                    <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} isActive={false} icon={Minus} title="Divider" />
                </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto max-h-[600px]">
                <EditorContent editor={editor} className="min-h-[500px]" />
            </div>
        </div>
    );
}
