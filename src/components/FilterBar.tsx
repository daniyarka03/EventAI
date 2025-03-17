import React from 'react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onSortByDate: (ascending: boolean) => void;
  sortAscending: boolean | null; // Добавляем новое свойство для отслеживания выбранной сортировки
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  onSortByDate,
  sortAscending // Новое свойство
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 filter-buttons">
      <div className="mr-2 text-gray-700">Filter:</div>
      <button
        className={`px-3 py-1 rounded-full text-sm ${
          selectedCategory === null ? 'bg-purple-600 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedCategory === category ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onSelectCategory(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
      
      <div className="ml-auto flex gap-2">
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            sortAscending === true ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onSortByDate(true)}
        >
          Earliest first
        </button>
        <button
          className={`px-3 py-1 rounded-full text-sm ${
            sortAscending === false ? 'bg-purple-600 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onSortByDate(false)}
        >
          Latest first
        </button>
      </div>
    </div>
  );
};

export default FilterBar;