import { SetStateAction } from 'react';

import { Camera, FlipHorizontal, Video, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import FeatureHighlights from '@/sections/feature-highlights/feature-highlights';
import ThemeToggler from '@/sections/theme-toggle/theme-toggle';
import { UserEvents, UserEventsTypes } from '@/types';
import { beep } from '@/utils/audio';

type MiddleControlsProps = {
  registerUserEvent: (type: UserEventsTypes, value: string | number | boolean | Date) => void;
  handleToggle: () => void;
  userPrompScreenshot: () => void;
  isRecording: boolean;
  userPrompRecord: () => void;
  volume: number;
  setVolume: (value: SetStateAction<number>) => void;
  userEvents: UserEvents[];
};

function MiddleControls({
  handleToggle,
  isRecording,
  registerUserEvent,
  userPrompRecord,
  userPrompScreenshot,
  setVolume,
  volume,
  userEvents,
}: MiddleControlsProps) {
  return (
    <div className="flex flex-row">
      <div className="border-primary/2 border-2 max-w-xs flex flex-col gap-2 justify-between shadow-md rounded-md p-4">
        <div className="flex flex-col gap-2">
          <ThemeToggler {...{ registerUserEvent }} />
          <Button variant="outline" size="icon" onClick={handleToggle} data-testid="toggle-mirror">
            <FlipHorizontal />
          </Button>
          <Separator className="my-2" />
        </div>
        <div className="flex flex-col gap-2">
          <Separator />
          <Button data-testid="camera" variant="outline" size="icon" onClick={userPrompScreenshot}>
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
          <Separator />
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
                  registerUserEvent(UserEventsTypes.VOLUME, val[0]);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="h-full flex-1 py-4 px-2  max-w-[25vw] min-w-[20vw]">
        <FeatureHighlights {...{ userEvents }} />
      </div>
    </div>
  );
}

export default MiddleControls;
