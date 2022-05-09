import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, Tabs, Title, Space } from '@mantine/core';
import KickoffHeaders from './KickoffHeaders';
import KickoffBody from './KickoffBody';
import KickoffPostUrl from './KickoffPostUrl';
import { kickoffRequestState } from '../../state/selectors/kickoffRequest';

export default function KickoffRequestPanel() {
  const kickoffRequest = useRecoilValue(kickoffRequestState);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card shadow="xl">
      <Title order={4}>Request Preview</Title>
      <Space h="sm" />
      <KickoffPostUrl></KickoffPostUrl>
      <Tabs grow active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="Body"></Tabs.Tab>
        <Tabs.Tab label="Headers"></Tabs.Tab>
      </Tabs>
      <div style={{ height: 290 }}>
        <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
          <KickoffBody body={kickoffRequest?.body} />
        </div>
        <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <KickoffHeaders headers={kickoffRequest?.headers} />
        </div>
      </div>
    </Card>
  );
}
