import React, { FC } from 'react';

interface IMaterialInfoProps {
  section_slug: string;
  materials_id: string;
  material: MaterialModel | undefined;
}

export const MaterialInfo: FC<IMaterialInfoProps> = ({
  section_slug,
  materials_id,
  material,
}) => {
  return (
    <div className="p-10 flex flex-col gap-10">
      <h1
        dangerouslySetInnerHTML={{ __html: material?.title ?? '' }}
        className="text-3xl font-bold text-center"
      />
      <div
        dangerouslySetInnerHTML={{ __html: material?.text ?? '' }}
        className="!text-base  [&_span]:!text-black"
      />
    </div>
  );
};
