import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineRecoilWrap } from '../helpers/testHelpers';
import ExportURLInput from '../../components/ExportURLInput';

describe('ExportURLInput', () => {
  it('renders a text input field', () => {
    render(mantineRecoilWrap(<ExportURLInput />));

    const textbox = screen.getByPlaceholderText('Export URL (Data Source)') as HTMLInputElement;
    expect(textbox).toBeInTheDocument();

    fireEvent.change(textbox, { target: { value: 'http://localhost:3001/' } });
    expect(textbox.value).toBe('http://localhost:3001/');
    expect(textbox).toBeValid();
  });

  it('renders an error for an invalid URL', () => {
    render(mantineRecoilWrap(<ExportURLInput />));

    const textbox = screen.getByPlaceholderText('Export URL (Data Source)') as HTMLInputElement;
    expect(textbox).toBeInTheDocument();

    fireEvent.change(textbox, { target: { value: 'invalid' } });
    expect(textbox.value).toBe('invalid');
    expect(textbox).toBeInvalid();
  });
});