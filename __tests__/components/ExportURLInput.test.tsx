import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineWrap } from '../helpers/testHelpers';
import ExportURLInput from '../../components/ExportURLInput';

describe('ExportURLInput', () => {
  it('renders a text input field', () => {
    render(mantineWrap(<ExportURLInput />));

    const textbox = screen.getByPlaceholderText('Export URL (Data Source)');
    expect(textbox).toBeInTheDocument();
  });
});
