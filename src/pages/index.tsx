import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';

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

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <div className={styles.postsContainer}>
        <div className={styles.postContent}>
          <h1>Como utilizar Hooks</h1>

          <p>Pensando em sincronização em vez de ciclos de vida</p>

          <div className={commonStyles.info}>
            <div>
              <FiCalendar />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <FiUser />
              <span>Joseph Oliveira</span>
            </div>
          </div>
        </div>

        <div className={styles.postContent}>
          <h1>Como utilizar Hooks</h1>

          <p>Pensando em sincronização em vez de ciclos de vida</p>

          <div className={commonStyles.info}>
            <div>
              <FiCalendar />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <FiUser />
              <span>Joseph Oliveira</span>
            </div>
          </div>
        </div>

        <div className={styles.postContent}>
          <h1>Como utilizar Hooks</h1>

          <p>Pensando em sincronização em vez de ciclos de vida</p>

          <div className={commonStyles.info}>
            <div>
              <FiCalendar />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <FiUser />
              <span>Joseph Oliveira</span>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="button">Carregar mais posts</button>
        </div>
      </div>
    </>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
