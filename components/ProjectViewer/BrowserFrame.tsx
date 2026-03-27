import React from 'react';

interface Props {
  url: string;
}

export default function BrowserFrame({ url }: Props) {
  return (
    <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* top bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#f2f2f2]">
        <span className="w-3 h-3 bg-red-400 rounded-full" />
        <span className="w-3 h-3 bg-yellow-400 rounded-full" />
        <span className="w-3 h-3 bg-green-400 rounded-full" />
        <span className="ml-2 text-[10px] text-[#555] truncate">{url}</span>
      </div>
      <iframe src={url} className="w-full h-[calc(100%-32px)]" />
    </div>
  );
}
