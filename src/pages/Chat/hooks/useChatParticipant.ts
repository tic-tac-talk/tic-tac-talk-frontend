import { useState } from 'react';

export const useChatParticipant = () => {
  const [otherUserName, setOtherUserName] = useState<string | null>(null);
  const [otherUserProfileUrl, setOtherUserProfileUrl] = useState<string | null>(
    null,
  );

  const updateParticipant = (nickname: string, profileUrl?: string | null) => {
    setOtherUserName(nickname);
    if (profileUrl !== undefined) {
      setOtherUserProfileUrl(profileUrl);
    }
  };

  return {
    otherUserName,
    otherUserProfileUrl,
    updateParticipant,
  };
};
