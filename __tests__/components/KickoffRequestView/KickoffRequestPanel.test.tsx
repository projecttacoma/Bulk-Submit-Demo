import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap, mockResizeObserver } from '../../helpers/testHelpers';
import KickoffRequestPanel from '../../../components/KickoffRequestView/KickoffRequestPanel';

describe('KickoffRequestPanel', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;

  it('renders a Body tab', () => {
    render(mantineRecoilWrap(<KickoffRequestPanel />));
    const BodyTab = screen.getByRole('tab', { name: 'Body' });
    expect(BodyTab).toBeInTheDocument();
  });

  it('renders a Headers tab', () => {
    render(mantineRecoilWrap(<KickoffRequestPanel />));
    const HeadersTab = screen.getByRole('tab', { name: 'Headers' });
    expect(HeadersTab).toBeInTheDocument();
  });

  it('renders a POST button and Input field that is disabled and filled', () => {
    render(mantineRecoilWrap(<KickoffRequestPanel />));

    const POSTButton = screen.getByRole('button', { name: 'POST' }) as HTMLButtonElement;
    expect(POSTButton).toBeInTheDocument();
  });
});
