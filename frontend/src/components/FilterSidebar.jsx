import React from 'react';

const FilterSidebar = ({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  priceRange,
  setPriceRange,
  allProducts
}) => {
  const Categories = allProducts.map(p => p.category);
  const UniqueCategory = ["All", ...new Set(Categories)];

  const Brands = allProducts.map(p => p.brand);
  const UniqueBrand = ["All", ...new Set(Brands)];

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= priceRange[1]) setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= priceRange[0]) setPriceRange([priceRange[0], value]);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setBrand("All");
    setPriceRange([0, 999999]);
  };

  return (
  <div className="hidden md:block w-72 mt-10 h-max
    bg-slate-800/60 backdrop-blur-lg
    border border-slate-700
    rounded-2xl p-6 shadow-xl">

    {/* Search */}
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700
        text-white placeholder-slate-400
        p-3 rounded-lg focus:outline-none
        focus:ring-2 focus:ring-purple-600"
      />
    </div>

    {/* Category */}
    <h1 className="mt-8 font-semibold text-lg text-white">Category</h1>
    <div className="flex flex-col gap-3 mt-4">
      {UniqueCategory.map((item, index) => (
        <label
          key={index}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <input
            type="radio"
            checked={category === item}
            onChange={() => handleCategoryClick(item)}
            className="accent-purple-600"
          />
          <span className="text-slate-300 group-hover:text-white transition uppercase text-sm">
            {item}
          </span>
        </label>
      ))}
    </div>

    {/* Brand */}
    <h1 className="mt-8 font-semibold text-lg text-white">Brand</h1>
    <select
      value={brand}
      onChange={handleBrandChange}
      className="w-full mt-4 bg-slate-900 border border-slate-700
      text-white p-3 rounded-lg focus:outline-none
      focus:ring-2 focus:ring-purple-600"
    >
      {UniqueBrand.map((item, index) => (
        <option key={index} value={item}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>

    {/* Price Range */}
    <h1 className="mt-8 font-semibold text-lg text-white">Price Range</h1>
    <div className="mt-4 space-y-4">

      <p className="text-slate-400 text-sm">
        ₹{priceRange[0]} - ₹{priceRange[1]}
      </p>

      <div className="flex gap-3 items-center">
        <input
          type="number"
          value={priceRange[0]}
          onChange={handleMinChange}
          className="w-24 bg-slate-900 border border-slate-700
          text-white p-2 rounded-lg"
        />
        <span className="text-slate-400">-</span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={handleMaxChange}
          className="w-24 bg-slate-900 border border-slate-700
          text-white p-2 rounded-lg"
        />
      </div>

      {/* Sliders */}
      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        value={priceRange[0]}
        onChange={handleMinChange}
        className="w-full accent-purple-600"
      />

      <input
        type="range"
        min="0"
        max="5000"
        step="100"
        value={priceRange[1]}
        onChange={handleMaxChange}
        className="w-full accent-purple-600"
      />
    </div>

    {/* Reset */}
    <button
      onClick={resetFilters}
      className="w-full mt-8 bg-purple-600 hover:bg-purple-700
      text-white font-medium py-3 rounded-xl transition shadow-lg shadow-purple-500/10"
    >
      Reset Filters
    </button>

  </div>
);

};

export default FilterSidebar;
