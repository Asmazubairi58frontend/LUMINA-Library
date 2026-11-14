import {Sun,Moon} from 'lucide-react';import {useStore} from '../context/Store';
export default function ThemeToggle(){const {theme,setTheme}=useStore();
 return <button className="ibtn mag" aria-label="Toggle theme" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button>}
