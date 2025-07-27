import type { FC } from "react"

type Props = {
  error: string
}

export const Error: FC<Props> = ({ error }) => {
  return (
    <span className="text-red-700 font-semibold">
      {error}
    </span>
  )

}