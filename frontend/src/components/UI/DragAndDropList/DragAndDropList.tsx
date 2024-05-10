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
  disabled: boolean;
}

export const DragAndDropList: FC<DragAndDropListProps> = ({
  values,
  onChange,
  disabled,
}) => {
  return (
    <Reorder.Group
      values={values}
      onReorder={onChange}
      className="flex flex-col gap-4"
      drag={false}
    >
      {values.map((value) => (
        <Item disabled={disabled} value={value} key={value.id} />
      ))}
    </Reorder.Group>
  );
};
