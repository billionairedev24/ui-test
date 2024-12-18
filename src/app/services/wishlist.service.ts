import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Product, WishlistItem} from "@/types/types";

const wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);

export const wishlistService = {
  wishlist: wishlistSubject.asObservable(),
  
  wishlistCount: wishlistSubject.pipe(
    map(items => items.length)
  ),

  isInWishlist(productId: string | number): boolean {
    return wishlistSubject.value.some(item => item.id === productId);
  },

  addToWishlist(product: Product) {
    const currentWishlist = wishlistSubject.value;
    if (!this.isInWishlist(product.id!)) {
      const wishlistItem: WishlistItem = {
        ...product,
        addedAt: new Date()
      };
      const newWishlist = [...currentWishlist, wishlistItem];
      this.updateWishlist(newWishlist);
    }
  },

  removeFromWishlist(productId: string | number) {
    const newWishlist = wishlistSubject.value.filter(item => item.id !== productId);
    this.updateWishlist(newWishlist);
  },

  toggleWishlist(product: Product) {
    if (this.isInWishlist(product.id!)) {
      this.removeFromWishlist(product.id!);
      return false;
    } else {
      this.addToWishlist(product);
      return true;
    }
  },

  clearWishlist() {
    this.updateWishlist([]);
  },

  updateWishlist(wishlist: WishlistItem[]) {
    //localStorage.setItem('wishlist', JSON.stringify(wishlist));
    wishlistSubject.next(wishlist);
  }
};