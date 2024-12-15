import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Date Image Generator',
  description: 'A simple date image generator supporting various formats and styles',
}

export default function EnLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 