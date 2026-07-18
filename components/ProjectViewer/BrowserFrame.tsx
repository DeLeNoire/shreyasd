import React from 'react';

interface Props {
  url: string;
}

export default function BrowserFrame({ url }: Props) {
  return (
    <div className="relative w-full h-full bg-[#111111] border border-[#2a2a2a] rounded-lg shadow-lg overflow-hidden">
      {/* top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#161616] border-b border-[#2a2a2a]">
        <span className="w-3 h-3 bg-[#ff3b3b] rounded-full" />
        <span className="w-3 h-3 bg-[#f5c542] rounded-full" />
        <span className="w-3 h-3 bg-[#4ade80] rounded-full" />
        <span className="ml-2 text-[10px] text-[#8a8784] truncate">{url}</span>
      </div>
      <iframe src={url} className="w-full h-[calc(100%-32px)] bg-[#111111]" />
    </div>
  );
}
