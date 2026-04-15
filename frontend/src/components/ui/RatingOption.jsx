import TwemojiEmoji from './Twemoji'
import { Inputs } from './Inputs'

export const RatingOption = ({ option, name, checked, onChange, label }) => {

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <Inputs
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="flex items-center gap-1">
        <TwemojiEmoji emoji={option.emoji} />
        <span>{label}</span>
      </span>
    </label>
  )
}