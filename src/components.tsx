import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';

export type Tab = 'vid' | 'pho' | 'gfx';

export function Line({ text }: { text: string }) {
  const [s, setS] = useState('');
  useEffect(() => {
    let i = 0;
    setS('');
    const id = window.setInterval(() => {
      i += 1;
      setS(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, 35);
    return () => window.clearInterval(id);
  }, [text]);
  return <>{s}</>;
}

export function Resume({ onClose }: { onClose: () => void }) {
  return createPortal(
    <div id="resume" className="on">
      <div className="paper">
        <div className="rb" style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <button className="px" onClick={() => window.print()}>Print / Save as PDF</button>
          <button className="px" onClick={onClose}>Close</button>
        </div>
        <h1>Jed Miclsen R. Cada</h1>
        <p>Developer &amp; Visual Creator | your@email.com | +63 000 000 0000 | City, Philippines</p>
        <h2>Summary</h2>
        <p>Placeholder: a two-sentence summary of your background, strengths and goals.</p>
        <h2>Skills</h2>
        <p>Development: HTML, CSS, JavaScript, React, TypeScript. Creative: Premiere Pro, Photoshop, After Effects.</p>
        <h2>Experience</h2>
        <p><b>Job Title</b>, Company (Year to Year)</p>
        <ul><li>Placeholder achievement</li><li>Placeholder achievement</li></ul>
        <h2>Projects</h2>
        <p><b>Project Name</b>: one-line description and link.</p>
        <h2>Education</h2>
        <p>Degree, School (Year to Year)</p>
      </div>
    </div>,
    document.body
  );
}

interface BarProps { title: string; onResume: () => void; onWake: () => void }
const Bar = ({ title, onResume, onWake }: BarProps) => (
  <div className="bar">
    <h1>{title}</h1>
    <div>
      <button className="px" onClick={onResume}>Resume</button>{' '}
      <button className="px" onClick={onWake}>Wake up</button>
    </div>
  </div>
);

const Contact = ({ text }: { text: string }) => (
  <div>
    <h2>Contact</h2>
    <div className="box"><p style={{ margin: 0 }}>{text}</p></div>
  </div>
);

function BeforeAfter({ i }: { i: number }) {
  const move = (e: FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget;
    el.parentElement?.style.setProperty('--p', `${el.value}%`);
  };
  return (
    <div className="box">
      <div className="ba">
        <div className="b a1">BEFORE</div>
        <div className="b a2">AFTER</div>
        <input type="range" min={0} max={100} defaultValue={50} aria-label="Before and after slider" onInput={move} />
      </div>
      <b>Photo Edit {i}</b>
    </div>
  );
}

interface WorldProps { on: boolean; onResume: () => void; onWake: () => void }
const cls = (on: boolean) => 'world' + (on ? ' on' : '');

const TAGS = ['React', 'TypeScript', 'CSS'];
const SKILLS = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Git', 'VS Code'];

export function Whitespace({ on, onResume, onWake }: WorldProps) {
  return (
    <section id="white" className={cls(on)}>
      <canvas id="wc" aria-hidden="true" />
      <div className="in">
        <Bar title="Whitespace" onResume={onResume} onWake={onWake} />
        <div style={{ height: '68vh', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <span className="px" style={{ boxShadow: 'none', borderWidth: 2, fontSize: 8 }}>Scroll down for projects</span>
        </div>
        <div className="box">
          <p style={{ margin: 0, fontSize: 26 }}>Hi, I’m Jed. I build clean, quiet, working things for the web. These are the projects I’m proudest of.</p>
        </div>
        <h2>Projects</h2>
        <div className="grid">
          {[1, 2, 3, 4].map((i) => (
            <div className="box" key={i}>
              <div className="shot">Screenshot {i}</div>
              <h3 style={{ fontSize: 11, margin: '0 0 8px' }}>Project Name {i}</h3>
              <p style={{ margin: '0 0 8px' }}>Short description of what this project does and why it matters.</p>
              <div>{TAGS.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
              <a className="px lnk" href="#">Live demo</a>
              <a className="px lnk" href="#">GitHub</a>
            </div>
          ))}
        </div>
        <h2>Inventory</h2>
        <div className="inv">{SKILLS.map((s) => <div key={s}><i />{s}</div>)}</div>
        <Contact text="Email: your@email.com | GitHub: github.com/your-username | LinkedIn: linkedin.com/in/your-name" />
      </div>
    </section>
  );
}

const TABS: ReadonlyArray<readonly [Tab, string]> = [['vid', 'Videos'], ['pho', 'Photo edits'], ['gfx', 'Graphics']];
const GFX = ['#ffb6e0', '#9be7ff', '#c9b6ff', '#fff2a8'];

export function Headspace({ on, onResume, onWake }: WorldProps) {
  const [tab, setTab] = useState<Tab>('vid');
  const pan = (k: Tab) => 'grid pan' + (tab === k ? ' on' : '');
  return (
    <section id="head" className={cls(on)}>
      <canvas id="hc" aria-hidden="true" />
      <div className="in">
        <Bar title="Headspace" onResume={onResume} onWake={onWake} />
        <div className="tabs">
          {TABS.map(([k, l]) => (
            <button key={k} className={'px' + (tab === k ? ' on' : '')} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>
        <div className={pan('vid')}>
          {[1, 2, 3].map((i) => (
            <div className="box" key={i}><div className="vid">YouTube video {i}</div><b>Video Title {i}</b></div>
          ))}
        </div>
        <div className={pan('pho')}>{[1, 2].map((i) => <BeforeAfter key={i} i={i} />)}</div>
        <div className={pan('gfx')}>
          {GFX.map((c, i) => (
            <div className="box" key={c}><div className="gt" style={{ background: c }}>Graphic {i + 1}</div></div>
          ))}
        </div>
        <Contact text="Email: your@email.com | YouTube: youtube.com/@your-channel | Behance: behance.net/your-name" />
      </div>
    </section>
  );
}
