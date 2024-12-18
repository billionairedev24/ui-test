import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
}

export interface AddressInput {
  addressLine1: Scalars['String']['input'];
  addressLine2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  country?: InputMaybe<Scalars['String']['input']>;
  state: Scalars['String']['input'];
  zip: Scalars['String']['input'];
}

export interface CategoryInput {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
}

export interface CouponInput {
  code: Scalars['String']['input'];
  expiryDate: Scalars['String']['input'];
  name: Scalars['String']['input'];
}

export interface NoteInput {
  note?: InputMaybe<Scalars['String']['input']>;
}

export interface ProductInput {
  categoryId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  shopId: Scalars['ID']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
}

export enum RoleEnum {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Seller = 'SELLER',
  Vendor = 'VENDOR'
}

export interface SellerInput {
  addressInput: AddressInput;
  businessName?: InputMaybe<Scalars['String']['input']>;
  docUrl?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  note?: InputMaybe<NoteInput>;
  phone: Scalars['String']['input'];
}

export interface ShopInput {
  description?: InputMaybe<Scalars['String']['input']>;
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sellerId?: InputMaybe<Scalars['String']['input']>;
}

export interface SignInRequest {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}

export interface UserInput {
  email?: InputMaybe<Scalars['String']['input']>;
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<RoleEnum>;
  username: Scalars['String']['input'];
}

export type CreateProductMutationVariables = Exact<{
  productInput: ProductInput;
}>;


export type CreateProductMutation = { createProduct: { price?: number | null, imageUrl?: string | null } };

export type AddCategoryMutationVariables = Exact<{
  categoryInput: CategoryInput;
}>;


export type AddCategoryMutation = { addCategory: { id: string, description: string } };

export type FindProductsByCategoryIdQueryVariables = Exact<{
  categoryId: Scalars['ID']['input'];
}>;


export type FindProductsByCategoryIdQuery = { findProductsByCategoryId?: Array<{ id: string, shopId: string, name?: string | null, description?: string | null } | null> | null };

export type FindAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProductsQuery = { findAllProducts?: Array<{ id: string, shopId: string, name?: string | null, description?: string | null } | null> | null };

export type FindAllCouponsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCouponsQuery = { findAllCoupons?: Array<{ id: string, name: string, expiryDate: string, code: string } | null> | null };

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategoriesQuery = { findAllCategories?: Array<{ id: string, name: string } | null> | null };


export const CreateProductDocument = gql`
    mutation CreateProduct($productInput: ProductInput!) {
  createProduct(productInput: $productInput) {
    price
    price
    imageUrl
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      productInput: // value for 'productInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const AddCategoryDocument = gql`
    mutation AddCategory($categoryInput: CategoryInput!) {
  addCategory(categoryInput: $categoryInput) {
    id
    description
  }
}
    `;
export type AddCategoryMutationFn = Apollo.MutationFunction<AddCategoryMutation, AddCategoryMutationVariables>;

/**
 * __useAddCategoryMutation__
 *
 * To run a mutation, you first call `useAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCategoryMutation, { data, loading, error }] = useAddCategoryMutation({
 *   variables: {
 *      categoryInput: // value for 'categoryInput'
 *   },
 * });
 */
export function useAddCategoryMutation(baseOptions?: Apollo.MutationHookOptions<AddCategoryMutation, AddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCategoryMutation, AddCategoryMutationVariables>(AddCategoryDocument, options);
      }
export type AddCategoryMutationHookResult = ReturnType<typeof useAddCategoryMutation>;
export type AddCategoryMutationResult = Apollo.MutationResult<AddCategoryMutation>;
export type AddCategoryMutationOptions = Apollo.BaseMutationOptions<AddCategoryMutation, AddCategoryMutationVariables>;
export const FindProductsByCategoryIdDocument = gql`
    query FindProductsByCategoryId($categoryId: ID!) {
  findProductsByCategoryId(categoryId: $categoryId) {
    id
    shopId
    name
    description
  }
}
    `;

