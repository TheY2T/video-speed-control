interface VideoDescriptor {
  index: number;
  label: string;
  width: number;
  height: number;
  playing: boolean;
  currentSpeed: number;
}

type IncomingMessage =
  | { type: 'GET_VIDEOS' }
  | { type: 'SET_SPEED'; videoIndex: number; speed: number }
  | { type: 'GET_SPEED'; videoIndex: number };

chrome.runtime.onMessage.addListener((msg: IncomingMessage, _sender, sendResponse) => {
  switch (msg.type) {
    case 'GET_VIDEOS': {
      const videos = Array.from(document.querySelectorAll('video'));
      const descriptors: VideoDescriptor[] = videos.map((v, i) => ({
        index: i,
        label: `Video ${i + 1}`,
        width: v.videoWidth || v.clientWidth,
        height: v.videoHeight || v.clientHeight,
        playing: !v.paused && !v.ended && v.readyState > 2,
        currentSpeed: v.playbackRate,
      }));
      sendResponse(descriptors);
      break;
    }

    case 'SET_SPEED': {
      const video = document.querySelectorAll('video')[msg.videoIndex] as
        | HTMLVideoElement
        | undefined;
      if (video) {
        video.playbackRate = msg.speed;
        sendResponse({ ok: true });
      } else {
        sendResponse({ ok: false, error: 'Video not found' });
      }
      break;
    }

    case 'GET_SPEED': {
      const video = document.querySelectorAll('video')[msg.videoIndex] as
        | HTMLVideoElement
        | undefined;
      sendResponse({ speed: video ? video.playbackRate : 1.0 });
      break;
    }
  }
  return true;
});
