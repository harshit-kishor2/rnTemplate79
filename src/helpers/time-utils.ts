import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);
dayjs.extend(relativeTime);

// Format a date to a readable string
const formatDate = (
  date: string | Date,
  format: string = 'MMMM D, YYYY'
): string => {
  return dayjs(date).format(format);
};

// Get the current date in a specific format
const getCurrentDate = (format: string = 'YYYY-MM-DD'): string => {
  return dayjs().format(format);
};

// Get the current time in a specific timezone
const getCurrentTimeInZone = (tz: string = 'UTC'): string => {
  return dayjs().tz(tz).format('YYYY-MM-DD HH:mm:ss');
};

// Add time to a date
const addTime = (
  date: string | Date,
  value: number,
  unit: dayjs.ManipulateType = 'day'
): string => {
  return dayjs(date).add(value, unit).format('YYYY-MM-DD HH:mm:ss');
};

// Subtract time from a date
const subtractTime = (
  date: string | Date,
  value: number,
  unit: dayjs.ManipulateType = 'hour'
): string => {
  return dayjs(date).subtract(value, unit).format('YYYY-MM-DD HH:mm:ss');
};

// Calculate the difference between two dates in a specific unit
const getDifference = (
  date1: string | Date,
  date2: string | Date,
  unit: dayjs.ManipulateType = 'day'
): number => {
  return dayjs(date1).diff(dayjs(date2), unit);
};

// Get the relative time from now
const getRelativeTimeFromNow = (
  date: string | Date | number | null
): string => {
  // Handle invalid inputs
  if (!date) return 'Invalid date';

  // If it's a number (timestamp), convert to Date object
  const parsedDate = typeof date === 'number' ? new Date(date) : date;

  return dayjs(parsedDate).fromNow();
};

// Convert a duration to a human-readable format
const formatDuration = (milliseconds: number): string => {
  return dayjs.duration(milliseconds).humanize();
};

// Check if a date is in the past
const isPast = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

// Check if a date is today
const isToday = (date: string | Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

// Convert a date to UTC format
const toUTC = (date: string | Date): string => {
  return dayjs(date).utc().format('YYYY-MM-DD HH:mm:ss');
};

// Convert a date to a specific timezone
const toTimezone = (date: string | Date, tz: string = 'UTC'): string => {
  return dayjs(date).tz(tz).format('YYYY-MM-DD HH:mm:ss');
};

// Get the start of the day for a date
const startOfDay = (date: string | Date): string => {
  return dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
};

// Get the end of the day for a date
const endOfDay = (date: string | Date): string => {
  return dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
};

const TimeUtils = {
  formatDate,
  getCurrentDate,
  getCurrentTimeInZone,
  addTime,
  subtractTime,
  getDifference,
  getRelativeTimeFromNow,
  formatDuration,
  isPast,
  isToday,
  toUTC,
  toTimezone,
  startOfDay,
  endOfDay,
};

export default TimeUtils;
