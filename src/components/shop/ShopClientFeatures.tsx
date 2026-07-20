// @ts-nocheck
"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/utils';

export default function ShopClientFeatures({ initialCategories }) {
  const { recentlyViewed, wishlistItems } = useCart();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [materialFilter, setMaterialFilter] = useState('all');
  const [dropFilter, setDropFilter] = useState('all');

  const filteredCategories = useMemo(() => {
    if (!initialCategories || initialCategories.length === 0) return [];
    
    const searched = initialCategories
      .map((category) => ({
        ...category,
        products: category.products
          .filter((product) => {
            const matchesSearch =
              !search ||
              `${product.name} ${product.description} ${product.categoryName}`
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchesMaterial =
              materialFilter === 'all' ||
              product.materialOptions.some((material) =>
                material.toLowerCase().includes(materialFilter.toLowerCase()),
              );
            const matchesDrop =
              dropFilter === 'all' ||
              (dropFilter === 'limited' ? product.limitedDrop : !product.limitedDrop);

            return matchesSearch && matchesMaterial && matchesDrop;
          })
          .sort((left, right) => {
            if (sort === 'price-low') return left.price - right.price;
            if (sort === 'price-high') return right.price - left.price;
            if (sort === 'name') return left.name.localeCompare(right.name);
            if (sort === 'newest') return new Date(right.releaseDate) - new Date(left.releaseDate);
            return 0;
          }),
      }))
      .filter((category) => category.products.length > 0);

    return searched;
  }, [dropFilter, materialFilter, search, sort, initialCategories]);

  return (
    <>
      <div className="max-w-3xl">
        <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-ink/45">
          Shop the stash
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          Weirdly useful objects for neat freaks and little chaos goblins.
        </h1>
        <p className="mt-5 text-lg text-ink/70">
          Every section now works like an actual category shelf, with singular products sitting
          inside the family they belong to instead of one giant wall of vibes.
        </p>
      </div>

      <section className="mt-10 grid gap-6 rounded-[2.5rem] border border-ink/15 bg-white/60 p-6 shadow-card lg:grid-cols-[1.1fr_0.9fr_0.7fr_0.7fr]">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-ink/60">Search</span>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink/40" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, moods, categories..."
              className="w-full rounded-full border border-ink/15 bg-paper pl-12 pr-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </label>

        <SelectField
          label="Sort"
          value={sort}
          onChange={setSort}
          options={[
            ['featured', 'Featured'],
            ['newest', 'Newest drops'],
            ['price-low', 'Price: low to high'],
            ['price-high', 'Price: high to low'],
            ['name', 'Alphabetical'],
          ]}
        />

        <SelectField
          label="Material"
          value={materialFilter}
          onChange={setMaterialFilter}
          options={[
            ['all', 'All materials'],
            ['pla', 'PLA family'],
            ['petg', 'PETG'],
            ['cement', 'Cement'],
            ['resin', 'Resin / composite'],
          ]}
        />

        <SelectField
          label="Drops"
          value={dropFilter}
          onChange={setDropFilter}
          options={[
            ['all', 'Everything'],
            ['limited', 'Limited drops'],
            ['core', 'Core catalog'],
          ]}
        />
      </section>

      {wishlistItems.length > 0 ? (
        <section className="mt-10 rounded-[2.5rem] border border-ink/15 bg-[#fff6f8] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
                Saved picks
              </p>
              <p className="mt-2 text-lg text-ink/70">Your wishlist is quietly building taste.</p>
            </div>
            <Link href="/wishlist" className="rounded-full border border-ink px-5 py-3 text-sm font-medium">
              Open wishlist
            </Link>
          </div>
        </section>
      ) : null}

      <div className="mt-12 space-y-12">
        {filteredCategories.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-ink/25 bg-white/50 p-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink/5">
              <Search className="h-6 w-6 text-ink/40" />
            </div>
            <p className="mt-5 font-display text-2xl font-bold">Nothing matches your search</p>
            <p className="mt-3 max-w-sm text-lg text-ink/60">Try adjusting your filters, or search for something a little less obscure.</p>
            <button
              type="button"
              onClick={() => { setSearch(''); setMaterialFilter('all'); setDropFilter('all'); }}
              className="mt-8 rounded-full border border-ink px-6 py-3 font-medium transition hover:bg-ink hover:text-paper"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <ShopCategorySection key={category.id} category={category} />
          ))
        )}
      </div>

      {recentlyViewed.length > 0 ? (
        <section className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
                Recently viewed
              </p>
              <p className="mt-2 text-lg text-ink/70">The objects that already got your attention.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {recentlyViewed.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-14 rounded-[2.5rem] border border-ink/15 bg-[#edf4ff] p-8">
        <p className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink/45">
          Comparison mode
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {filteredCategories.flatMap((category) => category.products).slice(0, 4).map((product) => (
            <div key={product.id} className="rounded-[1.8rem] border border-ink/10 bg-white/75 p-4">
              <p className="font-display text-xl font-bold">{product.name}</p>
              <p className="mt-2 text-sm text-ink/55">{product.dimensions}</p>
              <p className="mt-2 text-sm text-ink/55">{product.materials.join(' · ')}</p>
              <p className="mt-3 font-medium">{formatPrice(product.price)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function SelectField({ label, onChange, options, value }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-ink/60">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-full border border-ink/15 bg-paper px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function ShopCategorySection({ category }) {
  const sentinelRef = useRef(null);
  const [navHeight, setNavHeight] = useState(76);
  const [isStuck, setIsStuck] = useState(false);
  const pillOffset = 16;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    if (!mq.matches) return;

    const navbar = document.getElementById('global-navbar');
    const updateNavHeight = () => {
      if (navbar && navbar.offsetHeight !== navHeight) {
        setNavHeight(navbar.offsetHeight);
      }
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      {
        rootMargin: `-${navHeight + pillOffset}px 0px 0px 0px`,
        threshold: 0,
      }
    );
    observer.observe(sentinel);

    return () => {
      window.removeEventListener('resize', updateNavHeight);
      observer.disconnect();
    };
  }, [navHeight]);

  return (
    <section id={category.id} className="relative flex flex-col gap-6 scroll-mt-28 lg:grid lg:grid-cols-[0.42fr_0.58fr]">
      <div
        ref={sentinelRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 h-px w-full md:hidden"
      />

      <div
        style={{ top: navHeight + pillOffset }}
        className="sticky z-30 md:hidden"
      >
        <div className="relative flex items-start pt-6 px-6 pb-2 invisible pointer-events-none" aria-hidden="true">
          <div className="mt-5 mr-0 w-0 flex-shrink-0">
            <span className="inline-block h-2 w-2" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-sm font-display font-bold uppercase tracking-[0.25em]">{category.eyebrow}</p>
            <h2 className="text-4xl font-display font-bold tracking-tight">{category.name}</h2>
          </div>
        </div>

        <div className={`
          absolute top-0 left-0 right-0 z-10 pointer-events-none
          ${isStuck ? 'bottom-auto' : 'bottom-0'}
        `}>
          <div className={`
            invisible flex items-start pt-6 px-6 pb-4
            ${isStuck ? 'block' : 'hidden'}
          `} aria-hidden="true">
            <div className="mt-1 mr-3 w-3 flex-shrink-0">
              <span className="inline-block h-2 w-2" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-0 text-[0.65rem] font-display font-bold uppercase tracking-[0.25em]">{category.eyebrow}</p>
              <h2 className="text-xl leading-none font-display font-bold tracking-tight">{category.name}</h2>
            </div>
          </div>

          <div 
            className={`
              absolute -top-[10px] -left-[10px] -right-[10px] -bottom-[10px] transition-opacity duration-300 ease-out
              backdrop-blur-md
              ${isStuck 
                ? 'opacity-100 rounded-[calc(1.6rem+10px)]' 
                : 'opacity-0 rounded-t-[calc(2.3rem+10px)] rounded-b-none'
              }
            `}
            style={{
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%), linear-gradient(to right, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)',
              WebkitMaskComposite: 'source-in',
              maskImage: 'linear-gradient(to bottom, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%), linear-gradient(to right, transparent 0px, black 10px, black calc(100% - 10px), transparent 100%)',
              maskComposite: 'intersect'
            }}
          />

          <div className={`
            absolute inset-0 pointer-events-auto
            border-ink/15 ${category.panelClass || 'bg-paper'}
            ${
              isStuck
                ? 'rounded-[1.6rem] shadow-[0_8px_32px_rgba(28,28,26,0.12)] border'
                : 'rounded-t-[2.3rem] border-x border-t border-b-0'
            }
          `}>
            <div className="absolute inset-0 z-10 flex items-start pt-6 px-6 pointer-events-none">
              <div
                className={`
                  flex items-center justify-center overflow-hidden transition-all duration-300 ease-out flex-shrink-0
                  ${isStuck ? 'mt-1 mr-3 w-3 opacity-40' : 'mt-4 mr-0 w-0 opacity-0'}
                `}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-current" />
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className={`
                    font-display font-bold uppercase tracking-[0.25em] transition-all duration-300 ease-out
                    ${isStuck ? 'mb-0 text-[0.65rem] opacity-70' : 'mb-1 text-sm opacity-50'}
                  `}
                >
                  {category.eyebrow}
                </p>
                <h2
                  className={`
                    font-display font-bold tracking-tight transition-all duration-300 ease-out
                    ${isStuck ? 'text-xl leading-none' : 'text-4xl'}
                  `}
                >
                  {category.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          relative z-10 overflow-hidden border-x border-b border-ink/15 p-6 pt-3 md:hidden
          ${category.panelClass || 'bg-paper'}
          -mt-[25px]
          transition-all duration-300
          ${
            isStuck
              ? 'rounded-t-[1.6rem] rounded-b-[2.3rem] border-t'
              : 'rounded-t-none rounded-b-[2.3rem] border-t-0'
          }
        `}
      >
        <div className="relative z-10">
          <p className="text-lg leading-relaxed opacity-80">{category.description}</p>
          <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
            {category.note}
          </p>
          <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
            {category.identity}
          </div>
        </div>
      </div>

      <div className="hidden lg:sticky lg:top-28 lg:z-auto lg:self-start md:block">
        <div
          className={`relative overflow-hidden rounded-[2.3rem] border border-ink/15 p-6 ${
            category.panelClass || 'bg-paper'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-10" />

          <div className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] opacity-50">
              {category.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {category.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">{category.description}</p>
            <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
              {category.note}
            </p>
            <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
              {category.identity}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {category.products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
