'use client';

import { Fragment, useEffect, useRef } from 'react';

import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { UserEvents, UserEventsTypes } from '@/types';
import { timeAgo } from '@/utils/date';

type FeatureHighlightsProps = {
  userEvents: UserEvents[];
};

function FeatureHighlights({ userEvents }: FeatureHighlightsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const renderValue = (event: UserEvents) => {
    switch (event.type) {
      case UserEventsTypes.SCREENSHOT:
        return (
          <Image
            src={event.value as string}
            alt="camera"
            width={100}
            height={100}
            className="w-full h-auto mt-5"
          />
        );
      case UserEventsTypes.RECORD_STARTED:
        return <p className="pl-5">Recording started at {timeAgo(event.value as Date)}</p>;
      case UserEventsTypes.RECORD_STOPPED:
        return <p className="pl-5">Recording stopped at {timeAgo(event.value as Date)}</p>;
      case UserEventsTypes.RECORD_DOWNLOAD:
        return (
          <>
            <p className="pl-5">Recording succesfully downloaded</p>
            <video
              src={event.value as string}
              controls
              className="w-full h-auto mt-5"
              data-testid="video"
            />
          </>
        );
      case UserEventsTypes.TOGGLE_MIRROR:
        return <p className="pl-5">Image {event.value as string}</p>;
      case UserEventsTypes.VOLUME:
        return <p className="pl-5">Volume set to {(event.value as number) * 100}%</p>;
      case UserEventsTypes.THEME:
        return (
          <p className="pl-5">Theme changed to {(event.value as string).toLocaleUpperCase()}</p>
        );
      default:
        return null;
    }
  };
  useEffect(() => {
    if (wrapperRef.current) {
      // scroll to the last element

      wrapperRef.current.scrollTo({
        top: wrapperRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [userEvents]);

  return (
    <div className="relative flex flex-col justify-between h-full">
      <div className="text-xs text-muted-foreground">
        <h1 className="my-3 w-full font-black text-center text-lg">IdentityIQ Highlights</h1>
        <Separator className="mt-2 mb-5" />
        <ul className="space-y-4">
          <li>
            <strong>Dark Mode/Sys Theme 🌓</strong>
            <p>Toggle between dark mode and system theme</p>
          </li>
          <li>
            <strong>Horizontal Flip ↔</strong>
            <p>Adjust horizontal orientation</p>
          </li>
          <Separator />
          <li>
            <strong>Take Pictures 📸</strong>
            <p>Capture snapshots at any moment from the video feed</p>
          </li>
          <li>
            <strong>Manual Video Recording 🎥</strong>
            <p>Manually record video clips as needed.</p>
          </li>
          <Separator />
          <li>
            <strong>Volume Slider 🔊</strong>
            <p>Adjust the volume level of the notifications.</p>
          </li>
          <li>
            <strong>Camera feed highlighting ↔</strong>
            <p>
              Highlights persons in <span className="text-purple-500">purple</span> and other
              objects in <span className="text-green-500">green</span>.
            </p>
          </li>
        </ul>
      </div>
      <Separator className="mt-10" />
      <h1 className="my-3 w-full font-black text-center text-lg">User Events</h1>
      <Separator className="mt-1" />
      <div ref={wrapperRef} className="text-xs text-muted-foreground h-[40vh] overflow-y-auto mt-5">
        <ul className="space-y-4">
          {userEvents.length > 0 ? (
            userEvents.map((event, idx) => (
              <Fragment key={idx}>
                <li className="pl-4">
                  <strong>{event.type}</strong>
                  {renderValue(event)}
                </li>
                <Separator />
              </Fragment>
            ))
          ) : (
            <li className="text-center">
              <strong>No interactions yet.</strong>
              <p>Start interacting with the app to see the events here.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default FeatureHighlights;
