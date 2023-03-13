import { useRouter } from 'next/router';

import BookCard from '@/components/molecules/BookCard';
import Box from '@/components/mui/Box';
import Typography from '@/components/mui/Typography';

export default function Home() {
  const router = useRouter();

  return (
    <Box sx={{ width: 960, minHeight: 'calc(100vh - 56px)', py: 6 }}>
      <Typography
        component="h2"
        sx={{
          color: 'gray.text',
          fontWeight: 'bold',
          fontSize: 26,
          mb: 4,
        }}
      >
        本一覧
      </Typography>
      <Box sx={{ backgroundColor: 'brand.white', p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'grid', gap: 1, gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {new Array(10).fill(0).map((_, i) => (
            <Box key={`${i + 1}`}>
              <BookCard
                src="https://loremflickr.com/640/480/abstract"
                title="本のタイトル"
                description="本の詳細です"
                onClickImage={async () => {
                  await router.push(`/books/${i}`);
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
