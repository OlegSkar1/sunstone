'use client';
import { Card, CardBody } from '@nextui-org/react';
import { Reorder, useMotionValue } from 'framer-motion';
import React, { FC, useState } from 'react';
import { IValue } from './DragAndDropList';
import clsx from 'clsx';

export const styles = {
  item: 'mobile:p-[6px_14px] p-[6px]  cursor-grab transition-colors',
  item_active:
    'cursor-grabbing bg-secondary text-white mobile:p-[6px_14px] p-[6px]  transition-colors',
};

interface IItemProps {
  value: IValue;
}

export const Item: FC<IItemProps> = ({ value }) => {
  const [togglePointer, setTogglePointer] = useState(false);
  const pointerToggleHandler = () => {
    setTogglePointer(!togglePointer);
  };
  return (
    <Reorder.Item
      value={value}
      key={value.id}
      onDragEnd={pointerToggleHandler}
      onDragStart={pointerToggleHandler}
      drag="y"
      as="div"
    >
      <Card
        className={clsx({
          [styles.item_active]: togglePointer,
          [styles.item]: !togglePointer,
        })}
      >
        <CardBody>{value.text}</CardBody>
      </Card>
    </Reorder.Item>
  );
};
