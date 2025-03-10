import gql from "graphql-tag";

export const GET_POSTS = gql`
  query posts($skip: Float, $take: Float) {
    posts(skip: $skip, take: $take) {
      id
      title
      thumbnail
      content
      createdAt
      slug
    }
    postCount
  }
`;

export const GET_POST_BY_ID = gql`
  query getPostById($id: Int!) {
    getPostById(id: $id) {
      id
      title
      thumbnail
      content
      createdAt
      published
      author {
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(signInInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $take: Int, $skip: Int) {
    getPostComments(postId: $postId, take: $take, skip: $skip) {
      id
      content
      createdAt
      author {
        name
        avatar
      }
    }
    postCommentCount(postId: $postId)
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(createCommentInput: $input) {
      id
    }
  }
`;

export const GET_POST_LIKE = gql`
  query postLikeCount($postId: Int!) {
    postLikeCount(postId: $postId)
    userLikePost(postId: $postId)
  }
`;

export const MUTATION_LIKE_POST = gql`
  mutation likePost($postId: Int!) {
    likePost(postId: $postId)
  }
`;

export const MUTATION_UNLIKE_POST = gql`
  mutation unlikePost($postId: Int!) {
    unlikePost(postId: $postId)
  }
`;

export const GET_USER_POST = gql`
  query getUserPost($skip: Int, $take: Int) {
    getUserPost(skip: $skip, take: $take) {
      id
      title
      slug
      thumbnail
      published
      createdAt
      content
      _count {
        likes
        comments
      }
    }
    userPostCount
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
    }
  }
`;

export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($postId: Int!) {
    deletePost(postId: $postId)
  }
`;
