import React from 'react';

interface Props {
  text: string;
}

export default function ProjectDescription({ text }: Props) {
  return (
    <p className="mt-6 text-center text-sm text-[#44403c] max-w-xl">
      {text}
    </p>
  );
}
