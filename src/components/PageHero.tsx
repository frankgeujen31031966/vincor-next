import React from 'react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  breadcrumb: Breadcrumb[];
  title: string;
  titleHighlight?: string;
  description: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  breadcrumb,
  title,
  titleHighlight,
  description,
}) => {
  const breadcrumbItems = breadcrumb.map((item, index) => {
    const isLast = index === breadcrumb.length - 1;
    return (
      <React.Fragment key={item.label}>
        {isLast ? (
          <span className="text-white">{item.label}</span>
        ) : (
          <>
            <a
              href={item.href || '#'}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              {item.label}
            </a>
            <span className="text-gray-500 mx-2">/</span>
          </>
        )}
      </React.Fragment>
    );
  });

  const titleContent = titleHighlight
    ? title.split(titleHighlight).map((part, index) =>
        index === 0 ? part : (
          <React.Fragment key={index}>
            {part}
            <span className="text-teal-400 italic font-semibold">{titleHighlight}</span>
          </React.Fragment>
        )
      )
    : title;

  return (
    <section className="page-hero bg-dark py-24 md:py-32 relative overflow-hidden">
      {/* Background pattern with radial gradient dots */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black opacity-100" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30" />

      <div className="container relative z-10 px-4 md:px-6">
        <nav className="page-hero__breadcrumb mb-6 md:mb-8" aria-label="Breadcrumb">
          {breadcrumbItems}
        </nav>

        <h1 className="page-hero__title text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
          {titleContent}
        </h1>

        <p className="page-hero__desc text-lg md:text-xl text-gray-300 max-w-[48rem]">
          {description}
        </p>
      </div>
    </section>
  );
};

export default PageHero;
