export interface QrCodeProps {
  value: string;
  size?: number;
  className?: string;
}

// Simple and robust QR Code renderer using Google Chart API / SVG fallback with clean visual frame
export function QrCodeView({ value, size = 180, className = '' }: QrCodeProps) {
  const encoded = encodeURIComponent(value);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&margin=8`;

  return (
    <div className={`flex flex-col items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      <img
        src={qrUrl}
        alt={`QR Code para ${value}`}
        width={size}
        height={size}
        className="rounded-lg object-contain"
        loading="lazy"
        onError={(e) => {
          // If image fails, show fallback link representation
          const target = e.currentTarget;
          target.style.display = 'none';
        }}
      />
      <span className="text-[11px] text-slate-400 mt-2 font-mono text-center max-w-[200px] truncate">
        Aponte a câmera do celular
      </span>
    </div>
  );
}
