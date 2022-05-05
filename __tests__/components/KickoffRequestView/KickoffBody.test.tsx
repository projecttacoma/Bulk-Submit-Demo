import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap, mockResizeObserver } from '../../helpers/testHelpers';
import KickoffBody from '../../../components/KickoffRequestView/KickoffBody';

describe('KickoffBody', () => {
  // Workaround for issues with the built-in use-resize-observer in jest
  window.ResizeObserver = mockResizeObserver;

  it('renders with "No Data" message when there is no body preview to show', async () => {
    render(mantineRecoilWrap(<KickoffBody body={undefined} />));
    const noDataText = await screen.getByText('No Data');
    expect(noDataText).toBeInTheDocument();
  });

  it('render JSON viewer when a body is provided', async () => {
    const { container } = render(mantineRecoilWrap(<KickoffBody body={{ test: 'body', params: [1, 2, 3] }} />));
    const jsonView = container.querySelector('pre.prism-code');
    expect(jsonView).toBeInTheDocument();
  });
});
