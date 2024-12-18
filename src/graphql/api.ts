import {gql, DocumentNode} from "@apollo/client";


export const CREATE_PRODUCT_MUTATION: DocumentNode = gql`
    mutation CreateProduct($productInput: ProductInput!) {
        createProduct(productInput: $productInput) {
            price
            price
            imageUrl
        }
    }
`;

export const ADD_CATEGORY_MUTATION: DocumentNode = gql`
    mutation AddCategory($categoryInput: CategoryInput!) {
        addCategory(categoryInput: $categoryInput) {
            id
            description

        }
    }
`;

export const FIND_PRODUCTS_BY_CATEGORY_QUERY: DocumentNode = gql`
    query FindProductsByCategoryId($categoryId: ID!) {
        findProductsByCategoryId(categoryId: $categoryId) {
            id
            shopId
            name
            description
        }
    }
`;

export const FIND_ALL_PRODUCTS: DocumentNode = gql`
    query FindAllProducts {
        findAllProducts {
            id
            shopId
            name
            description
        }
    }
`;

export const FIND_ALL_COUPONS_QUERY: DocumentNode = gql`
    query FindAllCoupons {
        findAllCoupons {
            id
            name
            expiryDate
            code
        }

    }
`;

export const FIND_ALL_CATEGORIES_QUERY: DocumentNode = gql`
    query FindAllCategories {
        findAllCategories {
            id
            name
        }
    }
`;