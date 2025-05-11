import { useImageUrl } from "@/hooks/useImageUrl";

interface RoleRowProps {
  role: {
    id: string;
    name: string;
    image: string;
    playable: boolean;
    must_played: boolean;
    m_skills: {
      id: string;
      label: string;
      type: string;
    }[];
  };
}

export function RoleRow({ role }: RoleRowProps) {
  const { imageUrl, error: imageError } = useImageUrl(role.image);

  return (
    <tr>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.name}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
        {imageError ? (
          <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Error
          </div>
        ) : (
          <img 
            src={imageUrl || 'https://placehold.co/50x50?text=Loading...'} 
            alt={role.name} 
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/50x50?text=No+Image';
            }}
          />
        )}
      </td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.must_played ? 'Yes' : 'No'}</td>
      <td style={{ border: '1px solid #ddd', padding: '8px' }}>
        <ul style={{ margin: 0, paddingLeft: '20px', textAlign: 'left', listStyleType: 'disc' }}>
          {role.m_skills?.map((skill) => (
            <li key={skill.id}>
              {skill.label} ({skill.type})
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
} 