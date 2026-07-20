"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

export default function FandomSection({ collection }) {
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
    <section className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[0.42fr_0.58fr]">
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
            <p className="mb-1 text-sm font-display font-bold uppercase tracking-[0.25em]">{collection.eyebrow}</p>
            <h2 className="text-4xl font-display font-bold tracking-tight">{collection.name}</h2>
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
              <p className="mb-0 text-[0.65rem] font-display font-bold uppercase tracking-[0.25em]">{collection.eyebrow}</p>
              <h2 className="text-xl leading-none font-display font-bold tracking-tight">{collection.name}</h2>
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
            border-ink ${collection.panelClass || 'bg-paper'}
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
                  {collection.eyebrow}
                </p>
                <h2
                  className={`
                    font-display font-bold tracking-tight transition-all duration-300 ease-out
                    ${isStuck ? 'text-xl leading-none' : 'text-4xl'}
                  `}
                >
                  {collection.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`
          relative z-10 overflow-hidden border-x border-b border-ink p-6 pt-3 md:hidden
          ${collection.panelClass || 'bg-paper'}
          -mt-[25px]
          transition-all duration-300
          ${
            isStuck
              ? 'rounded-t-[1.6rem] rounded-b-[2.3rem] border-t'
              : 'rounded-t-none rounded-b-[2.3rem] border-t-0'
          }
        `}
      >
        {collection.logoUrl && (
          <Image
            src={collection.logoUrl}
            alt={`${collection.name} logo`}
            width={160}
            height={160}
            className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 object-contain opacity-10 mix-blend-luminosity grayscale"
          />
        )}
        <div className="relative z-10">
          <p className="text-lg leading-relaxed opacity-80">{collection.description}</p>
          <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
            {collection.note}
          </p>
          <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
            {collection.identity}
          </div>
        </div>
      </div>

      <div className="hidden lg:sticky lg:top-28 lg:z-auto lg:self-start md:block">
        <div
          className={`relative overflow-hidden rounded-[2.3rem] border border-ink p-6 ${
            collection.panelClass || 'bg-paper'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-current opacity-10" />
          {collection.logoUrl && (
            <Image
              src={collection.logoUrl}
              alt={`${collection.name} logo`}
              width={160}
              height={160}
              className="pointer-events-none absolute -bottom-4 -right-4 h-40 w-40 object-contain opacity-10 mix-blend-luminosity grayscale"
            />
          )}
          <div className="relative z-10">
            <p className="font-display text-sm font-bold uppercase tracking-[0.25em] opacity-50">
              {collection.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              {collection.name}
            </h2>
            <p className="mt-4 text-lg leading-relaxed opacity-80">{collection.description}</p>
            <p className="mt-6 rounded-[1.6rem] border border-ink/10 bg-paper/90 p-4 text-sm text-ink/80">
              {collection.note}
            </p>
            <div className="mt-6 rounded-[1.6rem] border border-ink/10 bg-ink px-4 py-4 text-sm text-paper/90">
              {collection.identity}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {collection.products.map((product, pIndex) => {
          const actualProduct = {
            ...product,
            color: collection.cardColor,
          };
          return <ProductCard key={actualProduct.id} product={actualProduct} index={pIndex} />;
        })}
      </div>
    </section>
  );
}
