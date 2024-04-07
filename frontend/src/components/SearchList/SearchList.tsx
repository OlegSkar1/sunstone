'use client';
import { LessonCard } from '@/pagesComponents/LessonsPage/LessonCard/LessonCard';
import { MaterialCard } from '@/pagesComponents/MaterialPage/MaterialCard/MaterialCard';
import { SectionCard } from '@/pagesComponents/SectionsPage/SectionCard/SectionCard';
import { searchStore } from '@/store/searchStore';
import { variantsWithHeight } from '@/utils/consts/animations.const';
import { useSearchQuery } from '@/utils/hooks/tanstack/useSearch';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export const SearchList = () => {
  const query = searchStore((state) => state.search);
  const { data } = useSearchQuery({ search: query }, { enabled: !!query });
  return (
    <div className="flex flex-col gap-20">
      <AnimatePresence mode="wait">
        <motion.div
          variants={variantsWithHeight}
          initial="hide"
          animate="show"
          exit="hide"
          className=" pt-10"
        >
          {data && data.data.sections.length > 0 && (
            <>
              <h2 className="text-3xl font-bold mb-8">Найденные разделы</h2>
              <div className="">
                {data?.data.sections.map((section) => (
                  <SectionCard key={section.slug} card={section} />
                ))}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {data && data.data.materials.length > 0 && (
          <motion.div
            variants={variantsWithHeight}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <motion.h2
              variants={variantsWithHeight}
              initial="hide"
              animate="show"
              exit="hide"
              className="text-3xl font-bold mb-8 pt-10"
            >
              Найденные материалы
            </motion.h2>
            <div className="">
              {data?.data.materials.map((material) => (
                <MaterialCard key={material.id} card={material} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {data && data.data.lessons.length > 0 && (
          <motion.div
            variants={variantsWithHeight}
            initial="hide"
            animate="show"
            exit="hide"
          >
            <motion.h2
              variants={variantsWithHeight}
              initial="hide"
              animate="show"
              exit="hide"
              className="text-3xl font-bold mb-8 pt-10"
            >
              Найденные лекции
            </motion.h2>
            <div className="">
              {data?.data.lessons.map((lesson) => (
                <LessonCard key={lesson.id} card={lesson} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
