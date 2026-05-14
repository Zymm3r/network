import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface QuickCopyButtonProps {
  text: string;
  label?: string;
  variant?: 'default' | 'ghost' | 'outline';
}

export function QuickCopyButton({ text, label = 'Copy Reply', variant = 'default' }: QuickCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Reply copied to clipboard!', {
        description: 'Paste into your chat or email.',
        duration: 2000,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Could not copy text.');
    }
  };

  const baseClasses = 'inline-flex items-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer';
  const variantClasses = {
    default: 'px-3 py-1.5 bg-[#1E5FA8] text-white hover:bg-[#174d8a] active:scale-95',
    ghost: 'px-2 py-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100',
    outline: 'px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300',
  };

  return (
    <button onClick={handleCopy} className={`${baseClasses} ${variantClasses[variant]}`}>
      {copied ? (
        <>
          <Check size={12} />
          Copied!
        </>
      ) : (
        <>
          <Copy size={12} />
          {label}
        </>
      )}
    </button>
  );
}
