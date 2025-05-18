import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
}

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">DevOpsNomad Blog</h1>
      <p className="text-gray-600 text-center mb-10">
        Remote DevOps careers, playbooks, growth, and passive income.
      </p>
      <ul className="space-y-6">
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug} className="bg-white p-5 rounded-2xl shadow">
            <Link href={`/posts/${slug}`}>
              <div>
                <h2 className="text-2xl font-semibold text-blue-600 hover:underline">
                  {frontmatter.title}
                </h2>
                <p className="text-gray-500 text-sm mb-2">{frontmatter.date}</p>
                <p className="text-gray-700">{frontmatter.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Static site generation
export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'pages/posts');
  const filenames = fs.readdirSync(postsDir);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDir, filename);
    const slug = filename.replace('.md', '');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter } = matter(fileContent);

    return {
      slug,
      frontmatter,
    };
  });

  // Sort posts by newest first
  posts.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );

  return {
    props: {
      posts,
    },
  };
}
