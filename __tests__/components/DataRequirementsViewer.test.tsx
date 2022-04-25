import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import DataRequirementsViewer from '../../components/DataRequirementsViewer';

describe('DataRequirementsViewer', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  it('renders a JSON tab', () => {
    render(mantineRecoilWrap(<DataRequirementsViewer />));
    const JSONTab = screen.getByRole('tab', { name: 'JSON' }) as HTMLInputElement;
    expect(JSONTab).toBeInTheDocument();
  });
  it('renders a Filters tab', () => {
    render(mantineRecoilWrap(<DataRequirementsViewer />));
    const FilterTab = screen.getByRole('tab', { name: 'Filters' }) as HTMLInputElement;
    expect(FilterTab).toBeInTheDocument();
  });
  it('renders content inside JSON tab', () => {
    render(mantineRecoilWrap(<DataRequirementsViewer />));
    const JSONViewer = screen.getByText('No Data') as HTMLInputElement;
    expect(JSONViewer).toBeInTheDocument();
  });
});
