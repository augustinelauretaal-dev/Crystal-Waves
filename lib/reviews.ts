'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getReviews() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return { success: false, error: 'Failed to fetch reviews' };
  }
}

export async function createReview(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const rating = formData.get('rating') as string;
    const description = formData.get('description') as string;

    // Validation
    if (!name?.trim()) {
      return { success: false, error: 'Name is required' };
    }

    if (!rating || parseInt(rating) < 1 || parseInt(rating) > 5) {
      return { success: false, error: 'Rating must be between 1 and 5' };
    }

    if (!description?.trim()) {
      return { success: false, error: 'Description is required' };
    }

    const review = await prisma.review.create({
      data: {
        name: name.trim(),
        rating: parseInt(rating),
        description: description.trim(),
        verified: false
      }
    });

    // Revalidate the home page to show the new review
    revalidatePath('/');

    return { success: true, data: review };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, error: 'Failed to create review' };
  }
}
