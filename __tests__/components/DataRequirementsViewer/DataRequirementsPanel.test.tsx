import { act, fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  getMockFetchImplementation,
  getMockRecoilState,
  mantineRecoilWrap,
  mockResizeObserver
} from '../../helpers/testHelpers';
import DataRequirementsPanel from '../../../components/DataRequirementsView/DataRequirementsPanel';
import { selectedMeasureState } from '../../../state/atoms/selectedMeasure';

const EXAMPLE_MEASURE_ID = 'example-measure-id';
const EXAMPLE_DATA_REQUIREMENTS: fhir4.Library = {
  resourceType: 'Library',
  type: {
    coding: [
      {
        code: 'module-definition',
        system: 'http://terminology.hl7.org/CodeSystem/library-type'
      }
    ]
  },
  status: 'unknown',
  dataRequirement: [
    {
      type: 'Coverage',
      codeFilter: [
        {
          path: 'type',
          valueSet: 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.3591'
        }
      ]
    }
  ]
};

describe('DataRequirementsPanel', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;
  beforeAll(() => {
    global.fetch = getMockFetchImplementation(EXAMPLE_DATA_REQUIREMENTS);
  });

  it('should render tab list', () => {
    render(mantineRecoilWrap(<DataRequirementsPanel />));

    const tabs = screen.getByRole('tablist');

    const JSONTab = within(tabs).getByRole('tab', { name: 'JSON' });
    expect(JSONTab).toBeInTheDocument();

    const filterTab = within(tabs).getByRole('tab', { name: 'Filters' });
    expect(filterTab).toBeInTheDocument();
  });

  it('should switch tabs on click', async () => {
    render(mantineRecoilWrap(<DataRequirementsPanel />));

    const tabs = screen.getByRole('tablist');

    const filterTab = within(tabs).getByRole('tab', { name: 'Filters' }) as HTMLButtonElement;
    const JSONTab = within(tabs).getByRole('tab', { name: 'JSON' }) as HTMLButtonElement;

    fireEvent.click(filterTab);

    expect(filterTab).toHaveAttribute('aria-selected', 'true');
    expect(JSONTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(JSONTab);

    expect(filterTab).toHaveAttribute('aria-selected', 'false');
    expect(JSONTab).toHaveAttribute('aria-selected', 'true');
  });

  it('should render data requirements when fetched', async () => {
    const HardcodedRecoilMeasureState = getMockRecoilState(selectedMeasureState, { id: EXAMPLE_MEASURE_ID });

    await act(async () => {
      render(
        mantineRecoilWrap(
          <>
            <HardcodedRecoilMeasureState />
            <DataRequirementsPanel />
          </>
        )
      );
    });

    const noDataContent = screen.queryByText(/No Data/);

    expect(noDataContent).not.toBeInTheDocument();
  });
});
