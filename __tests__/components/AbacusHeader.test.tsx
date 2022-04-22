import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mantineWrap } from '../helpers/testHelpers';
import AbacusHeader from '../../components/AbacusHeader';

describe('AbacusHeader', () => {
  it('renders a heading with title and theme switcher', () => {
    render(mantineWrap(<AbacusHeader />));

    const heading = screen.getByRole('heading', {
      name: /Bulk Submit Data Demo/i
    });
    expect(heading).toBeInTheDocument();

    const themeSwitch = screen.getByRole('button');
    expect(themeSwitch).toBeInTheDocument();
  });
});
