'use client';
import { Card, CardBody } from '@nextui-org/react';
import { Reorder } from 'framer-motion';
import React, { FC, useRef, useState } from 'react';
import { IValue } from './DragAndDropList';
import clsx from 'clsx';
import Image from 'next/image';

export const styles = {
  item: 'mobile:p-[6px_14px] p-[6px]  cursor-grab transition-colors',
  item_active:
    'cursor-grabbing bg-secondary text-white mobile:p-[6px_14px] p-[6px]  transition-colors',
};

interface IItemProps {
  value: IValue;
  disabled: boolean;
}

export const Item: FC<IItemProps> = ({ value, disabled }) => {
  const imageRef = useRef<HTMLImageElement>(null);
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
      drag={disabled ? false : 'y'}
      as="div"
    >
      <Card
        className={clsx({
          [styles.item_active]: togglePointer,
          [styles.item]: !togglePointer,
          'cursor-default': disabled,
        })}
      >
        <CardBody>
          {
            <p draggable={false} className="pb-5">
              {value.text}
            </p>
          }
          {value.image_display && (
            <Image
              ref={imageRef}
              src={value.image_display}
              alt="Answer Image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-cover rounded-md"
              draggable={false}
            />
          )}
        </CardBody>
      </Card>
    </Reorder.Item>
  );
};
