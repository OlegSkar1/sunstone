'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';
import clsx from 'clsx';
import { animateFormError } from '@/utils/consts/animations.const';

interface IValidationError {
  error?: string;
  className?: string;
}

export const ValidationError: FC<IValidationError> = ({ error, className }) => {
  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          variants={animateFormError}
          initial="hide"
          animate="show"
          exit="hide"
          transition={{ duration: 0.15 }}
        >
          <div
            className={clsx('text-danger text-small font-medium', className)}
          >
            {error}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
