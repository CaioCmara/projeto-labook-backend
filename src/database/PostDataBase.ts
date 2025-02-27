  import {
    LikesDislikesDB,
    PostDB,
    PostWithCreatorDB,
    POST_LIKE,
  } from "../types";
  import { BaseDatabase } from "./BaseDatabase";

  export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";
    public static TABLE_LIKES_DISLIKES = "likesDislikes";

    public getPosts = async () => {
      const postDB = await BaseDatabase.connection(
        PostDatabase.TABLE_POSTS
      ).select();

      return postDB;
    };
    public getPostsWithCreators = async () => {
      const result: PostWithCreatorDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_POSTS
      )
        .select(
          "posts.id",
          "posts.creator_id",
          "posts.content",
          "posts.likes",
          "posts.dislikes",
          "posts.created_at",
          "posts.updated_at",
          "users.name"
        )
        .join("users", "posts.creator_id", "=", "users.id");

      return result;
    };

    public addPost = async (newPost: PostDB) => {
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(newPost);
    };

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
      const result: PostDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_POSTS
      )
        .select()
        .where({ id });

      return result[0];
    };

    public updatePost = async (id: string, postDB: PostDB): Promise<void> => {
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(postDB)
        .where({ id });
    };

    public delete = async (id: string): Promise<void> => {
      await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id });

        
    };

    public postWithCreatorById = async (
      postId: string
    ): Promise<PostWithCreatorDB | undefined> => {
      const result: PostWithCreatorDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_POSTS
      )
        .select(
          "posts.id",
          "posts.creator_id",
          "posts.content",
          "posts.likes",
          "posts.dislikes",
          "posts.created_at",
          "posts.updated_at",
          "users.name AS creator_name"
        )
        .join("users", "posts.creator_id", "=", "users.id")
        .where("posts.id", postId);

      return result[0];
    };

  
    public likeOrDislike = async (
      likeDislike: LikesDislikesDB
    ): Promise<void> => {
      await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).insert(
        likeDislike
      );
    };
    public alreadyLikedOrDisliked = async (
      likeDislikeDBToFind: LikesDislikesDB
    ): Promise<POST_LIKE | null> => {
      const [likeDislikeDB]: LikesDislikesDB[] = await BaseDatabase.connection(
        PostDatabase.TABLE_LIKES_DISLIKES
      )
        .select()
        .where({
          user_id: likeDislikeDBToFind.user_id,
          post_id: likeDislikeDBToFind.post_id,
        });
      if (likeDislikeDB) {
        return likeDislikeDB.has_like === 1
          ? POST_LIKE.ALREADY_LIKED
          : POST_LIKE.ALREADY_DISLIKED;
      } else {
        return null;
      }
    };

    public removeLikeDislike = async (
      likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
      await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
          user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id,
        });
    };

    public updateLikeDislike = async (likeDislikeDB: LikesDislikesDB) => {
      await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
          user_id: likeDislikeDB.user_id,
          post_id: likeDislikeDB.post_id,
        });
    };
  }
