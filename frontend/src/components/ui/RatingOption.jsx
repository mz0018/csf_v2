import TwemojiEmoji from './Twemoji'
import { Inputs } from './Inputs'

export const RatingOption = ({ option, name, checked, onChange, value }) => {
  return (
    <label className="inline-flex items-center cursor-pointer p-2 rounded-lg">
    <Inputs
        type="radio"
        name={name}
        value={option.value}
        checked={checked}
        onChange={onChange}
        className="hidden"
    />

    <span className="flex flex-col items-center gap-2">
        <span
        className={`inline-flex p-1.5 transition-transform duration-200 ${checked ? 'scale-140 rotate-1' : 'hover:scale-120 active:scale-90'}`}
        >
        <TwemojiEmoji emoji={option.emoji} size={18} />
        </span>

        {checked && (
            <span>{value}</span>
        )}
    </span>
    </label>
  )
}