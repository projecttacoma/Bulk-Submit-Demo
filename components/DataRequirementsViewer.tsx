import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedMeasureState } from '../atoms/selectedMeasure';
import { Loader, ScrollArea, Card, Tabs, Title, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

export default function DataRequirementsViewer() {
  const [selectedMeasure] = useRecoilState(selectedMeasureState);
  const [dataRequirements, setDataRequirements] = useState<fhir4.DataRequirement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dataRequirementsQuery = '?periodStart=2019-01-01&periodEnd=2019-12-31';
  useEffect(() => {
    if (selectedMeasure) {
      setIsLoading(true);
      const dataReqUrl = `${process.env.NEXT_PUBLIC_DEQM_SERVER}/Measure/${selectedMeasure}/$data-requirements${dataRequirementsQuery}`;
      fetch(dataReqUrl)
        .then(res => res.json())
        .then(dr => {
          setDataRequirements(dr);
          setIsLoading(false);
        })
        .catch(console.log);
    }
  }, [selectedMeasure]);

  return (
    <Card shadow="xl">
      <Title order={4}>Data Requirements</Title>
      <Tabs>
        <Tabs.Tab label="JSON">
          <ScrollArea style={{ height: 300 }}>
            {isLoading && <Loader />}
            {!isLoading && dataRequirements && (
              <DynamicReactJson src={dataRequirements} indentWidth={2} collapsed={true} />
            )}
            {!isLoading && !dataRequirements && <Text>No Data</Text>}
          </ScrollArea>
        </Tabs.Tab>
        <Tabs.Tab label="Filters">
          <Text>Filter preview coming soon to a Bulk Submit Demo near you!</Text>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
}
