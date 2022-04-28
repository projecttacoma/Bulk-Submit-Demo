import { render, screen } from '@testing-library/react';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import DataRequirementsJSON from '../../components/DataRequirementsView/DataRequirementsJSON';

import '@testing-library/jest-dom';

describe('DataRequirementsJSON tab', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }));
  it('renders No Data inside with no data', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON isLoading={false} dataRequirements={null} error={null} />));
    const JSONViewer = screen.getByText('No Data') as HTMLInputElement;
    expect(JSONViewer).toBeInTheDocument();
  });
  it('renders spinner inside when loading', () => {
    render(mantineRecoilWrap(<DataRequirementsJSON isLoading={true} dataRequirements={null} error={null} />));
    // The spinner component has role "presentation"
    const JSONSpinner = screen.getByRole('presentation') as HTMLInputElement;
    expect(JSONSpinner).toBeInTheDocument();
  });
});
