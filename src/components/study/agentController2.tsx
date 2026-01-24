import {
  useVoiceAssistant,
  useRoomContext,
  ControlBar,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useRef } from "react";
import { RoomEvent, RemoteParticipant, DataPacket_Kind } from "livekit-client";

export default function AgentController({
  api,
  numPages,
}: {
  api: any;
  numPages: number;
}) {
  const { state, audioTrack, agentTranscriptions } = useVoiceAssistant();
  const room = useRoomContext();
  const transcriptionEndRef = useRef<HTMLDivElement>(null);

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
  }, [room, api, numPages]);

  return (
    <div className="flex flex-col h-full" data-lk-theme="default">
      <ControlBar variation="minimal" />
    </div>
  );
}
