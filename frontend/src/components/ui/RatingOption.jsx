import TwemojiEmoji from './Twemoji'
import { Inputs } from './Inputs'
import { motion } from 'framer-motion'

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
        <motion.span
        animate={
            checked
            ? { scale: 1.4, rotate: 5 }
            : { scale: 1, rotate: 0 }
        }
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ display: 'inline-flex', padding: '6px' }}
        >
        <TwemojiEmoji emoji={option.emoji} size={18} />
        </motion.span>

        {checked && (
            <span>{value}</span>
        )}
    </span>
    </label>
  )
}