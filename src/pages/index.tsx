/* eslint-disable import/no-extraneous-dependencies */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { format } from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

interface StaticPropsReturn {
  props: HomeProps;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [nextPage, setNextPage] = useState(postsPagination.next_page);
  const [posts, setPosts] = useState<Post[]>(postsPagination.results);

  function handleChangeToNextPage(): void {
    if (nextPage) {
      fetch(nextPage)
        .then(response => response.json())
        .then(data => {
          const newPosts = data.results.map(post => {
            return {
              uid: post.uid,
              first_publication_date: format(
                new Date(post.first_publication_date),
                'dd-MMM-Y',
                {
                  locale: ptBrLocale,
                }
              ),
              data: {
                title: post.data.title,
                subtitle: post.data.subtitle,
                author: post.data.author,
              },
            };
          });

          setNextPage(data.nextPage);
          setPosts([...posts, ...newPosts]);
        });
    }
  }

  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <div className={styles.postsContainer}>
        {posts &&
          posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <div className={styles.postContent}>
                  <h1>{post.data.title}</h1>

                  <p>{post.data.subtitle}</p>

                  <div className={commonStyles.info}>
                    <div>
                      <FiCalendar />
                      <span>{post.first_publication_date}</span>
                    </div>
                    <div>
                      <FiUser />
                      <span>{post.data.author}</span>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}

        <div className={styles.buttonContainer}>
          <button type="button" onClick={handleChangeToNextPage}>
            Carregar mais posts
          </button>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps =
  async (): Promise<StaticPropsReturn> => {
    const prismic = getPrismicClient();

    const postsResponse = await prismic.query(
      [Prismic.predicates.at('document.type', 'posts')],
      {
        fetch: ['publication.title, publication.content'],
        pageSize: 20,
      }
    );

    const posts = postsResponse.results.map(post => {
      return {
        uid: post.uid,
        first_publication_date: format(
          new Date(post.first_publication_date),
          'dd MMM Y',
          {
            locale: ptBrLocale,
          }
        ),
        data: {
          title: post.data.title,
          subtitle: post.data.subtitle,
          author: post.data.author,
        },
      };
    });

    return {
      props: {
        postsPagination: {
          results: posts,
          next_page: postsResponse.next_page,
        },
      },
    };
  };
