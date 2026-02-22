import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { formatTime, formatDate } from '@/utils/formatters';

describe('formatters', () => {
  describe('formatTime', () => {
    it.each([
      ['오전 시간', new Date('2025-01-15T09:05:00'), '오전 9:05'],
      ['오후 시간', new Date('2025-01-15T14:45:00'), '오후 2:45'],
    ])('%s을 올바르게 포맷한다', (_description, date, expected) => {
      const result = formatTime(date);

      expect(result).toBe(expected);
    });
  });

  describe('formatDate', () => {
    let mockNow: Date;

    beforeEach(() => {
      mockNow = new Date('2025-01-15T12:00:00');
      vi.setSystemTime(mockNow);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it.each([
      ['오늘', new Date('2025-01-15T15:30:00'), undefined, '오늘'],
      ['어제', new Date('2025-01-14T10:00:00'), undefined, '어제'],
    ])(
      '%s 날짜를 올바르게 포맷한다',
      (_description, date, options, expected) => {
        const result = formatDate(date, options);

        expect(result).toBe(expected);
      },
    );

    it.each([
      ['2일 전', new Date('2025-01-13T10:00:00'), '2일 전'],
      ['3일 전', new Date('2025-01-12T10:00:00'), '3일 전'],
      ['6일 전', new Date('2025-01-09T10:00:00'), '6일 전'],
    ])(
      'showDaysAgo가 true일 때 %s을 반환한다',
      (_description, date, expected) => {
        const result = formatDate(date, { showDaysAgo: true });

        expect(result).toBe(expected);
      },
    );

    it('showDaysAgo가 false일 때 "N일 전"을 반환하지 않는다', () => {
      const twoDaysAgo = new Date('2025-01-13T10:00:00');

      const result = formatDate(twoDaysAgo, { showDaysAgo: false });

      expect(result).toBe('1월 13일');
    });

    it.each([
      ['같은 해', new Date('2025-03-10T10:00:00'), '3월 10일'],
      ['일주일 이상 전', new Date('2025-01-07T10:00:00'), '1월 7일'],
    ])(
      '%s 날짜에 대해 "M월 D일" 형식을 반환한다',
      (_description, date, expected) => {
        const result = formatDate(date);

        expect(result).toBe(expected);
      },
    );

    it('다른 해의 날짜에 대해 "YYYY년 M월 D일"을 반환한다', () => {
      const lastYear = new Date('2024-12-25T10:00:00');

      const result = formatDate(lastYear);

      expect(result).toBe('2024년 12월 25일');
    });
  });
});
