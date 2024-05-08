import { Reorder } from 'framer-motion';
import React, { FC } from 'react';
import { Item } from './Item';

export interface IValue {
  id: number;
  text: string;
  image_preview: string | null;
  image_display: string | null;
}

interface DragAndDropListProps {
  values: IValue[];
  onChange: (values: IValue[]) => void;
}

export const DragAndDropList: FC<DragAndDropListProps> = ({
  values,
  onChange,
}) => {
  return (
    <Reorder.Group
      values={values}
      onReorder={onChange}
      className="flex flex-col gap-4"
    >
      {values.map((value) => (
        <Item value={value} key={value.id} />
      ))}
    </Reorder.Group>
  );
};
