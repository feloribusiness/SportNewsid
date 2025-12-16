'use client';

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; icon?: string }>;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <section className="category-section">
      <div className="container">
        <h3 className="section-title">Jelajahi Kategori</h3>
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.icon && <i className={category.icon}></i>} {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}