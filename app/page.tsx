'use client';
import ThemeToggler from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FlipHorizontal } from 'lucide-react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

type Props = {};

const HomePage = (props: Props) => {
  const webCamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mirrored, setMirrored] = useState(true);

  return (
    <div className="flex h-screen w-screen">
      <nav className="flex flex-col gap-2 justify-start items-start space-x-4 mt-3">
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
            <Button variant="outline" size="icon" onClick={() => setMirrored(!mirrored)}>
              <FlipHorizontal />
            </Button>
            <Separator />
          </div>
          <div className="flex flex-col gap-2">
            <Separator />
            <Separator />
          </div>
          <div className="flex flex-col gap-2">
            <Separator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
