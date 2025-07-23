type Props = {
  value: number | string | undefined
  label: string
}

export const MetricCard = (props: Props) => {
  const { value, label } = props
  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        {label}
      </p>
      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 mt-2">
        {value}
      </p>
    </div>
  )
}
