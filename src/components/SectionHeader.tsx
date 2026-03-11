interface SectionHeaderProps {
  label?: string
  title: string
  description?: string
  centered?: boolean
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {label && (
        <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-8 bg-teal/30"></span>
          <span className="text-sm font-semibold uppercase tracking-widest text-teal">{label}</span>
          <span className="h-px w-8 bg-teal/30"></span>
        </div>
      )}
      <h2 className="text-4xl font-bold text-dark tracking-tight">{title}</h2>
      {description && (
        <p className={`mt-4 text-gray-500 max-w-2xl text-lg ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  )
}