import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MoodFilter from './MoodFilter';

describe('MoodFilter Component', () => {
  it('should render the MoodFilter component', () => {
    const { getByText } = render(<MoodFilter />);
    const filterLabel = getByText('Filter by Mood:');
    expect(filterLabel).toBeInTheDocument();
  });

  it('should trigger the filter change callback on selecting a mood', () => {
    const onFilterChange = jest.fn();
    const { getByRole, getByText } = render(<MoodFilter onFilterChange={onFilterChange} />);
    
    const selectElement = getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Good 😄' } });

    // Ensure that the filter change callback is called with the selected mood
    expect(onFilterChange).toHaveBeenCalledWith('Good 😄');
  });
}); 
