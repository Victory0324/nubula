'use client';

import TrackList from './TrackList';
import { useState } from 'react';
import VideoList from './VideoList';

export type TabProps = {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
};

const InventorySidebar = () => {
  const [currentTab, setCurrentTab] = useState('tracks');

  if (currentTab === 'videos') {
    return <VideoList currentTab={currentTab} setCurrentTab={setCurrentTab} />;
  }

  return <TrackList currentTab={currentTab} setCurrentTab={setCurrentTab} />;
};

export default InventorySidebar;
