export const lockScroll = (): void => {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.touchAction = 'none';
};

export const unlockScroll = (): void => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.touchAction = '';
};
