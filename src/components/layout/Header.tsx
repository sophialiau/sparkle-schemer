export function Header() {
  return (
    <header className="app-header">
      <a className="brand" href="/" aria-label="Sparkle Schemer home">
        <span className="wordmark-crop">
          <img src="/name.png" alt="Sparkle Schemer" />
        </span>
      </a>
      <div className="header-note">
        <span className="issue-number">No. 01</span>
        <span>Bedazzle with a plan</span>
      </div>
    </header>
  );
}

export default Header;
