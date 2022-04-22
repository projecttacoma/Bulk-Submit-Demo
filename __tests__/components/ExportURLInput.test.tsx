import { render, screen, fireEvent as fhirEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineWrap } from '../helpers/testHelpers';
import ExportURLInput from '../../components/ExportURLInput';

describe('ExportURLInput', () => {
  it('renders a text input field', () => {
    render(mantineWrap(<ExportURLInput />));

    const textbox = screen.getByPlaceholderText('Export URL (Data Source)') as HTMLInputElement;
    expect(textbox).toBeInTheDocument();

    fhirEvent.change(textbox, { target: { value: 'http://localhost:3001/' } });
    expect(textbox.value).toBe('http://localhost:3001/');
  });
});
