type Props = {
  value: number;
}

const ProgessBar = (props: Props) => {
  return (
    <div className="w-full bg-secondary rounded-full h-2.5">
      <div className="bg-primary h-2.5 rounded-md" style={{ width: `${props.value}%` }}></div>
    </div>
  )
}

export default ProgessBar
