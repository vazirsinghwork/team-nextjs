// components/Sidebar.js

import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
        <Link href="/admin/series">Series</Link>
        </li>
        <li>
          <Link href="/admin/team">Team</Link>
        </li>
        <li>
          <Link href="/admin/series_match">Series Match</Link>
        </li>
        <li>
          <Link href="/admin/players">Players</Link>
        </li> <li>
          <Link href="/admin/player_stats">Players Stats</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;