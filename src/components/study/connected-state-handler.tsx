"use client";

import {
  RoomAudioRenderer,
  useVoiceAssistant,
  useRoomContext,
  useTrackToggle,
  useDisconnectButton,
  BarVisualizer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useRef } from "react";
import {
  RoomEvent,
  RemoteParticipant,
  DataPacket_Kind,
  Track,
} from "livekit-client";
import { ConnectedStateHandlerProps, UIControlData } from "@/types/types";

export function ConnectedStateHandler({
  api,
  numPages,
  setActiveMarker,
  onAgentStateChange,
  onTopicNameChange,
  onSectionsChange,
  onCheckpointChange,
  onMicToggleChange,
  onDisconnectPropsChange,
}: ConnectedStateHandlerProps) {
  const { state: agentState, audioTrack } = useVoiceAssistant();
  const room = useRoomContext();
  const micToggle = useTrackToggle({ source: Track.Source.Microphone });
  const { buttonProps: disconnectProps } = useDisconnectButton({
    stopTracks: true,
  });
  const pendingTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    onAgentStateChange(agentState);
  }, [agentState, onAgentStateChange]);

  useEffect(() => {
    onMicToggleChange(micToggle);
  }, [micToggle, onMicToggleChange]);

  useEffect(() => {
    onDisconnectPropsChange(disconnectProps);
  }, [disconnectProps, onDisconnectPropsChange]);

  useEffect(() => {
    const handleData = (
      payload: Uint8Array,
      _participant?: RemoteParticipant,
      _kind?: DataPacket_Kind,
      topic?: string,
    ) => {
      if (topic === "ui-control") {
        const data: UIControlData = JSON.parse(
          new TextDecoder().decode(payload),
        );

        if (data.action === "scroll") {
          if (api && data.page && data.page >= 1 && data.page <= numPages) {
            api.scrollTo(data.page - 1);
          }
        } else if (data.action === "set_topic") {
          if (data.topic) {
            onTopicNameChange(data.topic);
            onSectionsChange(data.number_of_sections || null, null);
          }
        } else if (data.action === "set_section") {
          if (data.section) {
            onSectionsChange(null, data.current_section_index || null);
          }
        } else if (data.action === "set_checkpoint") {
          if (data.checkpoint_question) {
            onCheckpointChange(data.checkpoint_question);
          }
        } else if (data.action === "section_done") {
          onSectionsChange(null, null);
        } else if (data.action === "remove_markers") {
          if (data.remove) {
            setActiveMarker((prev) => {
              const next = { ...prev };
              for (const id of data.remove!) {
                delete next[id];
              }
              return next;
            });
          }
        } else if (data.action === "add_markers") {
          if (data.add) {
            for (const [id, marker] of Object.entries(data.add)) {
              if (marker.delay > 0) {
                const tid = setTimeout(() => {
                  setActiveMarker((prev) => ({ ...prev, [id]: marker }));
                  pendingTimeouts.current = pendingTimeouts.current.filter(
                    (t) => t !== tid,
                  );
                }, marker.delay);
                pendingTimeouts.current.push(tid);
              } else {
                setActiveMarker((prev) => ({ ...prev, [id]: marker }));
              }
            }
          }
        }
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
      for (const tid of pendingTimeouts.current) {
        clearTimeout(tid);
      }
      pendingTimeouts.current = [];
    };
  }, [
    room,
    api,
    numPages,
    setActiveMarker,
    onTopicNameChange,
    onSectionsChange,
    onCheckpointChange,
  ]);

  return (
    <>
      <RoomAudioRenderer />
      <div
        className="w-[160px] sm:w-[250px] h-[40px] bg-[#045687]   p-1 pl-4 "
        data-lk-theme="default"
      >
        <BarVisualizer
          state={agentState}
          trackRef={audioTrack}
          barCount={15}
          options={{ minHeight: 28 }}
          style={
            {
              "--lk-fg":
                agentState === "listening"
                  ? "#4ade80"
                  : agentState === "thinking"
                    ? "#fbbf24"
                    : agentState === "speaking"
                      ? "#ffa02f"
                      : "#60a5fa",
              "--lk-bg": "rgba(29, 84, 121, 0.15)",
              "--lk-va-bar-height": "60px",
              "--lk-va-bar-width": "6px",
              "--lk-va-bar-gap": "6px",
              "--lk-va-border-radius": "8px",
            } as React.CSSProperties
          }
          className="w-full h-full drop-shadow-[0_0_8px_rgba(255,160,47,0.3)]"
        />
      </div>
    </>
  );
}
