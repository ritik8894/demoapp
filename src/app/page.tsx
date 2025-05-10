// src/app/page.tsx
'use server';

import React from 'react';
import Home from './Home';

export default async function HomePage() {
  return <Home />;
}
