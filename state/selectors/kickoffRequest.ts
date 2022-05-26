import { selector } from 'recoil';
import { exportUrlState } from '../atoms/exportUrl';
import { selectedMeasureState } from '../atoms/selectedMeasure';

export interface KickoffRequestData {
  body: fhir4.Parameters;
  headers: {
    [key: string]: string;
  };
}

export const kickoffRequestState = selector<KickoffRequestData | null>({
  key: 'kickoffRequestState',
  get: ({ get }) => {
    const selectedMeasure = get(selectedMeasureState);
    const exportUrl = get(exportUrlState);

    if (selectedMeasure && exportUrl.url && exportUrl.valid) {
      return buildKickoffRequest(selectedMeasure, exportUrl.url);
    } else {
      return null;
    }
  }
});

function buildKickoffRequest(selectedMeasure: { id: string; url?: string }, exportUrl: string): KickoffRequestData {
  return {
    body: {
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
    headers: {
      'Content-Type': 'application/json+fhir',
      Prefer: 'respond-async'
    }
  };
}
