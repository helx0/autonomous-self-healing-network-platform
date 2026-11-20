import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, subtitle, children, className = '' }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            )}
            {subtitle && <p className="mx-auto mt-4 max-w-3xl text-slate-400">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
