export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        AC<span>.</span>
      </div>
      <ul className="nav-links">
        <li><a href="#work" data-text="Work">Work</a></li>
        <li><a href="#about" data-text="About">About</a></li>
        <li><a href="#skills" data-text="Skills">Skills</a></li>
        <li><a href="#contact" data-text="Contact">Contact</a></li>
      </ul>
      <div className="nav-cta">Available '26</div>
    </nav>
  )
}
