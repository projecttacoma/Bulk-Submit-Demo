import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap, mockResizeObserver } from '../../helpers/testHelpers';
import DataRequirementsJSON from '../../../components/DataRequirementsView/DataRequirementsJSON';

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

const EXAMPLE_ERROR: fhir4.OperationOutcome = {
  resourceType: 'OperationOutcome',
  issue: []
};

describe('DataRequirementsJSON tab', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;

  it('should render "No Data" inside with no data', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON isLoading={false} dataRequirements={null} error={null} />));
    const JSONViewer = screen.getByText('No Data');
    expect(JSONViewer).toBeInTheDocument();
  });

  it('should render spinner inside when loading', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON isLoading={true} dataRequirements={null} error={null} />));
    // The spinner component has role "presentation"
    const JSONSpinner = screen.getByRole('presentation');
    expect(JSONSpinner).toBeInTheDocument();
  });

  it('should render data requirements content when provided', () => {
    render(
      mantineRecoilWrap(
        <DataRequirementsJSON isLoading={false} dataRequirements={EXAMPLE_DATA_REQUIREMENTS} error={null} />
      )
    );

    const jsonView = screen.getByTestId('prism-dr-content');
    expect(jsonView).toBeInTheDocument();
  });

  it('should render OperationOutcome when error is encountered', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON isLoading={false} dataRequirements={null} error={EXAMPLE_ERROR} />));

    const errorView = screen.getByTestId('prism-error-content');
    expect(errorView).toBeInTheDocument();
  });
});
