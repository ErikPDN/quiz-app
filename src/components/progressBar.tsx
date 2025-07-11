type Props = {
  value: number;
}

export const ProgressBar = (props: Props) => {
  return (
    <div className="w-full bg-white/30 rounded-full h-2.5">
      <div className="bg-white h-2.5 rounded-md" style={{ width: `${props.value}%` }}></div>
    </div>
  )
}

