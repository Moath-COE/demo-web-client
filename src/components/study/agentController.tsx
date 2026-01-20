import {
  RoomAudioRenderer,
  ControlBar,
  BarVisualizer,
  useVoiceAssistant,
  useRoomContext,
} from "@livekit/components-react";
import { useEffect } from "react";
import { RoomEvent, RemoteParticipant, DataPacket_Kind } from "livekit-client";

export default function AgentController({
  api,
  numPages,
}: {
  api: any;
  numPages: number;
}) {
  const { state, audioTrack } = useVoiceAssistant();
  const room = useRoomContext();

  useEffect(() => {
    interface UIControlData {
      action: string;
      page?: number;
    }

    const handleData = (
      payload: Uint8Array,
      participant?: RemoteParticipant,
      kind?: DataPacket_Kind,
      topic?: string,
    ) => {
      if (topic === "ui-control") {
        const data: UIControlData = JSON.parse(
          new TextDecoder().decode(payload),
        );

        if (data.action === "scroll") {
          console.log("Agent requested scroll to page:", data.page);
          // Your scrolling logic here:
          // Add this function to control page navigation
          if (api && data.page && data.page >= 1 && data.page <= numPages) {
            api.scrollTo(data.page - 1); // scrollTo uses 0-based index
          }
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room]);

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
