'use client';
import FeatureHighlights from '@/components/custom/feature-highlights/feature-highlights';
import ThemeToggler from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { beep } from '@/utils/audio';
import { Camera, FlipHorizontal, PersonStanding, Video, Volume2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import * as cocossd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-backend-cpu';
import { drawOnCanvas, resizeCanvas } from '@/utils/canvas';

let INTERVAL: string | number | NodeJS.Timeout | null | undefined = null;

const HomePage = () => {
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mirrored, setMirrored] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [model, setModel] = useState<cocossd.ObjectDetection>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    initModel();
  }, []);

  const initModel = async () => {
    const loadedModel: cocossd.ObjectDetection = await cocossd.load({
      base: 'mobilenet_v2',
    });
    setModel(loadedModel);
  };

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

  const runPrediction = async () => {
    if (model && webCamRef.current?.video?.readyState === 4) {
      const predictions: cocossd.DetectedObject[] = await model.detect(
        webCamRef.current.video as HTMLVideoElement,
      );

      resizeCanvas(canvasRef, webCamRef);
      drawOnCanvas(mirrored, predictions, canvasRef.current?.getContext('2d'));
    }
  };

  const handleToggle = () => setMirrored(!mirrored);
  const userPrompScreenshot = () => {
    //take picture
    //save it to downloads
  };
  const userPrompRecord = () => {
    //check if recording
    // then stop recording
    // and save it to downloads
    // if not recording
    // start recording
  };
  const toggleAutoRecord = () => {
    if (autoRecordEnabled) {
      setAutoRecordEnabled(false);
      toast('Auto Record Disabled');
    } else {
      setAutoRecordEnabled(true);
      toast('Auto Record Enabled');
    }
  };
  return (
    <div className="flex h-screen w-screen">
      <nav className="flex flex-col gap-2 justify-start items-start mt-3">
        <Link href="/about">
          <Button>Go to About</Button>
        </Link>
        <Link href="/link2">
          <Button>Link 2</Button>
        </Link>
        <Link href="/link3">
          <Button>Link 3</Button>
        </Link>
      </nav>

      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam
            ref={webCamRef}
            mirrored={mirrored}
            className="h-full w-full object-contain p-2"
            data-testid="webcam"
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 h-full w-full object-contain"
          ></canvas>
        </div>
      </div>

      <div className="flex flex-row flex-1">
        <div className="border-primary" />
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
          <div className="flex flex-col gap-2">
            <ThemeToggler />
            <Button
              variant="outline"
              size="icon"
              onClick={handleToggle}
              data-testid="toggle-mirror"
            >
              <FlipHorizontal />
            </Button>
            <Separator className="my-2" />
          </div>
          <div className="flex flex-col gap-2">
            <Separator />
            <Button
              data-testid="camera"
              variant="outline"
              size="icon"
              onClick={userPrompScreenshot}
            >
              <Camera />
            </Button>
            <Button
              data-testid="video"
              variant={isRecording ? 'destructive' : 'outline'}
              size="icon"
              onClick={userPrompRecord}
            >
              <Video />
            </Button>
            <Separator className="my-2" />
            <Button
              data-testid="auto-record"
              variant={autoRecordEnabled ? 'destructive' : 'outline'}
              size="icon"
              onClick={toggleAutoRecord}
            >
              {autoRecordEnabled ? <Rings color="white" height={40} /> : <PersonStanding />}
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            <Separator className="my-2" />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider
                  data-testid="slider"
                  max={1}
                  min={0}
                  step={0.2}
                  defaultValue={[volume]}
                  onValueCommit={val => {
                    setVolume(val[0]);
                    beep(val[0]);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="h-full flex-1 py-4 px-2 overflow-y-scroll">
          <FeatureHighlights {...{ mirrored }} />
        </div>
      </div>
      {loading && (
        <div className="z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground">
          Getting things ready... <Rings color="red" height={50} />
        </div>
      )}
    </div>
  );
};

export default HomePage;
