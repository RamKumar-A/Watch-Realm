export const parentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3, // Delay before child animations start
      staggerChildren: 0.2, // Stagger between children
    },
  },
};

export const childVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2, // Delay before nested child animations start
      staggerChildren: 0.1,
    },
  },
};

export const grandchildVariants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const containerHeadingVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      // delayChildren: 0.3,
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

export const childHeadingVariants = {
  hidden: {
    y: -20,
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const filterChildVariants = {
  initial: { scale: 0 },
  animate: (i) => ({
    scale: 1,
    transition: {
      delay: i * 0.05,
    },
  }),
};
