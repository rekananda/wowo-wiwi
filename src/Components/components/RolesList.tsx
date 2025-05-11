import { useState, useEffect } from 'react';
import { RoleRow } from './RoleRow';
import { getPlayableRoles } from '@queries/roles';
import { Role } from '@/types/supabase';

export function RolesList() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const { data, error } = await getPlayableRoles();

        if (error) throw error;
        setRoles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  if (loading) return <div>Loading roles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Playable Roles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Must Played</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Skills</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <RoleRow key={role.id} role={role} />
          ))}
        </tbody>
      </table>
    </div>
  );
} 