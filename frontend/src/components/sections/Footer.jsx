import { Link, Send } from 'lucide-react'

export const Footer = () => {

  const CURRENT_YEAR = new Date().getFullYear()

  const links = [
    { href: "", label: "Admin" },
    { href: "#", label: "Client" },
  ]

  const social = [
    { href: "#", label: "Facebook" },
    { href: "#", label: "Testing" }
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-5xl mx-auto px-5 py-9 grid gap-7 sm:grid-cols-1 md:grid-cols-3">

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold text-sm flex items-center gap-1">
            <Link size={14}/> Links
          </h3>

          <ul className="space-y-2 text-xs mt-2">
            {links.map(li => (
              <li key={li.label}>
                <a href={li.href} className="hover:text-white">
                  {li.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm flex items-center gap-1">
            <Send size={14}/> Contact
          </h3>

          <a
            href="mailto:solano@email.com"
            className="text-xs hover:text-white block mt-2"
          >
            solano@email.com
          </a>
        </div>

        {/* Social */}
        <div>
          <div className="flex gap-4 text-xs">
            {social.map(so => (
              <a
                key={so.label}
                href={so.href}
                className="flex items-center gap-1 hover:text-white"
              >
                {so.icon}
                {so.label}
              </a>
            ))}
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-slate-500 border-t border-slate-800 py-4">
        © {CURRENT_YEAR} Municipality of Solano
      </div>

      
    </footer>
  )
}