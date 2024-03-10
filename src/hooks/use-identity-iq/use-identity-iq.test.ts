import { useRef } from 'react';

import { toast } from 'sonner';

import { act, renderHook, waitFor } from '@testing-library/react';

import useIdentityIQ from './use-identity-iq';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn(),
  useEffect: jest.fn(),
  useRef: jest.fn(),
  useState: jest.fn().mockReturnValue([true, jest.fn()]),
}));

jest.mock('react-webcam', () => jest.fn());
jest.mock('sonner', () => ({ toast: jest.fn() }));
jest.mock('@/utils/', () => ({
  dateNowFormatted: jest.fn(),
  drawOnCanvas: jest.fn(),
  resizeCanvas: jest.fn(),
}));
jest.mock('@tensorflow-models/coco-ssd', () => jest.fn());

describe('useIdentityIQ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('handleToggle', () => {
    it('should toggle mirrored state', () => {
      const setMirrored = jest.fn();
      const handleToggle = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        handleToggle();
      });

      waitFor(() => expect(setMirrored).toHaveBeenCalledWith(false));
    });

    it('should register user events when handleToggle is called', () => {
      const registerUserEvent = jest.fn();
      const handleToggle = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        handleToggle();
      });

      waitFor(() => expect(registerUserEvent).toHaveBeenCalledWith('TOGGLE_MIRROR', 'Mirrored'));
    });
  });
  describe('userPrompRecord', () => {
    it('should verify if video stream is ready before recording', () => {
      const userPrompRecord = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompRecord();
      });

      waitFor(() => expect(toast).toHaveBeenCalledWith('No video stream found. Try again later.'));
    });
    it('should requestData, clearTimeout, stop recording, show toast and register user event when userPrompRecord is called and data is already being recorded', () => {
      const userPrompRecord = jest.fn();
      const requestData = jest.fn();
      const stop = jest.fn();

      (global as any).clearTimeout = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompRecord();
      });

      waitFor(() => {
        expect(requestData).toHaveBeenCalled();
        expect(clearTimeout).toHaveBeenCalled();
        expect(stop).toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith('Recording stopped and saved');
      });
    });
    it('should start recording when userPrompRecord is called and media is not being recorded', () => {
      const userPrompRecord = jest.fn();
      const startRecording = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompRecord();
      });

      waitFor(() => expect(startRecording).toHaveBeenCalled());
    });
  });
  describe('startRecording', () => {
    it('should start recording if video is ready and media is not being recorded', () => {
      const start = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        start();
      });

      waitFor(() => expect(start).toHaveBeenCalled());
    });
    it('should set timeout to stop recording after 30 seconds', () => {
      const start = jest.fn();
      const stopAndSaveRecording = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        start();
      });

      waitFor(() => expect(setTimeout).toHaveBeenCalledWith(expect(stopAndSaveRecording), 30000));
    });
    it('should display toast when recording is started', () => {
      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(toast).toHaveBeenCalledWith('Recording started'));
    });
    it('should set isRecording to true when recording is started', () => {
      const setIsRecording = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(setIsRecording).toHaveBeenCalledWith(true));
    });
  });
  describe('stopAndSaveRecording', () => {
    it('should requestData, clearTimeout, stop recording, show toast and register user event if media is being recorded', () => {
      const stopAndSaveRecording = jest.fn();
      const requestData = jest.fn();
      const stop = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        stopAndSaveRecording();
      });

      waitFor(() => {
        expect(requestData).toHaveBeenCalled();
        expect(clearTimeout).toHaveBeenCalled();
        expect(stop).toHaveBeenCalled();
        expect(toast).toHaveBeenCalledWith('Recording stopped and saved');
      });
    });
    it('should set isRecording to false when recording is stopped', () => {
      const setIsRecording = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(setIsRecording).toHaveBeenCalledWith(false));
    });
  });
  describe('initModel', () => {
    it('should initialize model', () => {
      const initModel = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(initModel).toHaveBeenCalled());
    });
    it('should set model data to state', () => {
      const setModel = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(setModel).toHaveBeenCalled());
    });
    it('should set loading to false when model is ready', () => {
      const setLoading = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(setLoading).toHaveBeenCalledWith(false));
    });
  });
  describe('runPrediction', () => {
    it('should run prediction when video is ready', () => {
      const runPrediction = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(runPrediction).toHaveBeenCalled());
    });
    it('should not run prediction when video is not ready', () => {
      const runPrediction = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(runPrediction).not.toHaveBeenCalled());
    });
    it('should resize canvas when runPrediction is called and video is ready', () => {
      const resizeCanvas = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(resizeCanvas).toHaveBeenCalled());
    });

    it('should draw on canvas when runPrediction is called and video is ready', () => {
      const drawOnCanvas = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(drawOnCanvas).toHaveBeenCalled());
    });
  });
  describe('userPrompScreenshot', () => {
    it('should getScreenshot when userPrompScreenshot is called', () => {
      const userPrompScreenshot = jest.fn();
      const getScreenshot = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompScreenshot();
      });

      waitFor(() => expect(getScreenshot).toHaveBeenCalled());
    });

    it('should download screenshot when userPrompScreenshot is called', () => {
      const a = document.createElement('a');
      const userPrompScreenshot = jest.fn();
      const url = 'test-url';

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompScreenshot();
      });
      act(() => {
        a.click();
      });

      waitFor(() => {
        expect(a.download).toBe('IdentityIQ-screenshot-2024-03-09.png');
        expect(a.href).toBe(url);
      });
    });
    it('should register user event when userPrompScreenshot is called', () => {
      const registerUserEvent = jest.fn();
      const userPrompScreenshot = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      act(() => {
        userPrompScreenshot();
      });

      waitFor(() => expect(registerUserEvent).toHaveBeenCalledWith('SCREENSHOT', 'test-url'));
    });
  });

  describe('detect', () => {
    it('should detect objects when video is ready', () => {
      const detect = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(detect).toHaveBeenCalled());
    });

    it('should not detect objects when video is not ready', () => {
      const detect = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 0 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(detect).not.toHaveBeenCalled());
    });

    it('should not detect objects when model is not ready', () => {
      const detect = jest.fn();

      (useRef as jest.Mock).mockImplementationOnce(() => ({
        current: { video: { readyState: 4 } },
      }));

      renderHook(() => useIdentityIQ());

      waitFor(() => expect(detect).not.toHaveBeenCalled());
    });
  });
});
