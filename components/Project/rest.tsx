import React, { useState } from 'react';

export default function PortfolioClone() {
  const [selectedCompany, setSelectedCompany] = useState('Sureify');

  const companies = [
    { name: 'Sureify', logo: 'S' },
    { name: 'SerVme', logo: 'V' },
    { name: 'Skill-Lync', logo: 'K' },
    { name: 'GrowthSchool', logo: 'G' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Configuring Overflow Fields in our Studio Form Builder',
      description: 'Traditionally, applications are approved by US State\'s Dept of Insurance on actual paper form. Online application form fields however have limited digital space for those answers. To handle longer responses without going through the burdensome re-approval process for form changes, I have implemented an "overflow" section at the end of the application.',
      tags: ['Product Design', 'Compliance', 'Onboarding'],
      year: '2025',
      company: 'Sureify',
      number: '01'
    },
    {
      id: 2,
      title: 'Redesigning the table management & reservation experience (iOS app)',
      description: 'Servme helps restaurants and other hospitality businesses manage reservations, tables, and walk-ins more efficiently. The main goal of the redesign was to make it easier for staff to serve their guests, and do it faster.',
      tags: ['Cross Platform', 'Reports', 'UX Research', 'iOS'],
      year: '2024',
      company: 'SerVme',
      number: '02'
    },
    {
      id: 3,
      title: 'Designing for transparency and reducing refund requests',
      description: 'As Skill-Lync\'s sales grew, so did the number of support tickets and social media complaints from students, primarily regarding refund requests.',
      tags: ['Transparency', 'User Journeys', 'Payments'],
      year: '2022',
      company: 'Skill-Lync',
      number: '03'
    },
    {
      id: 4,
      title: 'Solving for Privacy with User Role Switching',
      description: 'Various personas launch Acquire during a policy application process. Role Switching refers to the functionality where the application is transferred from one user role to another.',
      tags: ['Privacy', 'Configurations', 'Design Systems'],
      year: '2024',
      company: 'Sureify',
      number: '04'
    },
    {
      id: 5,
      title: 'Designing Servme\'s Browsing Experience',
      description: 'With a goal of global expansion, Lebanon based Hospitality SaaS startup - Servme wanted to offer a fresh browsing experience.',
      tags: ['Website', 'Built on Framer', 'Growth'],
      year: '2024',
      company: 'SerVme',
      number: '05',
      link: 'https://www.servmeco.com/'
    }
  ];

  // Cube component with various animation patterns
  const Cube = ({ variant = 'default', label = '', className = '' }) => {
    return (
      <div className={`relative bg-[#f9f9f9] rounded-lg overflow-hidden ${className}`}>
        {variant === 'grid-9' && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`rounded-sm ${i === 7 ? 'bg-[#e75532] animate-pulse' : 'bg-[#ececec]'}`}
              />
            ))}
          </div>
        )}
        
        {variant === 'circles-7' && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#ececec] rounded-full"
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
            <div className="w-4 h-6 border-2 border-[#ececec] rounded" />
            <div className="w-4 h-6 border-2 border-[#ececec] rounded" />
            <div className="w-3 h-3 bg-[#e75532] rounded-sm animate-pulse" />
          </div>
        )}

        {variant === 'dots-17' && (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1">
            {[...Array(17)].map((_, i) => (
              <div
                key={i}
                className={`rounded-full ${i === 8 ? 'bg-[#e75532] animate-rotate' : 'bg-[#ececec]'}`}
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
            <span className="text-[10px] font-mono text-[#d7d4d2]">{label}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-screen bg-[#ededed] font-sans overflow-x-hidden">
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
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" label="[Product]" />
          <Cube className="h-[100px]" />
          <Cube className="h-[100px]" label="[Figma]" />
          <Cube className="h-[100px]" />
        </div>

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

        {/* Navigation Section */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" label="[8px]" />
          
          {/* Center Navigation */}
          <div className="bg-[#f9f9f9] rounded-lg px-6 py-3 h-[80px]">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 bg-[#e75532] rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0">
                    {[...Array(28)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#f9f9f9] rounded-full"
                        style={{
                          left: `${(i % 7) * 14 + 10}%`,
                          top: `${Math.floor(i / 7) * 25 + 10}%`,
                          opacity: Math.random() > 0.5 ? 1 : 0.2,
                          animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                          animationDelay: `${Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h1 className="text-base font-medium text-[#292524]">Shreyas D</h1>
                  <p className="text-[11px] text-[#79716b] font-mono">Open for new projects</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-xs font-mono text-[#79716b]">
                <a href="#" className="hover:text-[#e75532] transition-colors">Work</a>
                <a href="#about" className="hover:text-[#e75532] transition-colors">About</a>
                <a href="#recommendations" className="hover:text-[#e75532] transition-colors">Recommendations</a>
                <a href="mailto:info.sujitsen@gmail.com" className="hover:text-[#e75532] transition-colors">Email</a>
                <a href="https://www.linkedin.com/in/shreyasd19/" target="_blank" rel="noopener" className="hover:text-[#e75532] transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
          
          <Cube className="h-[80px]" label="[100px]" />
          <Cube className="h-[80px]" />
        </div>

        {/* Hero Section with Side Cubes */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[300px]" />
          <Cube className="h-[300px]" />
          
          <div className="bg-transparent py-12 text-center space-y-6 h-[300px] flex flex-col justify-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full border-2 border-[#e7e5e4]" />
              <div className="w-3 h-3 rounded-full border-2 border-[#e7e5e4]" />
              <div className="w-3 h-3 rounded-full border-2 border-[#e7e5e4]" />
            </div>
            
            <h2 className="text-2xl font-medium text-[#292524] tracking-wide">
              I&apos;m a Product Designer from India
            </h2>
            
            <div className="max-w-2xl mx-auto space-y-2 text-[#79716b]">
              <p>
                Currently designing systems, compliance & onboarding products at{' '}
                <a href="https://www.sureify.com/lifetimeacquire/" target="_blank" rel="noopener" className="text-[#e75532] hover:underline">
                  Sureify
                </a>
              </p>
              <p>I enjoy designing uncomplicated products that drive business growth</p>
            </div>

            <div className="flex items-center justify-center gap-3 text-[11px] text-[#a9a29d] font-mono pt-4">
              <div className="bg-[#e7e5e4] rounded h-5 w-12" />
              <span>https://www.figma.com/</span>
              <span className="text-[#44403c]">workexperience</span>
            </div>
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
          
          <div className="bg-[#f9f9f9] rounded-lg p-8 h-[400px]">
            <div className="grid grid-cols-5 gap-6 h-full">
              {/* Left Section */}
              <div className="col-span-1 space-y-4">
                <div>
                  <p className="text-[11px] text-[#a9a29d] font-mono mb-3">
                    Experience <span className="text-[#e75532]">/4+ years</span>
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-full h-1 bg-[#e7e5e4] rounded" />
                    ))}
                  </div>
                </div>

                {/* Company Tabs */}
                <div className="space-y-2">
                  {companies.map((company) => (
                    <button
                      key={company.name}
                      onClick={() => setSelectedCompany(company.name)}
                      className={`w-full px-3 py-2 rounded-lg text-[11px] font-mono transition-colors text-left ${
                        selectedCompany === company.name
                          ? 'bg-[#f2f2f2] text-[#44403c]'
                          : 'bg-[#f9f9f9] text-[#a9a29d] hover:bg-[#f2f2f2]'
                      }`}
                    >
                      <div className="text-[#a9a29d] mb-1">#Frame</div>
                      <div>{company.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Center - Code Display */}
              <div className="col-span-3 bg-[#f9f9f9] rounded-lg p-6 overflow-auto">
                <div className="flex gap-6">
                  <div className="space-y-0.5 font-mono text-[11px] text-[#d7d3d0] text-right">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
                      <div key={num}>{num}</div>
                    ))}
                  </div>
                  
                  <div className="space-y-0.5 font-mono text-[11px] flex-1">
                    <div className="text-[#a9a29d]">[</div>
                    <div className="text-[#a9a29d]">  {'{'}</div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">company</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Sureify</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">type</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Full-time</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">title</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Product Designer II</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">start date</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">January 2024</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">end date</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Present</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">industry</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Insurance SaaS</span>
                    </div>
                    <div>
                      <span className="text-[#a9a29d]">    &quot;</span>
                      <span className="text-[#44403c]">task</span>
                      <span className="text-[#a9a29d]">&quot;: </span>
                      <span className="text-[#e75532]">Product, Design Sys</span>
                    </div>
                    <div className="text-[#a9a29d]">  {'}'}</div>
                    <div className="text-[#a9a29d]">]</div>
                  </div>
                </div>
              </div>

              {/* Right - Resume Download */}
              <div className="col-span-1 flex flex-col items-end gap-3">
                <div className="bg-[#f9f9f9] rounded-lg px-3 py-2 text-[10px] font-mono text-[#4f4c49] whitespace-nowrap">
                  [.download my resume]
                </div>
                <a 
                  href="https://drive.google.com/file/d/1wVZdJzEcGpmC2Wn9HNTyJpLSrHkcszea/view"
                  target="_blank"
                  rel="noopener"
                  className="relative w-14 h-14 bg-[#e75532] rounded-lg flex items-center justify-center overflow-hidden hover:scale-105 transition-transform group"
                >
                  {[...Array(28)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#f9f9f9] rounded-full"
                      style={{
                        left: `${(i % 7) * 14 + 10}%`,
                        top: `${Math.floor(i / 7) * 25 + 10}%`,
                        opacity: [4, 8, 13, 16, 18, 21].includes(i) ? 1 : 0.2,
                        animation: `float ${2 + Math.random()}s ease-in-out infinite`,
                        animationDelay: `${Math.random()}s`
                      }}
                    />
                  ))}
                </a>
              </div>
            </div>
          </div>
          
          <Cube className="h-[400px]" />
          <Cube className="h-[400px]" />
        </div>

        {/* Separator Row */}
        <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" />
          <div className="bg-[#f9f9f9] rounded-lg h-[80px] flex items-center justify-between px-8">
            <p className="text-xs font-mono text-[#44403c]">
              <span className="text-[#e75532]">[.scroll]</span> see featured works
            </p>
            <p className="text-[11px] font-mono text-[#a9a29d]">
              <span className="text-[#e8583a]">01</span>/05
            </p>
          </div>
          <Cube className="h-[80px]" />
          <Cube className="h-[80px]" />
        </div>

        {/* Projects List */}
        {projects.map((project, index) => (
          <div key={project.id}>
            <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
              <Cube className="h-[350px]" />
              <Cube className="h-[350px]" />
              
              <div className="bg-[#f9f9f9] rounded-lg p-8 hover:shadow-lg transition-shadow h-[350px]">
                <div className="grid grid-cols-5 gap-6 h-full">
                  <div className="col-span-1 bg-[#e7e5e4] rounded-lg flex items-center justify-center">
                    <div className="text-3xl font-bold text-[#d7d3d0]">{project.number}</div>
                  </div>

                  <div className="col-span-4 space-y-3 overflow-auto">
                    <h3 className="text-lg font-medium text-[#292524] leading-relaxed">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#79716b] leading-relaxed">
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
                          className="px-3 py-1.5 bg-white border border-[#e7e5e4] rounded-lg text-xs text-[#79716b]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="text-right pt-2">
                      <p className="text-xs font-mono text-[#a9a29d]">
                        [.{project.year}] <span className="text-[#e75532]">{project.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Cube className="h-[350px]" />
              <Cube className="h-[350px]" />
            </div>

            {index < projects.length - 1 && (
              <div className="grid grid-cols-[100px_100px_1fr_100px_100px] gap-[2px] mb-[2px]">
                <Cube className="h-[60px]" />
                <Cube className="h-[60px]" />
                <div className="bg-[#f9f9f9] rounded-lg h-[60px] flex items-center justify-between px-8">
                  <p className="text-xs font-mono text-[#aaa39f]/75">
                    {index === 0 && "Contact me for a detailed overview of the project."}
                    {index === 1 && "Let's grab coffee to discuss these projects in details."}
                    {index === 2 && "Detailed case studies are 'coming soon'. I promise."}
                    {index === 3 && "Don't forget to come back after visiting Servme's website!"}
                  </p>
                  <p className="text-[11px] font-mono text-[#a9a29d]">
                    <span className="text-[#e8583a]">0{index + 2}</span>/05
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
          <div className="bg-[#f9f9f9] rounded-lg h-[100px] flex items-center justify-between px-8">
            <button className="bg-gradient-to-r from-[#f9f9f9] to-[#f5f5f5] hover:from-[#f5f5f5] hover:to-[#efefef] px-6 py-3 rounded-lg transition-all hover:shadow-md">
              <span className="text-xs font-mono text-[#292524]">Got a project in mind? </span>
              <span className="text-xs font-mono text-[#e75532]">Let&apos;s talk</span>
            </button>
            <p className="text-[11px] font-mono text-[#a9a29d]">
              [updated/September.2025]
            </p>
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
    </div>
  );
}