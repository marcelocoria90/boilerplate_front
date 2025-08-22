import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  AlertTriangle,
  Activity,
  Scale,
  ClipboardCheck,
  Search,
} from 'lucide-react'
import { cn } from '../../../utils/utils'

const tabs = [
  { id: 'relacion-laboral', label: 'Relación laboral', icon: Briefcase },
  { id: 'siniestros', label: 'Siniestros', icon: AlertTriangle },
  { id: 'incapacidades', label: 'Incapacidades', icon: Activity },
  { id: 'juicios', label: 'Juicios', icon: Scale },
  { id: 'examenes', label: 'Exámenes periódicos', icon: ClipboardCheck },
  { id: 'investigaciones', label: 'Investigaciones', icon: Search },
]

export const WorkerTab = () => {
  const [activeTab, setActiveTab] = useState('relacion-laboral')
  const tabListRef = useRef(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkForArrows = useCallback(() => {
    if (!tabListRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = tabListRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth)
  }, [])

  useEffect(() => {
    checkForArrows()
    window.addEventListener('resize', checkForArrows)
    return () => window.removeEventListener('resize', checkForArrows)
  }, [checkForArrows])

  const scroll = (direction) => {
    if (!tabListRef.current) return

    const scrollAmount = direction === 'left' ? -200 : 200
    tabListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })

    requestAnimationFrame(() => checkForArrows())
  }

  return (
    <div className='w-full mt-6'>
      <div className='relative'>
        {showLeftArrow && (
          <button
            className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded shadow'
            onClick={() => scroll('left')}
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
        )}
        <div ref={tabListRef} className='grid grid-flow-col auto-cols-[minmax(100px,_1fr)] w-full bg-blue-50 overflow-x-auto whitespace-nowrap scrollbar-hide rounded' onScroll={checkForArrows}>
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={cn(
                  'flex flex-col items-center gap-1 p-2 rounded flex-1 min-w-0',
                  activeTab === tab.id ? 'bg-blue-900 text-white' : 'text-muted-foreground'
                )}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon className='h-5 w-5' />
                <span className='text-sm'>{tab.label}</span> 
              </button>
            )
          })}
        </div>
        {showRightArrow && (
          <button
            className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded shadow'
            onClick={() => scroll('right')}
          >
            <ChevronRight className='h-4 w-4' />
          </button>
        )}
      </div>

      <div className='mt-4 p-6 border rounded-lg'>
        {activeTab === 'relacion-laboral' && (
          <div className='space-y-6'>
            <h2 className='text-xl font-semibold'>Razón social</h2>
            <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
              <div>
                <label className='text-sm text-muted-foreground'>CUIT</label>
                <div>30-335862f3-5</div>
              </div>
              <div>
                <label className='text-sm text-muted-foreground'>Horas trabajadas</label>
                <div>150 hs.</div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'siniestros' && <div>Contenido de Siniestros</div>}
        {activeTab === 'incapacidades' && <div>Contenido de Incapacidades</div>}
        {activeTab === 'juicios' && <div>Contenido de Juicios</div>}
        {activeTab === 'examenes' && <div>Contenido de Exámenes periódicos</div>}
        {activeTab === 'investigaciones' && <div>Contenido de Investigaciones</div>}
      </div>
    </div>
  )
}
