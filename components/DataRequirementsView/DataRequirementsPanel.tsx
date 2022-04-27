import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMeasureState } from '../../atoms/selectedMeasure';
import { Loader, ScrollArea, Card, Center, Tabs, Title, Text } from '@mantine/core';
import { DataRequirementsFilters } from './DataRequirementsFilters';
import DataRequirementsJSON from './DataRequirementsJSON';

/**
 * Pings DEQM-test-server for the $data-requirements results based on the measure
 * selected. Updates each time a new measure is selected
 * @returns JSX for Data Requirements panel on screen
 */
export default function DataRequirementsPanel() {
  const selectedMeasure = useRecoilValue(selectedMeasureState);
  const [dataRequirements, setDataRequirements] = useState<fhir4.Library | null>(null);
  const [error, setError] = useState<fhir4.OperationOutcome | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Remove this hard-coded date once periodStart and periodEnd input boxes are added
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
    <Card shadow="xl" style={{ height: 400 }}>
      <Title order={4}>Data Requirements</Title>
      <Tabs grow>
        <Tabs.Tab label="JSON">
          <DataRequirementsJSON dataRequirements={dataRequirements} error={error} isLoading={isLoading} />
        </Tabs.Tab>
        <Tabs.Tab label="Filters">
          <DataRequirementsFilters dataRequirements={dataRequirements?.dataRequirement} />
        </Tabs.Tab>
      </Tabs>
    </Card>
  );
}
