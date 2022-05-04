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
      <Tabs grow style={{ height: 340 }}>
        <Tabs.Tab label="Body">
          <KickoffBody body={body} />
        </Tabs.Tab>
        <Tabs.Tab label="Headers">
          <KickoffHeaders headers={headers} />
        </Tabs.Tab>
      </Tabs>
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
