import React from 'react';

interface Props {
  text: string;
}

export default function ProjectDescription({ text }: Props) {
  return (
    <p className="mt-6 text-center text-sm text-[#8a8784] max-w-xl">
      {text}
    </p>
  );
}