/**
 * __useFindProductsByCategoryIdQuery__
 *
 * To run a query within a React component, call `useFindProductsByCategoryIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindProductsByCategoryIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindProductsByCategoryIdQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useFindProductsByCategoryIdQuery(baseOptions: Apollo.QueryHookOptions<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables> & ({ variables: FindProductsByCategoryIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>(FindProductsByCategoryIdDocument, options);
      }
export function useFindProductsByCategoryIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>(FindProductsByCategoryIdDocument, options);
        }
export function useFindProductsByCategoryIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>(FindProductsByCategoryIdDocument, options);
        }
export type FindProductsByCategoryIdQueryHookResult = ReturnType<typeof useFindProductsByCategoryIdQuery>;
export type FindProductsByCategoryIdLazyQueryHookResult = ReturnType<typeof useFindProductsByCategoryIdLazyQuery>;
export type FindProductsByCategoryIdSuspenseQueryHookResult = ReturnType<typeof useFindProductsByCategoryIdSuspenseQuery>;
export type FindProductsByCategoryIdQueryResult = Apollo.QueryResult<FindProductsByCategoryIdQuery, FindProductsByCategoryIdQueryVariables>;
export const FindAllProductsDocument = gql`
    query FindAllProducts {
  findAllProducts {
    id
    shopId
    name
    description
  }
}
    `;

/**
 * __useFindAllProductsQuery__
 *
 * To run a query within a React component, call `useFindAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllProductsQuery, FindAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(FindAllProductsDocument, options);
      }
export function useFindAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllProductsQuery, FindAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(FindAllProductsDocument, options);
        }
export function useFindAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllProductsQuery, FindAllProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllProductsQuery, FindAllProductsQueryVariables>(FindAllProductsDocument, options);
        }
export type FindAllProductsQueryHookResult = ReturnType<typeof useFindAllProductsQuery>;
export type FindAllProductsLazyQueryHookResult = ReturnType<typeof useFindAllProductsLazyQuery>;
export type FindAllProductsSuspenseQueryHookResult = ReturnType<typeof useFindAllProductsSuspenseQuery>;
export type FindAllProductsQueryResult = Apollo.QueryResult<FindAllProductsQuery, FindAllProductsQueryVariables>;
export const FindAllCouponsDocument = gql`
    query FindAllCoupons {
  findAllCoupons {
    id
    name
    expiryDate
    code
  }
}
    `;

/**
 * __useFindAllCouponsQuery__
 *
 * To run a query within a React component, call `useFindAllCouponsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCouponsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCouponsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCouponsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCouponsQuery, FindAllCouponsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCouponsQuery, FindAllCouponsQueryVariables>(FindAllCouponsDocument, options);
      }
export function useFindAllCouponsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCouponsQuery, FindAllCouponsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCouponsQuery, FindAllCouponsQueryVariables>(FindAllCouponsDocument, options);
        }
export function useFindAllCouponsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllCouponsQuery, FindAllCouponsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllCouponsQuery, FindAllCouponsQueryVariables>(FindAllCouponsDocument, options);
        }
export type FindAllCouponsQueryHookResult = ReturnType<typeof useFindAllCouponsQuery>;
export type FindAllCouponsLazyQueryHookResult = ReturnType<typeof useFindAllCouponsLazyQuery>;
export type FindAllCouponsSuspenseQueryHookResult = ReturnType<typeof useFindAllCouponsSuspenseQuery>;
export type FindAllCouponsQueryResult = Apollo.QueryResult<FindAllCouponsQuery, FindAllCouponsQueryVariables>;
export const FindAllCategoriesDocument = gql`
    query FindAllCategories {
  findAllCategories {
    id
    name
  }
}
    `;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
      }
export function useFindAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export function useFindAllCategoriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export type FindAllCategoriesQueryHookResult = ReturnType<typeof useFindAllCategoriesQuery>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<typeof useFindAllCategoriesLazyQuery>;
export type FindAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useFindAllCategoriesSuspenseQuery>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>;