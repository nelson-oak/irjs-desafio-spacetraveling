/* eslint-disable import/no-extraneous-dependencies */
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { format } from 'date-fns';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { RichText } from 'prismic-dom';
import { useEffect } from 'react';
import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

interface StaticPropsReturn {
  props: {
    post: Post;
  };
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <div className={styles.postContainer}>
        <div className={styles.banner}>
          <img src={post.data.banner.url} alt="banner" />
        </div>

        <article className={styles.postContent}>
          <h1>{post.data.title}</h1>

          <div className={commonStyles.info}>
            <div>
              <FiCalendar />
              <span>{post.first_publication_date}</span>
            </div>
            <div>
              <FiUser />
              <span>{post.data.author}</span>
            </div>
            <div>
              <FiClock />
              <span>4 min</span>
            </div>
          </div>

          {post.data.content &&
            post.data.content.map(content => (
              <>
                <h2>{content.heading}</h2>

                <div
                  dangerouslySetInnerHTML={{ __html: content.body[0].text }}
                />
              </>
            ))}
        </article>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<StaticPropsReturn> => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(
      new Date(response.first_publication_date),
      'dd MMM Y',
      {
        locale: ptBrLocale,
      }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [
            {
              text: RichText.asHtml(content.body),
            },
          ],
        };
      }),
    },
  };

  return {
    props: {
      post,
    },
  };
};
