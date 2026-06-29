// components/BlockRenderer.tsx
import { AnyBlock } from '@/lib/contentful';
import ProfileSection from './ProfileSection';
import EducationSection from './EducationSection';
import JobSection from './JobSection';
import ProjectSection from './ProjectSection';
import ContactSection from './ContactSection';
import TechStackSection from './TechStackSection';

interface Props {
  block: AnyBlock;
}

export default function BlockRenderer({ block }: Props) {
  const contentType = block.sys.contentType.sys.id;
  const fields = block.fields as Record<string, unknown>; // access any field freely

  switch (contentType) {
    case 'profileSection':
      return <ProfileSection data={fields} />;

    case 'educationSection':
      return <EducationSection data={block.fields as Record<string, unknown>} />
    
    case 'jobSection':   // ← your actual block content type ID
      return <JobSection data={fields} />;
    
    case 'projectSection':
      return <ProjectSection data={fields} />
    case "contactUs":
      return <ContactSection section={fields} />;

    case "toolSetSection":
      return <TechStackSection data={fields}/>;

    default:
      console.warn(`Unhandled block type: ${contentType}`);
      return null;
  }
}