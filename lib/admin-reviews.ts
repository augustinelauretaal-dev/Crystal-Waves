'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getAdminReviews() {
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

export async function updateReviewStatus(id: string, verified: boolean) {
  try {
    const review = await prisma.review.update({
      where: { id },
      data: { verified }
    });

    revalidatePath('/admin/reviews');
    revalidatePath('/');
    
    return { success: true, data: review };
  } catch (error) {
    console.error('Error updating review:', error);
    return { success: false, error: 'Failed to update review' };
  }
}

export async function deleteReview(id: string) {
  try {
    await prisma.review.delete({
      where: { id }
    });

    revalidatePath('/admin/reviews');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting review:', error);
    return { success: false, error: 'Failed to delete review' };
  }
}
