const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
const SECONDS_PER_MINUTE = 60;
const MILLISECONDS_PER_SECOND = 1000;
const MILLISECONDS_PER_DAY =
  HOURS_PER_DAY *
  MINUTES_PER_HOUR *
  SECONDS_PER_MINUTE *
  MILLISECONDS_PER_SECOND;
const HOURS_IN_12_HOUR_FORMAT = 12;
const DAYS_IN_WEEK = 7;
const PAD_LENGTH = 2;
const PAD_CHAR = '0';

export const formatTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= HOURS_IN_12_HOUR_FORMAT ? '오후' : '오전';
  const displayHours =
    hours % HOURS_IN_12_HOUR_FORMAT || HOURS_IN_12_HOUR_FORMAT;
  const displayMinutes = minutes.toString().padStart(PAD_LENGTH, PAD_CHAR);

  return `${period} ${displayHours}:${displayMinutes}`;
};

export const formatDate = (
  date: Date,
  options?: { showDaysAgo?: boolean },
): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.floor(diffTime / MILLISECONDS_PER_DAY);

  if (diffDays === 0) {
    return '오늘';
  }

  if (diffDays === 1) {
    return '어제';
  }

  if (options?.showDaysAgo && diffDays > 0 && diffDays < DAYS_IN_WEEK) {
    return `${diffDays}일 전`;
  }

  const messageDate = new Date(date);

  if (today.getFullYear() === messageDate.getFullYear()) {
    return `${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
  }

  return `${messageDate.getFullYear()}년 ${messageDate.getMonth() + 1}월 ${messageDate.getDate()}일`;
};
