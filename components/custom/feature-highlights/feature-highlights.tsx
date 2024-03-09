import { Separator } from '@/components/ui/separator';

const FeatureHighlights = ({ mirrored }: { mirrored: boolean }) => {
  return (
    <div className="text-xs text-muted-foreground">
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
          <strong>Enable/Disable Auto Record 🚫</strong>
          <p>Option to enable/disable automatic video recording whenever required.</p>
        </li>
        <li>
          <strong>Volume Slider 🔊</strong>
          <p>Adjust the volume level of the notifications.</p>
        </li>
        <li>
          <strong>Camera feed highlighting ↔</strong>
          <p>
            Highlights persons in <span style={{ color: '#FF0F0F' }}>red</span> and other objects in{' '}
            <span style={{ color: '#0FFF0F' }}>green</span>.
          </p>
        </li>
        <Separator />
        <li className="space-y-4">
          <strong>Share your thoughts 💭</strong>
          <br />
          <br />
          <br />
        </li>
        <li>
          <strong>IsMirrored?</strong>
          <p>{mirrored ? 'Yes' : 'No'}</p>
        </li>
      </ul>
    </div>
  );
};

export default FeatureHighlights;
