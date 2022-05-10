import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../../helpers/testHelpers';
import { DataRequirementsFilters } from '../../../components/DataRequirementsView/DataRequirementsFilters';

const DATA_REQUIREMENT = [
  {
    type: 'Coverage',
    codeFilter: [
      {
        path: 'type',
        valueSet: 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.114222.4.11.3591'
      }
    ]
  }
];

describe('DataRequirementsFiltersTab', () => {
  it('renders No Data inside filters tab with no data', () => {
    render(mantineRecoilWrap(<DataRequirementsFilters dataRequirements={undefined} />));
    const JSONViewer = screen.getByText('No Data');
    expect(JSONViewer).toBeInTheDocument();
  });

  it('renders filters inside filters tab with data requirements passed in', () => {
    render(mantineRecoilWrap(<DataRequirementsFilters dataRequirements={DATA_REQUIREMENT} />));
    expect(screen.getByText('_type')).toBeInTheDocument();
    expect(screen.getByText('Coverage')).toBeInTheDocument();
    expect(screen.getByText('_typeFilter')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Coverage%3Ftype%3Ain=http%3A%2F%2Fcts.nlm.nih.gov%2Ffhir%2FValueSet%2F2.16.840.1.114222.4.11.3591'
      )
    ).toBeInTheDocument();
  });
});
