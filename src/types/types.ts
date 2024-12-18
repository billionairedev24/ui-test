import React from "react";
import {FieldErrors, UseFormRegister, UseFormReturn} from "react-hook-form";

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface MobileMenuProps {
    categories: Array<{ name: string; href: string }>;
    services: Array<{ name: string; description: string; href: string }>;
    onClose: () => void;
}

export interface Order {
    id: string;
    date: Date;
    total: number;
    status: OrderStatus;
    items: {
        id: string;
        name: string;
        quantity: number;
        price: number;
        imageUrl: string;
    }[];
    trackingNumber?: string;
    estimatedDelivery?: Date;
}


export interface OrderSummary {
    items: CartItem[];
    subtotal: number;
    tax: number;
    total: number;
    shipping: ShippingOption | null;
    discount: number;
}

export interface CardProps {
  className: string;
  title: string;
  sales: number;
  icon?: any;
}

//ToDo: use zod schema
export interface OrderType {
  id: number | string;
  invoice_number: number | string;
  customer_name: string;
  payment_method: string;
  amount: string;
  status: string;
  action?: string;
}

export interface TextInputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isRequired?: boolean;
  type?: string;
  className?: string;
  defaultValue?: string;
    step?: string
    placeholder?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    disabled?: boolean
}

export interface Category {
    id: string | number
  name: string;
  description: string;
    marketId?: string | number
}

export interface ImageUploadProps {
    label: string
    imageUrl: string
    setImageUrl: React.Dispatch<React.SetStateAction<string>>
    className: string
}


interface Option {
    id?: string | number
    name: string
    code?: string
}

export interface SelectInputProps {
    label: string
    name: string
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
    classname?: string
    options: Option[]
    multiple?: boolean
}


export interface ClientLocation {
  city: string;
  state: string;
}





export interface Product { 
    id?: string | number;
    rating: number;
    reviews: number;
    name: string;
    description: string;
    marketId?: string;
    sku: string;
    barcode: string;
    price: number;
    discount: number;
    categoryId?: string;
    vendorId?: string;
    imageUrl: string;
    tags?: string[];
    isActive?: boolean;
    tax: number;
    weight?: number;
    dimensions?: {
        length: number;
        width: number;
        height: number;
    };
}

export interface CartItem extends Product {
    quantity: number;
}


export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
}

/*
private Long customerId;
     username;
     name;
     givenName;
     familyName;
     middleName;
     nickname;
     preferredUsername;
     profile;
     picture;
     website;
     email;
     emailVerified;
     gender;
     birthdate;
     zoneinfo;
     locale;
     phoneNumber;
     phoneNumberVerified;
    address;
*/

export interface Customer {
    customerId: string | number;
    username: string;
    name: string;
    givenName: string;
    familyName: string;
    middleName?: string;
    nickname?: string;
    preferredUsername?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email: string;
    emailVerified: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phoneNumber?: string;
    phoneNumberVerified?: boolean;
    address?: Address[];
    lastLoggedIn?: string;
    readonly role: string
}

export interface SearchSuggestion {
    text: string;
    category?: string;
    count: number;
}

export interface ShippingOption {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
}

export interface Coupon {
    code: string;
    type: 'percentage' | 'fixed';
    discount: number;
}

export interface ToggleInputProps {
    label: string,
    name: string,
    trueTitle: string,
    falseTitle: string,
    register: any,
    className?: string
}

export interface Banner {
    id?: string | number
    title: string
    link: string
    imageUrl: string
}

export interface Seller {
    id?: string | number
    firstname: string
    lastname: string
    phone: string
    email: string
    profileImageUrl: string
    docUrl?: string
    address1: string
    address2: string
    city: string
    state: string
    zip: string
    notes?: string
    businessName?: string
}

export interface Shop {
    id?: string | number
    name: string
    logoUrl?: string
    description: string
}

export interface Staff {
    id?: string | number
    firstname: string
    lastname: string
    staffId: string
    role: string
    password: string
}

export interface Address {
    id?: number | string
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    country?: string
    zip: string
}

export enum Role {
  CUSTOMER = "CUSTOMER",
  VENDOR = "VENDOR",
  ADMIN = "ADMIN",
    SELLER = "SELLER"
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiryTime: string;
  name: string;
  email: string;
}

export interface WishlistItem extends Product {
    addedAt: Date;
}

export type HandleImageDelete = (
  imageUrl: string,
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>,
  isDeleting: IsDeletingState,
  setIsDeleting: React.Dispatch<React.SetStateAction<IsDeletingState>>,
  form: UseFormReturn<any>
) => void;

export interface IsDeletingState {
  [imageUrl: string]: boolean;
}

type CartProduct = Product & {
  quantity: number;
};

export default CartProduct;

export interface Availability {
  [date: string]: { total: number; available: number };
}

export interface IdentifierType {
  otpDestination: string;
  otpDestinationType: string;
  userId?: string;
  role: Role;
  password?: string;
}

export interface SignupResponse {
    id: number
    email: string
    role: string
}
