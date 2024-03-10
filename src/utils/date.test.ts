import { dateNowFormatted, timeAgo } from './date';

// Mocking Date object
const mockDate = new Date('2024-03-09T12:00:00');

beforeEach(() => {
  global.Date = jest.fn(() => mockDate) as any;
  global.Date.now = jest.fn(() => mockDate.getTime());
});

describe('timeAgo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-03-09T12:00:00').getTime());
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('should return "year" for a date more than a year ago', () => {
    const timestamp = new Date('2023-03-09T12:00:00');
    const result = timeAgo(timestamp);
    expect(result).toBe('last year');
  });

  it('should return "month" for a date more than a month ago', () => {
    const timestamp = new Date('2024-02-09T12:00:00');
    const result = timeAgo(timestamp);
    expect(result).toBe('29 days ago');
  });

  it('should return "day" for a date more than a day ago', () => {
    const timestamp = new Date('2024-03-08T12:00:00');
    const result = timeAgo(timestamp);
    expect(result).toBe('yesterday');
  });

  it('should return "hour" for a date more than an hour ago', () => {
    const timestamp = new Date('2024-03-09T11:00:00');
    const result = timeAgo(timestamp);
    expect(result).toBe('1 hour ago');
  });

  it('should return "minute" for a date more than a minute ago', () => {
    const timestamp = new Date('2024-03-09T11:59:00');
    const result = timeAgo(timestamp);
    expect(result).toBe('1 minute ago');
  });

  it('should return "second" for a date less than a minute ago', () => {
    const timestamp = new Date('2024-03-09T11:59:59');
    const result = timeAgo(timestamp);
    expect(result).toBe('1 second ago');
  });
});

describe('dateNowFormatted', () => {
  it('should return the formatted date in "YYYY-MM-DD" format', () => {
    const result = dateNowFormatted();
    expect(result).toBe('09-03-2024');
  });
});
