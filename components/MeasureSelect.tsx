import { Select, SelectItem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { AlertCircle } from 'tabler-icons-react';
import { selectedMeasureState } from '../atoms/selectedMeasure';

export default function MeasureSelect() {
  const [measures, setMeasures] = useState<SelectItem[]>([]);
  const [selectedMeasure, setSelectedMeasure] = useRecoilState<string | null>(selectedMeasureState);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DEQM_SERVER}/Measure`)
      .then(res => res.json())
      .then((measuresBundle: fhir4.Bundle) => {
        const measureItems: SelectItem[] =
          measuresBundle.entry?.map(entry => {
            const measure = entry.resource as fhir4.Measure;
            return {
              value: measure.id ?? '',
              label: measure.name ? `${measure.name} (${measure.id})` : measure.id
            };
          }) ?? [];
        setMeasures(measureItems);
      })
      .catch((reason: Error) => {
        showNotification({
          title: 'FHIR Server Error',
          message: `Measure listing failed: ${reason.message}. Check if deqm-test-server is running.`,
          disallowClose: true,
          autoClose: false,
          color: 'red',
          icon: <AlertCircle />
        });
      });
  }, []);

  return <Select placeholder="Measure ID" data={measures} value={selectedMeasure} onChange={setSelectedMeasure} />;
}
