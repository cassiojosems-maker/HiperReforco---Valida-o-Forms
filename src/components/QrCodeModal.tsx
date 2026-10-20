import { useState } from 'react';
import { X, Copy, Check, ExternalLink, Share2, Smartphone } from 'lucide-react';
import { ValidationForm } from '../utils/formMatcher';
import { QrCodeView } from './QrCodeView';

interface QrCodeModalProps {
  form: ValidationForm | null;
  onClose: () => void;
}

export function QrCodeModal({ form, onClose }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false);

  if (!form) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(form.sendUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareWhatsApp = () => {
    const text = `Formulário da Pesquisa HiperReforço: ${form.title}\nPreencha em ~${form.estimatedMinutes} min pelo link: ${form.sendUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-slate-200 p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 leading-tight">
                Responder pelo Smartphone
              </h3>
              <p className="text-xs text-slate-500">QR Code e Link de Acesso Rápido</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Form Info */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            {form.badge}
          </span>
          <p className="font-bold text-sm text-slate-900 mt-1">
            {form.title}
          </p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center justify-center">
          <QrCodeView value={form.sendUrl} size={190} />
          <p className="text-xs text-slate-500 text-center mt-3 max-w-xs">
            Abra a câmera ou o leitor de QR Code do celular para abrir o formulário instantaneamente.
          </p>
        </div>

        {/* Copy Link Input Bar */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700 block">
            Link direto para envio:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={form.sendUrl}
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-slate-600 select-all focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex gap-2">
          <button
            onClick={handleShareWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar no WhatsApp</span>
          </button>
          <a
            href={form.sendUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center justify-center"
            title="Abrir no navegador"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}
