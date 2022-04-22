import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectedMeasureState } from '../atoms/selectedMeasure';
import { Loader, ScrollArea, Card, Center, Tabs, Title, Text } from '@mantine/core';
import dynamic from 'next/dynamic';
const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

export default function DataRequirementsViewer() {
  const [selectedMeasure] = useRecoilState(selectedMeasureState);
  const [dataRequirements, setDataRequirements] = useState<fhir4.DataRequirement | null>(null);
  const [error, setError] = useState<fhir4.OperationOutcome | null>(null);
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
          setError(null);
          setIsLoading(false);
        })
        .catch(e => {
          setError(e);
          setIsLoading(false);
        });
    }
  }, [selectedMeasure]);

  return (
    <Card shadow="xl">
      <Title order={4}>Data Requirements</Title>
      <Tabs>
        <Tabs.Tab label="JSON">
          <ScrollArea style={{ height: 300 }}>{renderJSONResults(isLoading, dataRequirements, error)}</ScrollArea>
        </Tabs.Tab>
        <Tabs.Tab label="Filters">
          <ScrollArea style={{ height: 300 }}>
            <Text>Filter preview coming soon to a Bulk Submit Demo near you!</Text>
          </ScrollArea>
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
}

function renderJSONResults(
  isLoading: boolean,
  dataRequirements: fhir4.DataRequirement | null,
  error: fhir4.OperationOutcome | null
) {
  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  } else if (error) {
    return <DynamicReactJson src={error} indentWidth={2} />;
  } else if (dataRequirements) {
    return <DynamicReactJson src={dataRequirements} indentWidth={2} />;
  } else {
    return (
      <Center>
        <Text>No Data</Text>
      </Center>
    );
  }
}
