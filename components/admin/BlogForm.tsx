"use client";

import { useState, useEffect } from 'react';
import { Save, Eye, Edit2, CheckCircle, AlertCircle, X, Search, ChevronDown, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import Image from 'next/image';

interface BlogFormProps {
    initialData?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function BlogForm({ initialData, onSuccess, onCancel }: BlogFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(initialData?.content || '');

    // const [tags, setTags] = useState(initialData?.tags?.join(', ') || ''); // Removed legacy text input state
    const [image, setImage] = useState(initialData?.image || '');
    const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');
    const [status, setStatus] = useState(initialData?.status || 'Published');
    const [availableTags, setAvailableTags] = useState<{ _id: string, name: string }[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
    const [tagSearch, setTagSearch] = useState('');
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [isPreview, setIsPreview] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Auto-generate slug from title only if creating new and slug is empty
    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await fetch('/api/tags');
                if (res.ok) {
                    const data = await res.json();
                    setAvailableTags(data);
                }
            } catch (error) {
                console.error("Failed to fetch tags");
            }
        };
        fetchTags();
    }, []);

    const addTag = (tagName: string) => {
        if (!selectedTags.includes(tagName)) {
            setSelectedTags([...selectedTags, tagName]);
            setTagSearch('');
            setIsTagDropdownOpen(false);
        }
    };

    const removeTag = (tagName: string) => {
        setSelectedTags(selectedTags.filter(t => t !== tagName));
    };

    const filteredTags = availableTags.filter(tag =>
        tag.name.toLowerCase().includes(tagSearch.toLowerCase()) &&
        !selectedTags.includes(tag.name)
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (!initialData && !slug) {
            setSlug(generateSlug(e.target.value));
        }
    };

    const handleImageSelect = (file: File) => {
        setImageFile(file);
        setImage(URL.createObjectURL(file)); // Local preview
    };

    const uploadImageToS3 = async (file: File) => {
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
        return fileUrl;
    };

    const handleSubmit = async () => {
        if (!title || !slug) {
            setFeedback({ type: 'error', message: 'Title and Slug are required' });
            return;
        }

        setIsSubmitting(true);
        setFeedback(null);
        try {
            let finalImageUrl = image;

            if (imageFile) {
                finalImageUrl = await uploadImageToS3(imageFile);
            }

            const payload = {
                title,
                slug,
                excerpt,
                content,
                tags: selectedTags,
                image: finalImageUrl,
                seoDescription,
                status
            };

            const url = initialData ? `/api/blogs/${initialData._id}` : '/api/blogs';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setFeedback({ type: 'success', message: initialData ? 'Updated successfully!' : 'Published successfully!' });
                setTimeout(() => {
                    onSuccess();
                }, 1000);
            } else {
                const data = await res.json();
                setFeedback({ type: 'error', message: data.error || 'Failed to save' });
            }
        } catch (error) {
            setFeedback({ type: 'error', message: 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-[#0a0a0a]">
            {/* Toolbar */}
            <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-[#111] border-b border-slate-200 dark:border-white/10 shrink-0">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {initialData ? 'Edit Post' : 'New Post'}
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
                        title={isPreview ? "Edit" : "Preview"}
                    >
                        {isPreview ? <Edit2 size={20} /> : <Eye size={20} />}
                    </button>
                    <button
                        onClick={onCancel}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400"
                        title="Close"
                    >
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
                {feedback && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${feedback.type === 'success' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'}`}>
                        {feedback.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span className="font-bold">{feedback.message}</span>
                    </div>
                )}

                {isPreview ? (
                    <div className="max-w-4xl mx-auto bg-white dark:bg-[#111] p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
                        {image && (
                            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                                <Image src={image} alt={title} fill className="object-cover" />
                            </div>
                        )}
                        <article className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-a:text-violet-600 dark:prose-a:text-violet-400">
                            <h1>{title}</h1>
                            {excerpt && <p className="lead text-xl text-slate-500 dark:text-slate-400 font-medium italic border-l-4 border-violet-500 pl-4">{excerpt}</p>}
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </article>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {/* Main Editor */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        className="w-full px-4 py-3 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400 font-bold text-lg"
                                        placeholder="Enter post title..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Content</label>
                                    <RichTextEditor content={content} onChange={setContent} />
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Settings */}
                        <div className="space-y-6">
                            <div className="bg-white dark:bg-[#111] border border-slate-200 dark:border-white/10 rounded-2xl p-6 space-y-4">
                                <h3 className="font-bold text-slate-900 dark:text-white">Settings</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                                    >
                                        <option>Published</option>
                                        <option>Draft</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Slug</label>
                                    <input
                                        type="text"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 font-mono"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Cover Image</label>
                                    <ImageUpload
                                        previewUrl={image}
                                        onFileSelect={handleImageSelect}
                                        onRemove={() => { setImage(''); setImageFile(null); }}
                                        label="Upload"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Excerpt</label>
                                    <textarea
                                        value={excerpt}
                                        onChange={(e) => setExcerpt(e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-900 dark:text-white min-h-[80px] resize-none"
                                        placeholder="Brief summary..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Tags</label>

                                    {/* Selected Tags Chips */}
                                    {selectedTags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedTags.map(tag => (
                                                <span key={tag} className="px-2 py-1 bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300 rounded-lg text-xs font-bold flex items-center gap-1 border border-violet-200 dark:border-violet-500/30">
                                                    {tag}
                                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Search Input */}
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            type="text"
                                            value={tagSearch}
                                            onChange={(e) => {
                                                setTagSearch(e.target.value);
                                                setIsTagDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsTagDropdownOpen(true)}
                                            onBlur={() => setTimeout(() => setIsTagDropdownOpen(false), 200)} // Delay to allow click
                                            placeholder="Search tags..."
                                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white placeholder:text-slate-400"
                                        />

                                        {/* Dropdown */}
                                        {isTagDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto bg-white dark:bg-[#111] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-10">
                                                {filteredTags.length > 0 ? (
                                                    filteredTags.map(tag => (
                                                        <button
                                                            key={tag._id}
                                                            onClick={() => addTag(tag.name)}
                                                            className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors flex items-center justify-between"
                                                        >
                                                            {tag.name}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="px-4 py-3 text-xs text-slate-400 text-center">
                                                        No matching tags found.
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">
                                        Search and select from master tags. Manage tags in <a href="/admin/tags" className="text-violet-500 hover:underline">Tags</a> page.
                                    </p>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                                >
                                    <Save size={18} />
                                    {isSubmitting ? 'Saving...' : 'Save Post'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
