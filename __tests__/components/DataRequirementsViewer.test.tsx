import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import DataRequirementsViewer from '../../components/DataRequirementsViewer';

describe('ExportURLInput', () => {
  it('renders a text input field', () => {
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn()
    }));

    render(mantineRecoilWrap(<DataRequirementsViewer />));

    const JSONTab = screen.getByRole('tab', { name: 'nonsense' }) as HTMLInputElement;
    expect(JSONTab).toBeInTheDocument();
  });
});
