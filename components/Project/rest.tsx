import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectExperienceViewer, { ProjectConfig } from '../ProjectViewer/ProjectExperienceViewer';

export default function PortfolioClone() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerConfig, setViewerConfig] = useState<ProjectConfig | null>(null);

  const openViewer = (config: ProjectConfig) => {
    setViewerConfig(config);
    setViewerOpen(true);
  };
  const closeViewer = () => setViewerOpen(false);

  type ProjectItem = ProjectConfig & {
    id: number;
    tags: string[];
    year: string;
    company: string;
    number: string;
    description: string;
    link?: string;
  };

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'Systems software engineer — Infinera / ThanOS platform',
      description: 'Building the platform software behind the GX chassis family across zero-touch provisioning, file transfer, simulation, and the surrounding test infrastructure. Work spans C++ and Python at the Linux/VRF network boundary, with gRPC, systemd, DBF/DBI, OSPF, and Jenkins CI all in the loop.',
      tags: ['Infinera', 'ThanOS', 'C++', 'Python'],
      year: '2024–2026',
      company: 'Infinera',
      number: '01',
      mode: 'carousel',
      previewUrl: 'https://example.com/fts',
      slides: [
        { type: 'preview', content: '' },
        { type: 'text', content: 'ThanOS platform work across provisioning and integration.' }
      ]
    },
    {
      id: 2,
      title: 'Zero-touch provisioning — self-provisioning remote nodes',
      description: 'Delivered ZTP flows that let factory-reset nodes discover and apply target configs over the management path, and extended the same model to ZTP-over-OSC for SNE nodes without a direct management link. The work touched DHCP, OSPF, VRF-scoped Linux networking, and gRPC-based provisioning paths.',
      tags: ['ZTP', 'gRPC', 'VRF', 'OSPF'],
      year: '2024–2026',
      company: 'ZTP',
      number: '02',
      mode: 'floating',
      previewUrl: 'https://example.com/ztp',
      slides: [
        { type: 'preview', content: '' },
        { type: 'text', content: 'Remote provisioning and ZTP-over-OSC.' }
      ]
    },
    {
      id: 3,
      title: 'File-transfer service — reliability and progress visibility',
      description: 'Improved the FTS transfer path with a 5%/5s throttled progress coalescer, reducing DB callback churn while preserving meaningful transfer updates for large image and config moves. The change materially improved diagnostics and reduced the noise around rollout and upgrade operations.',
      tags: ['FTS', 'C++', 'DBI', 'Reliability'],
      year: '2025–2026',
      company: 'FTS',
      number: '03',
      mode: 'stack',
      previewUrl: 'https://example.com/ztp-osc',
      slides: [
        { type: 'preview', content: '' },
        { type: 'text', content: 'Transfer throttling and progress reporting.' }
      ]
    },
    {
      id: 4,
      title: 'AI-assisted test infrastructure — coverage and regression trust',
      description: 'Scaffolded a large unit-test suite for ZTP with AI-DLC and helped build the CTC/coverage path that made the work measurable. The result was a practical uplift from near-zero coverage to a real regression harness that supported nightly and release validation.',
      tags: ['AI-DLC', 'CTC', 'Unit tests', 'CI'],
      year: '2025–2026',
      company: 'Infinera',
      number: '04',
      mode: 'holo',
      previewUrl: 'https://example.com/escalations',
      slides: [
        { type: 'preview', content: '' },
        { type: 'text', content: 'Coverage and automation progression.' }
      ]
    }
  ];

  // Cube component with various animation patterns
  const Cube = ({ variant = 'default', label = '', className = '' }) => {
    return (
      <div className={`relative bg-[#151515] border border-[#2a2a2a] rounded-lg overflow-hidden ${className}`}>
        {variant === 'grid-9' && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`rounded-sm ${i === 7 ? 'bg-[#ff3b3b] animate-pulse' : 'bg-[#1f1f1f]'}`}
              />
            ))}
          </div>
        )}
        
        {variant === 'circles-7' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#3a3a3a] rounded-full"
                style={{
                  left: `${20 + i * 10}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: `wave ${2 + i * 0.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
        
        {variant === 'rectangles' && (
          <div className="absolute inset-0 flex items-center justify-center gap-1 p-2">
            <div className="w-4 h-6 border-2 border-[#2a2a2a] rounded" />
            <div className="w-4 h-6 border-2 border-[#2a2a2a] rounded" />
            <div className="w-3 h-3 bg-[#ff3b3b] rounded-sm animate-pulse" />
          </div>
        )}

        {variant === 'dots-17' && (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1">
            {[...Array(17)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full ${i === 8 ? 'bg-[#ff3b3b] animate-rotate' : 'bg-[#2a2a2a]'}`}
                style={{
                  width: '6px',
                  height: '6px',
                  margin: 'auto'
                }}
              />
            ))}
          </div>
        )}
        
        {label && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-mono text-[#8a8784]">{label}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-fit bg-[#111111] bg-none font-sans overflow-x-hidden text-[#e6e4df]">
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(0.95); }
        }
        @keyframes wave {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-3px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-rotate { animation: rotate 3s linear infinite; }
        .animate-float { animation: float 2s ease-in-out infinite; }
      `}</style>

      {/* Main Grid Layout - Now Horizontal */}
      <main className="w-full px-4 py-4">
        {/* Top Decorative Row */}
        {/* <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" label="[Product]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" label="[Figma]" />
          <Cube className="h-[100px]" />
        </div> */}

        {/* Second Decorative Row */}
                <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
                  <Cube className="h-[100px]" />
                  <Cube variant="grid-9" className="h-[100px]" />
                  <div className="grid grid-cols-7 gap-[2px]">
                    <Cube className="h-[100px]" />
                    <Cube className="h-[100px]" label="[Framer]" />
                    <Cube variant="circles-7" className="h-[100px]" />
                    <Cube className="h-[100px]" />
                    <Cube className="h-[100px]" />
                    <Cube className="h-[100px]" />
                    <Cube variant="rectangles" className="h-[100px]" />
                  </div>
                  <Cube className="h-[100px]" />
                  <Cube variant="dots-17" className="h-[100px]" />
                </div>

        

        {/* Hero Section with Side Cubes */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[300px]" />
          <Cube className="h-[300px]" />
          
          <div className="bg-[#111111] border border-[#2a2a2a] rounded-lg py-12 text-center space-y-6 h-[300px] flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full border-2 border-[#2a2a2a]" />
              <div className="w-3 h-3 rounded-full border-2 border-[#2a2a2a]" />
              <div className="w-3 h-3 rounded-full border-2 border-[#2a2a2a]" />
            </div>
            
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a8784] font-mono">
              shreyas d · systems software engineer
            </p>

            <h2 className="text-2xl font-medium text-[#ff3b3b] tracking-wide">
              Systems engineer from India.
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-2 text-[#b4b2ad]">
              <p className="text-sm leading-relaxed">
                I build the platform software behind optical transport networks — currently at Infinera, on the GX chassis family (ThanOS), where I work on zero-touch provisioning, file-transfer, and the simulation &amp; test infrastructure that keeps those paths reliable.
              </p>
              <p className="text-sm leading-relaxed">
                Most of my work is in C++ and Python, close to the metal on VRF-scoped networking, gRPC, systemd, and the build/test machinery that keeps releases moving. Lately I&apos;ve leaned hard into AI-assisted development (AI-DLC), scaffolding ~19K lines of unit tests and pushing real coverage into code that had none.
              </p>
            </div>

            <p className="text-[11px] text-[#8a8784] font-mono pt-2">
              18 months · 173 commits · 8 repos · ~70 JIRAs · ~50K LOC
            </p>
          </div>
          
          <Cube className="h-[300px]" label="[SaaS]" />
          <Cube className="h-[300px]" />
        </div>

        {/* Separator Row */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
        </div>

        

        {/* Work Experience Section */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[400px]" />
          <Cube className="h-[400px]" />
          
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-8 h-[400px] flex flex-col justify-between">
            <div className="space-y-5">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a8784] font-mono">
                selected experience
              </p>
              <div className="space-y-4 text-[12px] leading-relaxed text-[#e6e4df]">
                <div className="border-b border-[#2a2a2a] pb-3">
                  <p className="font-medium text-[#ff3b3b]">Systems software engineer — Infinera / ThanOS</p>
                  <p className="mt-1 text-[#b4b2ad]">Platform software across ZTP, FTS, simulation and the integration/test layer for the GX chassis family.</p>
                </div>
                <div className="border-b border-[#2a2a2a] pb-3">
                  <p className="font-medium text-[#ff3b3b]">ZTP and remote provisioning</p>
                  <p className="mt-1 text-[#b4b2ad]">Built and hardened the provisioning path for factory-reset nodes, including ZTP-over-OSC and DHCP/OSPF-driven self-configure flows.</p>
                </div>
                <div className="border-b border-[#2a2a2a] pb-3">
                  <p className="font-medium text-[#ff3b3b]">FTS transfer reliability</p>
                  <p className="mt-1 text-[#b4b2ad]">Introduced throttled progress updates and stronger transfer-state handling so large file moves stayed observable without flooding the DB.</p>
                </div>
                <div>
                  <p className="font-medium text-[#ff3b3b]">AI-assisted test infrastructure</p>
                  <p className="mt-1 text-[#b4b2ad]">Scaffolded and expanded unit-test and coverage work with AI-DLC, improving confidence for ZTP and release validation.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-[#2a2a2a] pt-4 mt-4">
              <p className="text-[11px] font-mono text-[#8a8784]">
                18 months · 173 commits · 8 repos · ~70 JIRAs · ~50K LOC
              </p>
              <a
                href="https://drive.google.com/file/d/1wVZdJzEcGpmC2Wn9HNTyJpLSrHkcszea/view"
                target="_blank"
                rel="noopener"
                className="text-[11px] font-mono text-[#ff3b3b] hover:underline"
              >
                resume
              </a>
            </div>
          </div>
          
          <Cube className="h-[400px]" />
          <Cube className="h-[400px]" />
        </div>

        {/* Separator Row */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" />
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg h-[80px] flex items-center justify-between px-8">
            <p className="text-xs font-mono text-[#e6e4df]">
              <span className="text-[#ff3b3b]">[.scroll]</span> see featured works
            </p>
            <p className="text-[11px] font-mono text-[#8a8784]">
              <span className="text-[#ff3b3b]">01</span>/05
            </p>
          </div>
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" />
        </div>

        {/* Projects List */}
        {projects.map((project, index) => (
          <div key={project.id}>
            <div className="grid gap-[2px] mb-[2px] grid-cols-[100px_100px_1fr_100px_100px]">
              <Cube className="h-[350px]" />
              <Cube className="h-[350px]" />

              <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg p-8 hover:shadow-lg transition-shadow h-[350px]">
                <div className="grid grid-cols-5 gap-6 h-full">
                  <div className="col-span-1 bg-[#1f1f1f] rounded-lg overflow-hidden border border-[#2a2a2a]">
                    <motion.button
                      layoutId={`project-card-${project.id}`}
                      className="relative cursor-pointer w-full h-full focus:outline-none"
                      onClick={() =>
                        openViewer({
                          id: project.id,
                          title: project.title,
                          mode: project.mode,
                          previewUrl: project.previewUrl,
                          slides: project.slides,
                          description: project.description
                        })
                      }
                      aria-label={`Open project ${project.number}`}
                    >
                      <div className="w-full h-full flex items-center justify-center bg-[#111111]">
                        <span className="text-3xl font-bold text-[#8a8784]">{project.number}</span>
                      </div>
                      <span className="absolute top-3 left-3 text-[11px] font-mono text-[#b4b2ad] bg-[#1a1a1a]/85 px-2 py-1 rounded-md border border-[#2a2a2a]">
                        [{project.number}]
                      </span>
                    </motion.button>
                  </div>

                  <div className="col-span-4 space-y-3 overflow-auto">
                    <h3 className="text-lg font-medium text-[#e6e4df] leading-relaxed">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#b4b2ad] leading-relaxed">
                      {project.description}
                    </p>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener"
                        className="text-sm text-[#e75532] hover:underline inline-block"
                      >
                        Visit the website &gt;
                      </a>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 bg-[#111111] border border-[#2a2a2a] rounded-lg text-xs text-[#b4b2ad]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-right pt-2">
                      <p className="text-xs font-mono text-[#8a8784]">
                        [.{project.year}] <span className="text-[#ff3b3b]">{project.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Cube className="h-[350px]" />
              <Cube className="h-[350px]" />
            </div>

            {index < projects.length - 1 && (
              <div className="grid gap-[2px] mb-[2px] grid-cols-[100px_100px_1fr_100px_100px]">
                <Cube className="h-[60px]" />
                <Cube className="h-[60px]" />
                <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg h-[60px] flex items-center justify-between px-8">
                  <p className="text-xs font-mono text-[#b4b2ad]">
                    {index === 0 && 'Zero-touch provisioning, file-transfer, and test infrastructure.'}
                    {index === 1 && 'C++ and Python across the stack.'}
                    {index === 2 && 'VRF-scoped networking, gRPC, systemd.'}
                    {index === 3 && 'AI-DLC and day-two reliability work.'}
                  </p>
                  <p className="text-[11px] font-mono text-[#8a8784]">
                    <span className="text-[#ff3b3b]">0{index + 2}</span>/04
                  </p>
                </div>
                <Cube className="h-[60px]" />
                <Cube className="h-[60px]" />
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <div className="bg-[#161616] border border-[#2a2a2a] rounded-lg px-8 py-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a8784] font-mono">Jack of many trades</p>
              <p className="text-sm leading-relaxed text-[#b4b2ad]">
                C++ and Python across the stack — platform, provisioning, file-transfer, simulation, and the test infra that keeps nightly green.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#8a8784] font-mono">contact me</p>
              <p className="text-sm leading-relaxed text-[#b4b2ad]">
                Open to systems, platform &amp; backend roles. Let&apos;s talk.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <a href="https://github.com/DeLeNoire" target="_blank" rel="noopener" className="text-[11px] font-mono text-[#ff3b3b] hover:underline">github</a>
                <a href="https://www.linkedin.com/in/shreyasd19/" target="_blank" rel="noopener" className="text-[11px] font-mono text-[#ff3b3b] hover:underline">linkedin</a>
                <a href="https://drive.google.com/file/d/1wVZdJzEcGpmC2Wn9HNTyJpLSrHkcszea/view" target="_blank" rel="noopener" className="text-[11px] font-mono text-[#ff3b3b] hover:underline">resume</a>
              </div>
            </div>
          </div>
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
        </div>

        {/* Bottom Decorative Row */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px]">
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" />
        </div>
      </main>

      <ProjectExperienceViewer
        isOpen={viewerOpen}
        config={viewerConfig}
        onClose={closeViewer}
      />
    </div>
  );
}