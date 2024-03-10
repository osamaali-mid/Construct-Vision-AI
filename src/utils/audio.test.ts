import { waitFor } from '@testing-library/react';

import { AUDIO_64, beep } from './audio';

describe('beep', () => {
  let mockAudio: jest.Mock;
  let originalAudio: typeof window.Audio;

  beforeAll(() => {
    originalAudio = window.Audio;
    mockAudio = jest.fn(() => ({
      volume: 0,
      play: jest.fn(),
    }));
    window.Audio = mockAudio;
  });

  afterAll(() => {
    window.Audio = originalAudio;
  });

  it('should create an Audio object with the correct volume and call play()', () => {
    beep(0.5);

    waitFor(() => {
      expect(mockAudio).toHaveBeenCalledWith(`data:audio/mpeg;base64,${AUDIO_64}`);

      expect(mockAudio.mock.instances[0].volume).toBe(0.5);

      expect(mockAudio.mock.instances[0].play).toHaveBeenCalled();
    });
  });
});
