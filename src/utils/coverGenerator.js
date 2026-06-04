export const DEFAULT_BOOK_COVER = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80';

export const handleBookCoverError = (event) => {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === 'true') {
    image.style.display = 'none';
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = DEFAULT_BOOK_COVER;
};

// Helper to convert completely uppercase strings to Title Case with minor words handled
export const toTitleCase = (str) => {
  if (!str) return '';
  const minorWords = ['and', 'or', 'but', 'a', 'an', 'the', 'as', 'at', 'by', 'for', 'in', 'of', 'on', 'per', 'to', 'is'];
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      if (index > 0 && minorWords.includes(word)) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

// Helper to format the author field nicely
export const formatAuthor = (author) => {
  if (!author) return '';
  const cleanAuthor = author.replace(/^by\s+/i, '');
  return toTitleCase(cleanAuthor);
};

export const getBookCover = (book) => {
  if (!book) return DEFAULT_BOOK_COVER;

  const titleKey = book.title ? book.title.toLowerCase().trim() : '';

  // Title-based mapping (case-insensitive) for accurate matching and to avoid ID collisions
  const titleMapping = {
    // Technology
    'the silent algorithm': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
    'quantum horizons': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
    'art of code': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80',
    'javascript mastery': 'https://books.google.com/books/content?id=p_T2DwAAQBAJ&printsec=frontcover&img=1&zoom=1',
    'cloud computing': 'https://books.google.com/books/content?id=e7V9CwAAQBAJ&printsec=frontcover&img=1&zoom=1',

    // Fiction
    'the midnight garden': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=400&q=80',
    'echoes of eternity': 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=400&q=80',

    // Business
    'business mastery': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    'mindful leadership': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
    'digital transformation': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80',
    'leadership excellence': 'https://covers.openlibrary.org/b/isbn/9781604919134-L.jpg',
    'startup success': 'https://books.google.com/books/content?id=S3p2DwAAQBAJ&printsec=frontcover&img=1&zoom=1',
    'the mindful leader': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',

    // History
    'ancient wisdom': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Meditations_of_the_Emperor_Marcus_Aurelius_Antoninus.jpg',
    'history of time': 'https://upload.wikimedia.org/wikipedia/commons/c/c1/A_Brief_History_of_Time_%28Stephen_Hawking%29.jpg',

    // Psychology
    'psychology today': 'https://images.unsplash.com/photo-1529753253716-c211eed9bc47?auto=format&fit=crop&w=400&q=80',
    'the human mind': 'https://images.unsplash.com/photo-1557264337-e8a93017fe9f?auto=format&fit=crop&w=400&q=80',

    // Educational
    'data science fundamentals': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    'advanced mathematics': 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80',
    'physics for engineers': 'https://covers.openlibrary.org/b/isbn/9780131495081-L.jpg',

    // Inspirational
    'the creative mind': 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=400&q=80',
    'rise above': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',

    // Novels
    'the garden of secrets': 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&w=400&q=80',
    'midnight in paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    'the last chapter': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',

    // Children's
    'little explorers': 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=400&q=80',
    'the magic tree': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    'happy animals': 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=400&q=80',

    // E-Books
    'digital marketing 101': 'https://covers.openlibrary.org/b/isbn/9781491935620-L.jpg',
    'code like a pro': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80',

    // Audiobooks
    'the voice within': 'https://covers.openlibrary.org/b/isbn/9781594488894-L.jpg',
    'listen and learn: spanish': 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=400&q=80',

    // Teens & YA
    'the hidden academy': 'https://books.google.com/books/content?id=E_2mEAAAQBAJ&printsec=frontcover&img=1&zoom=1',
    'summer of secrets': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  };

  const matchedUrl = titleMapping[titleKey];
  if (matchedUrl) {
    return matchedUrl;
  }

  // If book cover is already a non-picsum custom URL, keep it
  if (book.cover && !book.cover.includes('picsum.photos')) {
    return book.cover;
  }

  // Fallback for user-created books: use a beautiful Unsplash book cover photo
  return DEFAULT_BOOK_COVER;
};
