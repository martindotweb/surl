import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { db } from '@/lib/localMySQL';
import { URLSList } from './URLSList';
import CreateLinkDialog from './CreateLinkDialog';

const getShortenedURLsList = async () => {
  const userId = cookies().get('userId')?.value;

  if (Boolean(process.env.LOCAL)) {
    const shortenedURLs: any = await db('api/urlsByUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    return shortenedURLs;
  }
};

export const revalidate = 0;
export const dynamic = 'force-dynamic';

const Dashboard = async () => {
  const userId = cookies().get('userId');
  const username = cookies().get('username');

  if (!userId || !username) {
    return redirect('/login');
  }

  const shortenedURLsList = await getShortenedURLsList();

  return (
    <main className="p-8 mx-auto flex-col items-center gap-2 py-8 md:py-12 md:pb-8">
      <section className="flex justify-between items-center mb-8">
        <h1 className="text-3xl">Dashboard</h1>
        <CreateLinkDialog />
      </section>

      <URLSList urls={shortenedURLsList} />
    </main>
  );
};

export default Dashboard;
