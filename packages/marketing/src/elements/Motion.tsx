import React from 'react';
import { motion } from 'framer-motion';

/** ******************************************************************************
 *  Error Pop
 ****************************************************************************** */

type ErrorPopProps = {
  duration?: number,
};

export const ErrorPop: React.FC<ErrorPopProps> = ({
  duration = 0.2,
  children,
  ...props
}) => (
  <motion.div
    {...props}
    initial={{ right: -100 }}
    animate={{ right: 15 }}
    transition={{
      duration,
      // type: "spring",
      stiffness: 400,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

/** ******************************************************************************
 *  Pop
 ****************************************************************************** */

type PopProps = {
  duration?: number,
};

export const Pop: React.FC<PopProps> = ({
  children,
  ...props
}) => (
  <motion.div
    {...props}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{
      // duration,
      type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

/** ******************************************************************************
 *  Card Pop
 ****************************************************************************** */

export const CardPop: React.FC<ErrorPopProps> = ({
  duration = 0.1,
  children,
  ...props
}) => (
  <motion.div
    {...props}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      duration,
      // type: 'spring',
      stiffness: 260,
      damping: 20,
    }}
  >
    {children}
  </motion.div>
);

/** ******************************************************************************
 *  Fade In
 ****************************************************************************** */

type FadeInProps = {
  duration?: number,
};

export const FadeIn: React.FC<FadeInProps> = ({
  duration = 0.2,
  children,
  ...props
}) => (
  <motion.div
    {...props}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration,
    }}
  >
    {children}
  </motion.div>
);

/** ******************************************************************************
 *  SlideIn
 ****************************************************************************** */

type SlideInProps = {
  duration?: number,
  isOpen: boolean,
  shouldAnimate: boolean,
};

const slideInVariants = {
  open: { x: 0 },
  closed: { x: '-100%' },
};

export const SlideIn: React.FC<SlideInProps> = ({
  duration = 0.6,
  isOpen,
  shouldAnimate,
  children,
  ...props
}) => {
  if (shouldAnimate) {
    return (
      <motion.div
        {...props}
        animate={isOpen ? 'open' : 'closed'}
        variants={slideInVariants}
        transition={{
          duration,
          type: 'spring',
          bounce: 0,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return <>{children}</>;
};
