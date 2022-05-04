import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedMeasureState } from '../../atoms/selectedMeasure';
import { Card, Tabs, Title } from '@mantine/core';
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
  const [activeTab, setActiveTab] = useState(0);

  // TODO: Remove this hard-coded date once periodStart and periodEnd input boxes are added
  const dataRequirementsQuery = '?periodStart=2019-01-01&periodEnd=2019-12-31';

  function resetDataRequirements() {
    setDataRequirements(null);
    setError(null);
    setIsLoading(false);
    setActiveTab(0);
  }

  useEffect(() => {
    if (selectedMeasure) {
      setIsLoading(true);
      const dataReqUrl = `${process.env.NEXT_PUBLIC_DEQM_SERVER}/Measure/${selectedMeasure.id}/$data-requirements${dataRequirementsQuery}`;
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
    } else {
      // selectedMeasure was reset with 'Reset Inputs' button
      resetDataRequirements();
    }
  }, [selectedMeasure]);

  return (
    <Card shadow="xl" style={{ height: 400 }}>
      <Title order={4}>Data Requirements</Title>
      <Tabs grow active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="JSON"></Tabs.Tab>
        <Tabs.Tab label="Filters"></Tabs.Tab>
      </Tabs>
      <div style={{ display: activeTab === 0 ? 'block' : 'none' }}>
        <DataRequirementsJSON dataRequirements={dataRequirements} error={error} isLoading={isLoading} />
      </div>
      <div style={{ display: activeTab === 1 ? 'block' : 'none' }}>
        <DataRequirementsFilters dataRequirements={dataRequirements?.dataRequirement} />
      </div>
    </Card>
  );
}
