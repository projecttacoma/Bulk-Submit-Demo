import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap, mockResizeObserver } from '../../helpers/testHelpers';
import KickoffHeaders from '../../../components/KickoffRequestView/KickoffHeaders';

describe('KickoffHeaders', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;

  it('renders with "No Data" message when there is no headers preview to show', () => {
    render(mantineRecoilWrap(<KickoffHeaders headers={undefined} />));
    const noDataText = screen.getByText('No Data');
    expect(noDataText).toBeInTheDocument();
  });

  it('render header info when there is header data to show', () => {
    render(mantineRecoilWrap(<KickoffHeaders headers="Content-Type: application/json+fhir" />));
    const headers = screen.getByText('Content-Type: application/json+fhir');
    expect(headers).toBeInTheDocument();
  });
});
