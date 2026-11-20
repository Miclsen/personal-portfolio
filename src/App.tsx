import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { initEngine, type Engine, type View, type ViewRef, type World } from './engine';
import { Headspace, Line, Resume, Whitespace } from './components';

const GRAD = 'linear-gradient(135deg,#ffb6e0,#9be7ff,#c9b6ff)';
const CHOICES: ReadonlyArray<readonly [World, string]> = [
  ['head', 'Graphics (Headspace)'],
  ['white', 'Development (Whitespace)'],
];
const view: ViewRef = { v: 'room' };

export default function App() {
  const [scene, setScene] = useState<View>('room');
  const [dlg, setDlg] = useState(true);
  const [line, setLine] = useState('Jed here. Another long day. Where should I go tonight?');
  const [resume, setResume] = useState(false);
  const [fade, setFade] = useState<CSSProperties>({ opacity: 0 });
  const eng = useRef<Engine | null>(null);
  view.v = scene;

  useEffect(() => {
    eng.current = initEngine(
      {
        enter: (k) => {
          setFade({ background: k === 'head' ? GRAD : '#fff', opacity: 1 });
          window.setTimeout(() => {
            setScene(k);
            setFade((f) => ({ ...f, opacity: 0 }));
          }, 900);
        },
        woke: () => {
          setDlg(true);
          setLine('Back to work. Where to next?');
        },
      },
      view
    );
  }, []);

  const pick = (k: World) => {
    if (!dlg) return;
    setDlg(false);
    eng.current?.go(k);
  };
  const wake = () => {
    setFade({ background: '#1d1230', opacity: 1 });
    window.setTimeout(() => {
      setScene('room');
      setDlg(false);
      eng.current?.wake();
      setFade((f) => ({ ...f, opacity: 0 }));
    }, 850);
  };
  const hv = (k: World | null) => eng.current?.hover(k);
  const openResume = () => setResume(true);

  return (
    <>
      <main id="stage">
        <div className="top">
          <b>JED MICLSEN R. CADA</b>
          <button className="px" onClick={openResume}>Resume</button>
        </div>
        <div className="frame">
          <canvas id="cv" width={160} height={100} aria-label="Pixel art bedroom with Jed at his dual-monitor desk" />
          {dlg && (
            <div className="dlg" id="dlg">
              <p id="dtxt"><Line text={line} /></p>
              <div className="ch">
                {CHOICES.map(([k, l]) => (
                  <button
                    key={k}
                    className={'px ' + k}
                    onMouseEnter={() => hv(k)}
                    onFocus={() => hv(k)}
                    onMouseLeave={() => hv(null)}
                    onBlur={() => hv(null)}
                    onClick={() => pick(k)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <p className="hint">Pick a dream. Jed will fall asleep and take you there.</p>
      </main>
      <div id="fade" style={fade} />
      <Whitespace on={scene === 'white'} onResume={openResume} onWake={wake} />
      <Headspace on={scene === 'head'} onResume={openResume} onWake={wake} />
      {resume && <Resume onClose={() => setResume(false)} />}
    </>
  );
}
