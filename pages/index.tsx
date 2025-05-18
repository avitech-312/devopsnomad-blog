import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type Post = {
  slug: string;
  title: string;
  date: string;
};

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">📘 DevOps Nomad Blog</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, title, date }) => (
          <li key={slug} className="border-b pb-2">
            <Link href={`/posts/${slug}`} className="text-xl text-blue-600 hover:underline">
              {title}
            </Link>
            <p className="text-sm text-gray-500">{date}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'posts');

  const files = fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : [];

  const posts: Post[] = files.map((filename) => {
    const slug = filename.replace('.md', '');
    const filePath = path.join(postsDir, filename);
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(markdown);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || 'Unknown',
    };
  });

  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return {
    props: { posts: sortedPosts },
  };
}

