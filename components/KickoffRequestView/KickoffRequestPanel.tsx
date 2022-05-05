import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMeasureState } from '../../atoms/selectedMeasure';
import { Card, Tabs, Title, Space } from '@mantine/core';
import KickoffHeaders from './KickoffHeaders';
import KickoffBody from './KickoffBody';
import { exportUrlState } from '../../atoms/exportUrl';
import KickoffPostUrl from './KickoffPostUrl';

export default function KickoffRequestPanel() {
  const selectedMeasure = useRecoilValue(selectedMeasureState);
  const exportUrl = useRecoilValue(exportUrlState);
  const [activeTab, setActiveTab] = useState(0);
  let body: fhir4.Parameters | undefined;
  let headers: string | undefined;

  if (selectedMeasure && exportUrl) {
    [body, headers] = buildKickoffRequest(selectedMeasure, exportUrl);
  }

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
          <KickoffBody body={body} />
        </div>
        <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
          <KickoffHeaders headers={headers} />
        </div>
      </div>
    </Card>
  );
}

function buildKickoffRequest(
  selectedMeasure: { id: string; url?: string },
  exportUrl: string
): [fhir4.Parameters, string] {
  return [
    {
      resourceType: 'Parameters',
      parameter: [
        {
          name: 'measureReport',
          resource: {
            resourceType: 'MeasureReport',
            measure: selectedMeasure.url ?? selectedMeasure.id,
            period: {
              start: '2019-01-01',
              end: '2019-12-31'
            },
            status: 'pending',
            type: 'data-collection'
          }
        },
        {
          name: 'exportUrl',
          valueUrl: exportUrl
        }
      ]
    },
    'Content-Type: application/json+fhir\nPrefer: respond-async'
  ];
}
