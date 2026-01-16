import React from 'react';
import { CATEGORY_META, ITEMS, getItemById } from './data';
import type { Category, HubItem } from './types';

type View =
  | { kind: 'home' }
  | { kind: 'library'; category: Category }
  | { kind: 'detail'; id: string };

export default function App() {
  const [view, setView] = React.useState<View>({ kind: 'home' });
  const [q, setQ] = React.useState('');

  const [recentIds, setRecentIds] = React.useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('gskh_recent');
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(
        'gskh_recent',
        JSON.stringify(recentIds.slice(0, 12))
      );
    } catch {
      // ignore
    }
  }, [recentIds]);

  function openCategory(category: Category) {
    setView({ kind: 'library', category });
  }

  function openItem(id: string) {
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 12));
    setView({ kind: 'detail', id });
  }

  function goHome() {
    setView({ kind: 'home' });
  }

  function goBack() {
    setView((v) => {
      if (v.kind === 'detail') {
        const item = getItemById(v.id);
        return item
          ? { kind: 'library', category: item.category }
          : { kind: 'home' };
      }
      if (v.kind === 'library') return { kind: 'home' };
      return v;
    });
  }

  const title =
    view.kind === 'home'
      ? 'Gateway Sales Knowledge Hub'
      : view.kind === 'library'
      ? CATEGORY_META.find((c) => c.key === view.category)?.title ?? 'Library'
      : getItemById(view.id)?.title ?? 'Detail';

  return (
    <div className="appShell">
      <header className="topbar">
        <div className="brand" onClick={goHome} role="button" tabIndex={0}>
          <img
            src="https://i.postimg.cc/L6DMNQVN/Sats-Logo-Colour-PANTONE-Positive-V1-Sep2024.png"
            alt="SATS"
            className="satsLogo"
          />

          <div className="brandText">
            <div className="brandName">Gateway Sales Knowledge Hub</div>
            <div className="brandSub">Internal</div>
          </div>
        </div>

        <div className="search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search playbooks, pricing, templates, objections…"
            aria-label="Search"
          />
          <button
            onClick={() => {
              // If user searches from Home, move them to Playbooks library (works as a global entry)
              if (view.kind === 'home')
                setView({ kind: 'library', category: 'playbooks' });
            }}
          >
            Search
          </button>
        </div>

        <div className="topActions">
          <button
            className="ghostBtn"
            onClick={() => alert('Placeholder: notifications')}
          >
            🔔
          </button>
          <button
            className="pill"
            onClick={() => alert('Placeholder: profile')}
          >
            TL
          </button>
        </div>
      </header>

      <div className="body">
        <aside className="sidebar">
          <div className="sideTitle">Browse</div>
          <nav className="sideNav">
            <button
              className={'navItem ' + (view.kind === 'home' ? 'active' : '')}
              onClick={goHome}
            >
              <span className="navIcon">🏠</span>
              <span className="navText">Home</span>
            </button>

            {CATEGORY_META.map((c) => (
              <button
                key={c.key}
                className={
                  'navItem ' +
                  (view.kind === 'library' && view.category === c.key
                    ? 'active'
                    : '')
                }
                onClick={() => openCategory(c.key)}
              >
                <span className="navIcon">{c.icon}</span>
                <span className="navText">{c.title}</span>
              </button>
            ))}
          </nav>

          <div className="sideBlock">
            <div className="sideTitle">Quick actions</div>
            <button
              className="linkBtn"
              onClick={() => alert('Placeholder: request content workflow')}
            >
              ➕ Request content
            </button>
            <button
              className="linkBtn"
              onClick={() => alert('Placeholder: report issue')}
            >
              🛠 Report issue
            </button>
          </div>
        </aside>

        <main className="main">
          <div className="pageHeader rowBetween">
            <div>
              <div className="crumbs">{title}</div>
              <h1 className="h1">{title}</h1>
              <p className="muted">
                One source of truth for playbooks, pricing, templates, case
                studies, objections, and competitive intel.
              </p>
            </div>

            {view.kind !== 'home' && (
              <button className="ghostBtn" onClick={goBack}>
                ← Back
              </button>
            )}
          </div>

          {view.kind === 'home' && (
            <HomeView
              q={q}
              recentIds={recentIds}
              onOpenCategory={openCategory}
              onOpenItem={openItem}
            />
          )}

          {view.kind === 'library' && (
            <LibraryView category={view.category} q={q} onOpenItem={openItem} />
          )}

          {view.kind === 'detail' && (
            <DetailView
              id={view.id}
              onOpenCategory={openCategory}
              onOpenItem={openItem}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function HomeView(props: {
  q: string;
  recentIds: string[];
  onOpenCategory: (c: Category) => void;
  onOpenItem: (id: string) => void;
}) {
  const whatsNew = [...ITEMS]
    .sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated))
    .slice(0, 5);
  const recentlyUsed: HubItem[] = props.recentIds
    .map((id) => getItemById(id))
    .filter(Boolean) as HubItem[];

  // If user types in search on Home, show quick search results panel
  const q = props.q.trim().toLowerCase();
  const quickResults =
    q.length === 0
      ? []
      : ITEMS.filter((i) =>
          [i.title, i.summary, i.tags.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(q)
        ).slice(0, 6);

  return (
    <div className="page">
      <section className="grid">
        {CATEGORY_META.map((c) => (
          <button
            key={c.key}
            className="card categoryCard"
            onClick={() => props.onOpenCategory(c.key)}
          >
            <div className="cardIcon">{c.icon}</div>
            <div className="cardBody">
              <div className="cardTitle">{c.title}</div>
              <div className="cardDesc">{c.desc}</div>
            </div>
            <div className="cardArrow">→</div>
          </button>
        ))}
      </section>

      {quickResults.length > 0 && (
        <section className="panel">
          <div className="panelHead">
            <h2>Quick results</h2>
            <span className="pillSmall">Top matches</span>
          </div>
          <div className="panelBody">
            {quickResults.map((i) => (
              <ItemRow
                key={i.id}
                item={i}
                onOpen={() => props.onOpenItem(i.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="twoCol">
        <div className="panel">
          <div className="panelHead">
            <h2>Recently used</h2>
            <span className="pillSmall">Fast access</span>
          </div>
          <div className="panelBody">
            {recentlyUsed.length === 0 ? (
              <div className="empty">
                <div className="emptyTitle">Nothing yet</div>
                <div className="muted">
                  Open any item and it will appear here.
                </div>
              </div>
            ) : (
              recentlyUsed
                .slice(0, 5)
                .map((i) => (
                  <ItemRow
                    key={i.id}
                    item={i}
                    onOpen={() => props.onOpenItem(i.id)}
                  />
                ))
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panelHead">
            <h2>What’s new</h2>
            <span className="pillSmall">Latest updates</span>
          </div>
          <div className="panelBody">
            {whatsNew.map((i) => (
              <ItemRow
                key={i.id}
                item={i}
                onOpen={() => props.onOpenItem(i.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LibraryView(props: {
  category: Category;
  q: string;
  onOpenItem: (id: string) => void;
}) {
  const meta = CATEGORY_META.find((c) => c.key === props.category);

  const allInCategory = ITEMS.filter((x) => x.category === props.category);

  const tags = React.useMemo(() => {
    const s = new Set<string>();
    allInCategory.forEach((i) => i.tags.forEach((t) => s.add(t)));
    return ['All', ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [allInCategory]);

  const markets = React.useMemo(() => {
    const s = new Set<string>();
    allInCategory.forEach((i) => (i.market ?? []).forEach((m) => s.add(m)));
    return ['All', ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [allInCategory]);

  const audiences = React.useMemo(() => {
    const s = new Set<string>();
    allInCategory.forEach((i) => (i.audience ?? []).forEach((a) => s.add(a)));
    return ['All', ...Array.from(s).sort((a, b) => a.localeCompare(b))];
  }, [allInCategory]);

  const [tagFilter, setTagFilter] = React.useState('All');
  const [marketFilter, setMarketFilter] = React.useState('All');
  const [audienceFilter, setAudienceFilter] = React.useState('All');

  const q = props.q.trim().toLowerCase();

  const filtered = allInCategory.filter((i) => {
    const matchesQ =
      !q ||
      [i.title, i.summary, i.tags.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q);

    const matchesTag = tagFilter === 'All' || i.tags.includes(tagFilter);
    const matchesMarket =
      marketFilter === 'All' || (i.market ?? []).includes(marketFilter);
    const matchesAudience =
      audienceFilter === 'All' || (i.audience ?? []).includes(audienceFilter);

    return matchesQ && matchesTag && matchesMarket && matchesAudience;
  });

  return (
    <div className="page">
      <section className="panel subtle">
        <div className="panelBody">
          <div className="rowBetween">
            <div>
              <div className="panelHeadInline">
                {meta?.icon} {meta?.title}
              </div>
              <div className="muted">{meta?.desc}</div>
            </div>
            <div className="kpi">
              <div className="kpiNum">{filtered.length}</div>
              <div className="kpiLabel">items</div>
            </div>
          </div>

          <div className="filters">
            <div className="filter">
              <label>Tag</label>
              <select
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
              >
                {tags.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter">
              <label>Market</label>
              <select
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
              >
                {markets.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter">
              <label>Audience</label>
              <select
                value={audienceFilter}
                onChange={(e) => setAudienceFilter(e.target.value)}
              >
                {audiences.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panelBody">
          {filtered.length === 0 ? (
            <div className="empty">
              <div className="emptyTitle">No matches</div>
              <div className="muted">
                Try different filters or broaden your search terms.
              </div>
            </div>
          ) : (
            filtered.map((i) => (
              <ItemRow
                key={i.id}
                item={i}
                onOpen={() => props.onOpenItem(i.id)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function DetailView(props: {
  id: string;
  onOpenCategory: (c: Category) => void;
  onOpenItem: (id: string) => void;
}) {
  const item = getItemById(props.id);

  if (!item) {
    return (
      <div className="panel">
        <div className="panelBody">
          <div className="empty">
            <div className="emptyTitle">Not found</div>
            <div className="muted">This content item doesn’t exist.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="panel">
        <div className="panelBody">
          <div className="detailHead">
            <div>
              <h2 style={{ marginBottom: 6 }}>{item.title}</h2>
              <p className="muted">{item.summary}</p>

              <div className="metaRow">
                <span className="pillSmall">Owner: {item.owner}</span>
                <span className="pillSmall">Updated: {item.lastUpdated}</span>
                <span className="pillSmall">{item.type}</span>
                <button
                  className="pillSmall pillLink"
                  onClick={() => props.onOpenCategory(item.category)}
                >
                  View all in {item.category} →
                </button>
              </div>

              <div className="tagWrap">
                {item.tags.map((t) => (
                  <span className="tag" key={t}>
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="detailActions">
              <button
                className="primaryBtn"
                onClick={() => alert('Placeholder: request update workflow')}
              >
                Request update
              </button>
              <button
                className="ghostBtn"
                onClick={() => alert('Placeholder: mark as useful')}
              >
                👍 Useful
              </button>
            </div>
          </div>

          {item.content.sections.map((s) => (
            <div key={s.heading} className="section">
              <h3 className="h3">{s.heading}</h3>
              <p>{s.body}</p>
            </div>
          ))}

          {item.content.links && item.content.links.length > 0 && (
            <div className="section">
              <h3 className="h3">Related</h3>
              <div className="related">
                {item.content.links.map((l) => (
                  <button
                    key={l.to}
                    className="relatedLink"
                    onClick={() => props.onOpenCategory(l.to.category)}
                    title={l.to.label}
                  >
                    {l.to.label} →
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.content.downloads && item.content.downloads.length > 0 && (
            <div className="section">
              <h3 className="h3">Downloads</h3>
              <div className="downloads">
                {item.content.downloads.map((d) => (
                  <button
                    key={d.filename}
                    className="downloadBtn"
                    onClick={() => alert(`Placeholder download: ${d.filename}`)}
                  >
                    ⬇ {d.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="panel subtle">
        <div className="panelBody">
          <div className="rowBetween">
            <div>
              <div className="panelHeadInline">Governance (placeholder)</div>
              <div className="muted">
                Add version history, approvals, and role-based access here when
                wiring to your backend.
              </div>
            </div>
            <button
              className="linkBtn"
              onClick={() => alert('Placeholder: view version history')}
            >
              View history →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ItemRow({ item, onOpen }: { item: HubItem; onOpen: () => void }) {
  return (
    <button className="row" onClick={onOpen}>
      <div className="rowMain">
        <div className="rowTop">
          <span className="badge">{badgeLabel(item.type)}</span>
          <span className="rowTitle">{item.title}</span>
        </div>
        <div className="rowSummary">{item.summary}</div>
        <div className="rowMeta">
          <span>Owner: {item.owner}</span>
          <span>Updated: {item.lastUpdated}</span>
          <span className="tagLine">
            {item.tags.map((t) => `#${t}`).join(' ')}
          </span>
        </div>
      </div>
      <div className="rowChevron">›</div>
    </button>
  );
}

function badgeLabel(type: HubItem['type']) {
  switch (type) {
    case 'template':
      return 'Template';
    case 'battlecard':
      return 'Battlecard';
    case 'card':
      return 'Card';
    case 'case':
      return 'Case study';
    case 'guide':
      return 'Guide';
    default:
      return 'Doc';
    case 'intelligence-report':
      return 'Intelligence Report';
  }
}
