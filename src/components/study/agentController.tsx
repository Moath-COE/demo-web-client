import {
  RoomAudioRenderer,
  ControlBar,
  BarVisualizer,
  useVoiceAssistant,
} from "@livekit/components-react";

export default function AgentController() {
  const { state, audioTrack } = useVoiceAssistant();

  return (
    <>
      <BarVisualizer
        state={state}
        trackRef={audioTrack}
        barCount={7}
        style={
          {
            "--lk-accent-bg": "#002cf2",
            "--lk-va-bar-height": "30px",
          } as React.CSSProperties
        }
      />
      <ControlBar
        controls={{
          microphone: true,
          camera: false,
          screenShare: false,
        }}
      />
      <RoomAudioRenderer />
    </>
  );
}
