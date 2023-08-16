import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import Header from "../components/header";
import Aside from "../components/aside";
import Footer from "../components/footer";
import Pagination from "../components/pagination";

export const query = graphql`
  query {
    wpgraphql {
      posts {
        nodes {
          id
          title
          uri
          excerpt
        }
        pageInfo {
          total
        }
      }
      themeSettings {
        postsPerPage
      }
    }
  }
`;

const Blog = ({ data }) => {
  const posts = data.wpgraphql.posts.nodes;
  const { items, bannerimage, render: RenderHeader } = Header();
  const [currentPage, setCurrentPage] = useState(1);
  const { postsPerPage } = data.wpgraphql.themeSettings;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  useEffect(() => {
    // Set isLoading to false after component has mounted
    setIsLoading(false);
  }, []);

  return (
    <html lang="en">
      <RenderHeader />
      <body>
        {isLoading ? ( // Render loading spinner or message if isLoading is true
          <div>Loading...</div>
        ) : (
          <div className="site">
            <header className="banner">
              <Link to="/">
                <img src={bannerimage} alt="" />
              </Link>
            </header>

            <nav className="menu">
              <ul id="primary-menu" className="menu-class">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link to={`${item.url}`}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <main id="index" className="content">
              {paginatedPosts.map((post) => (
                <article key={post.id}>
                  <h1
                    className="pagetitle"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                  <Link
                    className="more-link"
                    to={`/blog/${post.uri}#index`}
                  >
                    more...
                  </Link>
                </article>
              ))}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
                hasNextPage={data.wpgraphql.posts.pageInfo.hasNextPage}
                total={data.wpgraphql.posts.pageInfo.total}
                postsPerPage={data.wpgraphql.themeSettings.postsPerPage}
              />
            </main>
            <Aside />
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
};

export default Blog;