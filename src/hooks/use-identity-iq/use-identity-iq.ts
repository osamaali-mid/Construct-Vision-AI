import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import { toast } from 'sonner';

import { UserEvents, UserEventsTypes } from '@/types';
import { dateNowFormatted, drawOnCanvas, resizeCanvas } from '@/utils';
import * as cocossd from '@tensorflow-models/coco-ssd';

let INTERVAL: string | number | NodeJS.Timeout | null | undefined = null;
let STOP_TIMEOUT: string | number | NodeJS.Timeout | null | undefined = null;

const useIdentityIQ = () => {
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [model, setModel] = useState<cocossd.ObjectDetection>();
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState<UserEvents[]>([]);

  const registerUserEvent = useCallback(
    (type: UserEventsTypes, value: string | number | boolean | Date) => {
      setUserEvents(prev => [...prev, { type, value }]);
    },
    [],
  );

  const initModel = async () => {
    const loadedModel: cocossd.ObjectDetection = await cocossd.load({
      base: 'mobilenet_v2',
    });
    setModel(loadedModel);
  };
  const runPrediction = async () => {
    if (model && webCamRef.current?.video?.readyState === 4) {
      const predictions: cocossd.DetectedObject[] = await model.detect(
        webCamRef.current.video as HTMLVideoElement,
      );

      resizeCanvas(canvasRef, webCamRef);
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'));
    }
  };
  const stopAndSaveRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.requestData();
      clearTimeout(STOP_TIMEOUT as NodeJS.Timeout);
      mediaRecorderRef.current.stop();
      toast('Recording stopped and saved');
      registerUserEvent(UserEventsTypes.RECORD_STOPPED, new Date());
    }
  };
  const handleToggle = () => {
    setMirrored(!mirrored);
    registerUserEvent(UserEventsTypes.TOGGLE_MIRROR, mirrored ? 'Mirrored' : 'Not Mirrored');
  };
  const userPrompScreenshot = () => {
    if (webCamRef.current) {
      const imageSrc = webCamRef.current.getScreenshot();
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      if (imageSrc) {
        a.href = imageSrc;
        a.download = `IdentityIQ-screenshot-${dateNowFormatted()}.png`;
        a.click();
        document.body.removeChild(a);
        registerUserEvent(UserEventsTypes.SCREENSHOT, imageSrc);
      }
    }
  };

  const userPrompRecord = () => {
    if (!webCamRef.current?.video) {
      toast('No video stream found. Try again later.');
      return;
    }
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.requestData();
      clearTimeout(STOP_TIMEOUT as NodeJS.Timeout);
      mediaRecorderRef.current.stop();
      toast('Recording stopped and saved');
      registerUserEvent(UserEventsTypes.RECORD_STOPPED, new Date());
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if (webCamRef.current && mediaRecorderRef.current?.state !== 'recording') {
      mediaRecorderRef.current?.start();
      toast('Recording started');
      registerUserEvent(UserEventsTypes.RECORD_STARTED, new Date());

      STOP_TIMEOUT = setTimeout(() => {
        stopAndSaveRecording();
      }, 30000);
    }
  };

  useEffect(() => {
    if (webCamRef?.current?.video) {
      const { video } = webCamRef.current;
      const stream = (video as any).captureStream();
      if (stream) {
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = event => {
          if (event.data.size > 0) {
            const fileName = `IdentityIQ-video-recording-${dateNowFormatted()}.webm`;
            const blob = new Blob([event.data], { type: 'video' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            a.click();
            registerUserEvent(UserEventsTypes.RECORD_DOWNLOAD, url);
          }
        };
        mediaRecorderRef.current.onstart = () => {
          setIsRecording(true);
        };
        mediaRecorderRef.current.onstop = () => {
          setIsRecording(false);
        };
      }
    }
  }, [registerUserEvent, webCamRef]);

  useEffect(() => {
    initModel();
  }, []);

  useEffect(() => {
    if (model) {
      setLoading(false);
    }
  }, [model]);

  useEffect(() => {
    INTERVAL = setInterval(() => {
      runPrediction();
    }, 10);
    return () => {
      if (INTERVAL) {
        clearInterval(INTERVAL);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webCamRef.current, model, mirrored]);

  return {
    webCamRef,
    canvasRef,
    mirrored,
    isRecording,
    volume,
    userEvents,
    loading,
    handleToggle,
    userPrompRecord,
    userPrompScreenshot,
    setVolume,
    registerUserEvent,
  };
};

export default useIdentityIQ;
