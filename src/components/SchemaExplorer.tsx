import { gql, useQuery } from '@apollo/client';

const SCHEMA_QUERY = gql`
  query SchemaQuery {
    __type(name: "m_peran") {
      name
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
`;

export function SchemaExplorer() {
  const { loading, error, data } = useQuery(SCHEMA_QUERY);

  if (loading) return <div>Loading schema...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Schema Explorer</h2>
      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
} 