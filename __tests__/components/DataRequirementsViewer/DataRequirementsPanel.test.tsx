import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap, mockResizeObserver } from '../../helpers/testHelpers';
import DataRequirementsPanel from '../../../components/DataRequirementsView/DataRequirementsPanel';

describe('DataRequirementsPanel', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;
  it('renders a JSON tab', () => {
    render(mantineRecoilWrap(<DataRequirementsPanel />));
    const JSONTab = screen.getByRole('tab', { name: 'JSON' }) as HTMLInputElement;
    expect(JSONTab).toBeInTheDocument();
  });
  it('renders a Filters tab', () => {
    render(mantineRecoilWrap(<DataRequirementsPanel />));
    const FilterTab = screen.getByRole('tab', { name: 'Filters' }) as HTMLInputElement;
    expect(FilterTab).toBeInTheDocument();
  });
});
