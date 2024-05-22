import { Suspense, memo } from "react";
import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const BOOKS_QUERY = gql`
  query GetBooks {
    books {
      id
      name
      author {
        name
      }
    }
  }
`;
interface Author {
  name: string;
}

interface Book {
  id: number;
  name: string;
  author: Author;
}

interface Books {
  books: Book[];
}
const MemoizedBooks = memo(function Books() {
  const { error, data } = useQuery<Books>(BOOKS_QUERY);
  if (error) {
    return <>Error occurs ...</>;
  }
  return (
    <div className="card-container">
      {data &&
        data?.books &&
        data.books.map((item) => (
          <div className="card-item" key={item.id}>
            <h2>Title : {item.name}</h2>
            <p>{item.author.name}</p>
          </div>
        ))}
    </div>
  );
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Suspense fallback={<p>Loading ....</p>}>
          <MemoizedBooks />
        </Suspense>
      </div>
    </ApolloProvider>
  );
}

export default App;
