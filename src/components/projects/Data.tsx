import Image from 'next/image';
import { ChevronRight, Link } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRef, useState, useEffect } from 'react';

// Enhanced project content array with all projects
const PROJECT_CONTENT = [
  {
    title: 'Wire Ltd Scraper',
    description:
      'Automated n8n workflow scraping Manchester music event listings from The Wire Ltd website. Parses event data, processes venue information, and formats content for social media distribution and audience engagement.',
    techStack: [
      'n8n',
      'Web Scraping',
      'Data Processing',
      'Automation',
      'API Integration'
    ],
    date: '2024',
    links: [],
    images: [
      { src: '/Screen Recording 2025-07-02 at 16.47.37.mov', alt: 'Wire Ltd Scraper workflow preview', isVideo: true }
    ],
  },
  {
    title: 'AI Content Production Workflow',
    description:
      'Comprehensive n8n automation workflow for content creation and distribution. Integrates AI writing tools, social media scheduling, and analytics tracking for efficient content production at scale.',
    techStack: [
      'n8n',
      'OpenAI API',
      'Social Media APIs',
      'Content Management',
      'Analytics'
    ],
    date: '2024',
    links: [],
    images: [
      { src: '/cmca6epz4004101mq104479dd.mp4', alt: 'AI Content Production Workflow preview', isVideo: true }
    ],
  },

  {
    title: 'Barz in Carz',
    description:
      'Viral TikTok series featuring immersive 360° camera cinematography, professional digital audio recording, and strategic content optimisation for virality. Artist showcase and promotion platform.',
    techStack: [
      '360° Cameras', 'Digital Audio Recording', 'Video Editing', 'TikTok', 'Social Analytics'
    ],
    date: '2023',
    links: [],
    images: [
      { src: '/Barz in Carz - Eva Lazarus.mp4', alt: 'Barz in Carz video preview', isVideo: true }
    ],
  },
  {
    title: 'AI ASMR Channel',
    description:
      'Producing interesting and satisfying audio and visual content using the latest AI video generation models. Focussed on therapeutic and satisfying content creation and community building.',
    techStack: [
      'AI Video Generation', 'Audio Synthesis', 'YouTube', 'Content Creation'
    ],
    date: '2024',
    links: [],
    images: [
      { src: '/4mA7_jO8Cu-vkPf-lzfDT_tmpr2d56rap-combined.mp4', alt: 'AI ASMR Channel video preview', isVideo: true }
    ],
  },
  {
    title: 'Aquinas Student Hub',
    description:
      'Built a comprehensive React application with AI-powered tools including skills tracker, deadline management, AI chatbot with RAG, news API, and bulletin system for Aquinas College.',
    techStack: [
      'React', 'n8n', 'Google APIs', 'Outlook API', 'OpenAI', 'RAG', 'JavaScript'
    ],
    date: '2023',
    links: [],
    images: [
      { src: '/Screenshot 2025-07-01 at 14.25.46.png', alt: 'Aquinas Student Hub preview' }
    ],
  },
];

// Define interface for project prop
interface ProjectProps {
  title: string;
  description?: string;
  techStack?: string[];
  date?: string;
  links?: { name: string; url: string }[];
  images?: { src: string; alt: string; isVideo?: boolean }[];
}

// Create a VideoComponent for the modal (same as in carousel)
const VideoComponent = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    return () => video.removeEventListener('loadeddata', handleLoadedData);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-600"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className || ''}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const ProjectContent = ({ project }: { project: ProjectProps }) => {
  // Find the matching project data
  const projectData = PROJECT_CONTENT.find((p) => p.title === project.title);

  if (!projectData) {
    return <div>Project details not available</div>;
  }

  return (
    <div className="space-y-10">
      {/* Header section with description */}
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{projectData.date}</span>
          </div>

          <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
            {projectData.description}
          </p>

          {/* Tech stack */}
          <div className="pt-4">
            <h3 className="mb-3 text-sm tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Links section */}
      {projectData.links && projectData.links.length > 0 && (
        <div className="mb-24">
          <div className="px-6 mb-4 flex items-center gap-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {(projectData.links as { name: string; url: string }[]).map((link, index) => (
                <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#F5F5F7] flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
                >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
            ))}
          </div>
        </div>
      )}

      {/* Images/Videos gallery */}
      {projectData.images && projectData.images.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {projectData.images.map((media, index) => (
              <div
                key={index}
                className="relative aspect-video overflow-hidden rounded-2xl"
              >
                {(media as any).isVideo === true ? (
                  <VideoComponent
                    src={media.src}
                    alt={media.alt}
                    className="transition-transform"
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    className="object-cover transition-transform"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main data export with updated content
export const data = [
  {
    category: 'Automation',
    title: 'Wire Ltd Scraper',
    src: '/Screen Recording 2025-07-02 at 16.47.37.mov',
    isVideo: true,
    content: <ProjectContent project={{ title: 'Wire Ltd Scraper' }} />, 
  },
  {
    category: 'AI Content',
    title: 'AI Content Production Workflow',
    src: '/cmca6epz4004101mq104479dd.mp4',
    isVideo: true,
    content: <ProjectContent project={{ title: 'AI Content Production Workflow' }} />, 
  },

  {
    category: 'Content',
    title: 'Barz in Carz',
    src: '/Barz in Carz - Eva Lazarus.mp4',
    isVideo: true,
    content: <ProjectContent project={{ title: 'Barz in Carz' }} />, 
  },
  {
    category: 'AI',
    title: 'AI ASMR Channel',
    src: '/4mA7_jO8Cu-vkPf-lzfDT_tmpr2d56rap-combined.mp4',
    isVideo: true,
    content: <ProjectContent project={{ title: 'AI ASMR Channel' }} />, 
  },
  {
    category: 'Development',
    title: 'Aquinas Student Hub',
    src: '/Screenshot 2025-07-01 at 14.25.46.png',
    content: <ProjectContent project={{ title: 'Aquinas Student Hub' }} />, 
  },
];
