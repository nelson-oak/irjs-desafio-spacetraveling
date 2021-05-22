import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

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

export default function Post(): JSX.Element {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <div className={styles.postContainer}>
        <div className={styles.banner}>
          <img
            src="https://www.istockphoto.com/resources/images/HomePage/Hero/682374404.jpg"
            alt=""
          />
        </div>

        <article className={styles.postContent}>
          <h1>Criando um app CRA do zero</h1>

          <div className={commonStyles.info}>
            <div>
              <FiCalendar />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <FiUser />
              <span>Joseph Oliveira</span>
            </div>
            <div>
              <FiClock />
              <span>4 min</span>
            </div>
          </div>

          <h2>Algum texto em latim</h2>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quasi praesentium minima, aliquam eum consequatur
            rerum? Est vero, cumque cum fugiat similique at alias enim non
            voluptatibus accusamus incidunt vel nesciunt.
          </p>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quasi praesentium minima, aliquam eum consequatur
            rerum? Est vero, cumque cum fugiat similique at alias enim non
            voluptatibus accusamus incidunt vel nesciunt.
          </p>

          <h2>Algum texto em latim</h2>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quasi praesentium minima, aliquam eum consequatur
            rerum? Est vero, cumque cum fugiat similique at alias enim non
            voluptatibus accusamus incidunt vel nesciunt. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Quasi praesentium minima, aliquam
            eum consequatur rerum? Est vero, cumque cum fugiat similique at
            alias enim non voluptatibus accusamus incidunt vel nesciunt. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt.
          </p>

          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Quasi praesentium minima, aliquam eum consequatur
            rerum? Est vero, cumque cum fugiat similique at alias enim non
            voluptatibus accusamus incidunt vel nesciunt. Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Quasi praesentium minima, aliquam
            eum consequatur rerum? Est vero, cumque cum fugiat similique at
            alias enim non voluptatibus accusamus incidunt vel nesciunt. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Quasi
            praesentium minima, aliquam eum consequatur rerum? Est vero, cumque
            cum fugiat similique at alias enim non voluptatibus accusamus
            incidunt vel nesciunt.
          </p>
        </article>
      </div>
    </>
  );
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };
