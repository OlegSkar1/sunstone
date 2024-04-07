import React, { FC } from 'react';

interface IMaterialInfoProps {
  section_slug: string;
  materials_id: string;
  material: Omit<MaterialModel, 'text'>[] | undefined;
}

export const MaterialInfo: FC<IMaterialInfoProps> = ({
  section_slug,
  materials_id,
  material,
}) => {
  return <div>MaterialInfo</div>;
};
