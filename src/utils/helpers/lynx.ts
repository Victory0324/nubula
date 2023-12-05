export function getGeneratedLynxTrack(history: LynxHistoryItem[]) {
  // There isn't a particularly neat way to tell if a new track is generated from
  // lynx. But I've found the last message in history response will always contain
  // the output track if you asked for one to be generated.
  try {
    const lastMessage = history[history.length - 1];
    const attachment = lastMessage.attachments?.find(
      (attachment) => attachment.type === 'audio/mp3'
    );
    if (attachment) return JSON.parse(attachment.payload) as OutputTrack;
  } catch (error) {
    console.error('error getting generated lynx track', error);
  }
}
