import { gql, useQuery } from '@apollo/client';

const INTROSPECTION_QUERY = gql`
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        fields {
          name
          type {
            name
            kind
          }
        }
      }
    }
  }
`;

export function GraphQLTest() {
  const { loading, error, data } = useQuery(INTROSPECTION_QUERY);

  if (loading) return <div>Loading schema...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Filter to show only object types (tables)
  const tables = data?.__schema?.types?.filter(
    (type: any) => type.kind === 'OBJECT' && !type.name.startsWith('__')
  ) || [];

  return (
    <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Available GraphQL Tables</h2>
      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify(tables, null, 2)}
      </pre>
    </div>
  );
} 