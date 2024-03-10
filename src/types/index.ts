export enum UserEventsTypes {
  SCREENSHOT = 'Screenshot Taken',
  RECORD_STARTED = 'Recording Started',
  RECORD_STOPPED = 'Recording Stopped',
  RECORD_DOWNLOAD = 'Record Downloaded',
  TOGGLE_MIRROR = 'Horizontal Flip Toggled',
  VOLUME = 'Volume set to',
  THEME = 'Theme changed to',
}

export type UserEvents = {
  type: UserEventsTypes;
  value: string | number | boolean | Date;
};
