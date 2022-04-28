import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../../helpers/testHelpers';
import { DataRequirementsFilters } from '../../../components/DataRequirementsView/DataRequirementsFilters';

describe('DataRequirementsFiltersTab', () => {
  it('renders No Data inside filters tab with no data', () => {
    render(mantineRecoilWrap(<DataRequirementsFilters dataRequirements={undefined} />));
    const JSONViewer = screen.getByText('No Data') as HTMLInputElement;
    expect(JSONViewer).toBeInTheDocument();
  });
});
