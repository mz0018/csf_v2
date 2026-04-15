import twemoji from 'twemoji'

const TwemojiEmoji = ({ emoji, size = 14 }) => {
  const parsed = twemoji.parse(emoji, {
    folder: 'svg',
    ext: '.svg'
  })
  
  return (
    <span
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center' }}
      dangerouslySetInnerHTML={{ __html: parsed }}
    />
  )
}

export default TwemojiEmoji