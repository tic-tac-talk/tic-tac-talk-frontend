import { CHAT_CONSTANTS } from '@/constants';
import type { Message } from '@/types/Chat';
import { formatDate } from '@/utils/formatters';

type BubblePosition = 'single' | 'first' | 'middle' | 'last';

export const groupMessagesByDate = (
  messages: Message[],
): Record<string, Message[]> => {
  return messages.reduce<Record<string, Message[]>>((acc, message) => {
    const date = formatDate(new Date(message.sentAt));
    acc[date] = [...(acc[date] || []), message];
    return acc;
  }, {});
};

export const getBubblePosition = (
  dayMessages: Message[],
  index: number,
): BubblePosition => {
  const currentMessage = dayMessages[index];
  const prevMessage = index > 0 ? dayMessages[index - 1] : null;
  const nextMessage =
    index < dayMessages.length - 1 ? dayMessages[index + 1] : null;

  const currentTime = new Date(currentMessage.sentAt).getTime();
  const prevTime = prevMessage ? new Date(prevMessage.sentAt).getTime() : 0;
  const nextTime = nextMessage ? new Date(nextMessage.sentAt).getTime() : 0;

  const isPrevSameUser =
    prevMessage &&
    prevMessage.isOwn === currentMessage.isOwn &&
    currentTime - prevTime < CHAT_CONSTANTS.MESSAGE_GROUP_TIME_THRESHOLD_MS;

  const isNextSameUser =
    nextMessage &&
    nextMessage.isOwn === currentMessage.isOwn &&
    nextTime - currentTime < CHAT_CONSTANTS.MESSAGE_GROUP_TIME_THRESHOLD_MS;

  if (!isPrevSameUser && !isNextSameUser) return 'single';
  if (!isPrevSameUser && isNextSameUser) return 'first';
  if (isPrevSameUser && isNextSameUser) return 'middle';
  return 'last';
};

export const shouldShowProfile = (
  dayMessages: Message[],
  index: number,
): boolean => {
  const currentMessage = dayMessages[index];
  if (currentMessage.isOwn) return false;

  const prevMessage = index > 0 ? dayMessages[index - 1] : null;

  const currentTime = new Date(currentMessage.sentAt).getTime();
  const prevTime = prevMessage ? new Date(prevMessage.sentAt).getTime() : 0;

  return (
    !prevMessage ||
    prevMessage.isOwn !== currentMessage.isOwn ||
    currentTime - prevTime >= CHAT_CONSTANTS.MESSAGE_GROUP_TIME_THRESHOLD_MS
  );
};
