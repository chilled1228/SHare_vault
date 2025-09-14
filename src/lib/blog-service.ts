import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { db, storage } from '@/lib/firebase'
import { BlogPost, MediaFile } from '@/types/blog'

export class BlogService {
  static async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...post,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  }

  static async getPosts(limitCount = 10): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    })
  }

  static async getAllPosts(limitCount = 10): Promise<BlogPost[]> {
    try {
      const q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
          updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
        } as BlogPost
      })
    } catch (error) {
      console.error('Error in getAllPosts:', error)
      throw error
    }
  }

  static async getFeaturedPosts(limitCount = 3): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'posts'),
      where('featured', '==', true),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    })
  }

  static async getPostById(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    }
    return null
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const q = query(
      collection(db, 'posts'),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    )
    const querySnapshot = await getDocs(q)
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    }
    return null
  }

  static async updatePost(id: string, updates: Partial<BlogPost>): Promise<void> {
    const docRef = doc(db, 'posts', id)
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    })
  }

  static async deletePost(id: string): Promise<void> {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }

  static async uploadMedia(file: File, userId: string): Promise<MediaFile> {
    const storageRef = ref(storage, `sharevault/${userId}/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const url = await getDownloadURL(snapshot.ref)
    
    return {
      id: snapshot.metadata.fullPath,
      name: file.name,
      url: url,
      type: file.type,
      size: file.size,
      path: snapshot.metadata.fullPath,
      uploadedBy: userId,
      uploadedAt: new Date()
    }
  }

  static async deleteMedia(path: string): Promise<void> {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  }

  static async getPostsByCategory(category: string, limitCount = 20): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'posts'),
      where('category', '==', category),
      where('published', '==', true),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    })
  }

  // Get all unique categories from published posts
  static async getCategories(): Promise<string[]> {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', true)
    )
    const querySnapshot = await getDocs(q)
    const categories = new Set<string>()
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data()
      if (data.category) {
        categories.add(data.category)
      }
    })
    
    return Array.from(categories).sort()
  }

  // Get draft posts (for admin)
  static async getDraftPosts(limitCount = 10): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'posts'),
      where('published', '==', false),
      orderBy('updatedAt', 'desc'),
      limit(limitCount)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : data.updatedAt
      } as BlogPost
    })
  }

  // Publish a draft post
  static async publishPost(id: string): Promise<void> {
    const docRef = doc(db, 'posts', id)
    await updateDoc(docRef, {
      published: true,
      updatedAt: new Date()
    })
  }

  // Unpublish a post (make it draft)
  static async unpublishPost(id: string): Promise<void> {
    const docRef = doc(db, 'posts', id)
    await updateDoc(docRef, {
      published: false,
      updatedAt: new Date()
    })
  }

  // Check if slug already exists
  static async isSlugUnique(slug: string, excludeId?: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, 'posts'),
        where('slug', '==', slug),
        limit(1)
      )
      const querySnapshot = await getDocs(q)
      
      // If no documents found, slug is unique
      if (querySnapshot.empty) return true
      
      // If we're editing a post, exclude it from the check
      if (excludeId) {
        const existingDoc = querySnapshot.docs[0]
        return existingDoc.id === excludeId
      }
      
      // Slug already exists
      return false
    } catch (error) {
      console.error('Error checking slug uniqueness:', error)
      // If there's an error, allow the slug (fail safe)
      return true
    }
  }
}