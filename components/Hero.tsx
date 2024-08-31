'use client'
import { cn } from '@/lib/utils';
import App from './Band';
import DotPattern from './magicui/dot-pattern';

  
export default function Hero() {

  return (
    <div className='flex items-center justify-center  h-screen'>
    
    <div 
        style={{
            flex: 1,
            textAlign: 'center',
            color: 'black',
            height: '100vh',
        }}
    >
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(650px_circle_at_center,white,transparent)]",
        )}
      />
      <App/>

    </div>
    </div>
  )
}

