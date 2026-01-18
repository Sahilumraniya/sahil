
"use client";

import { useRef } from 'react';
import { Image as ImageIcon, UploadCloud, X, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    previewUrl?: string;
    onFileSelect: (file: File) => void;
    onRemove: () => void;
    label?: string;
}

export default function ImageUpload({ previewUrl, onFileSelect, onRemove, label = "Upload Image" }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelect(file);
        }
        // Reset input so same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="space-y-4 w-full">
            {previewUrl ? (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 group">
                    <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onRemove();
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        title="Remove Image"
                    >
                        <X size={16} />
                    </button>
                    {/* Optional: Indicator that it's a local file vs uploaded URL could go here */}
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all border-slate-300 dark:border-white/20 hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-white/5"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />

                    <div className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 group-hover:text-violet-500 transition-colors">
                        <div className="p-3 bg-slate-100 dark:bg-white/10 rounded-full group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors">
                            <UploadCloud size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                Click to upload {label}
                            </p>
                            <p className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
