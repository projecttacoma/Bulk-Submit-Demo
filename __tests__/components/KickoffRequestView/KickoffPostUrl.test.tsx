import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../../helpers/testHelpers';
import KickoffPostUrl from '../../../components/KickoffRequestView/KickoffPostUrl';

describe('KickoffPostUrl', () => {
  it('renders a POST button and Input field that is disabled and filled', () => {
    render(mantineRecoilWrap(<KickoffPostUrl />));

    const postButton = screen.getByRole('button', { name: 'POST' }) as HTMLButtonElement;
    expect(postButton).toBeInTheDocument();

    const urlInput = screen.getByRole('textbox') as HTMLInputElement;
    expect(urlInput).toBeInTheDocument();
    expect(urlInput).toBeDisabled();
    expect(urlInput).toHaveValue('http://example.com/fhir-base-url/Measure/$submit-data');
  });
});
