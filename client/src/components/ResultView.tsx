import type { FC } from "react"

type Props = {
  result?: string
}

export const ResultView: FC<Props> = ({ result }) => {

  return (
    <div className="text-center">
      {result}
    </div>
  )
}