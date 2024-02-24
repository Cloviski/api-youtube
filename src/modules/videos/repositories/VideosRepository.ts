import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { MysqlError, PoolConnection } from "mysql";

interface CreateVideoRequest {
  title: string;
  description: string;
  user_id: string;
  thumbnail: string;
  publishedAt: Date;
}

interface GetVideoRequest {
  user_id: string;
}

class VideoRepository {
  create(request: Request<any, any, CreateVideoRequest>, response: Response) {
    const { title, description, user_id, thumbnail, publishedAt } =
      request.body;
    pool.getConnection((_err: MysqlError, connection: PoolConnection) => {
      connection.query(
        "INSERT INTO videos (video_id, user_id, title, description, thumbnail, publishedAt) VALUES (?,?,?,?,?,?)",
        [uuidv4(), user_id, title, description, thumbnail, publishedAt],
        (queryError: MysqlError | null, _result: any, _fields: any) => {
          connection.release();
          if (queryError) {
            return response.status(400).json(queryError);
          }
          response.status(200).json({ success: "Video created" });
        }
      );
    });
  }

  getVideos(request: Request<any, any, GetVideoRequest>, response: Response) {
    //Method to get all users' videos
    const { user_id } = request.query;
    pool.getConnection((_err: MysqlError, connection: PoolConnection) => {
      connection.query(
        "SELECT * FROM videos WHERE user_id = ?",
        [user_id],
        (queryError: MysqlError | null, results: any, _fields: any) => {
          connection.release();
          if (queryError) {
            return response
              .status(400)
              .json({ error: "Error searching for videos!" });
          }
          return response
            .status(200)
            .json({ message: "Videos retrieve successfully", videos: results });
        }
      );
    });
  }

  searchVideos(request: Request, response: Response) {
    const { search } = request.query;
    pool.getConnection((_err: MysqlError, connection: PoolConnection) => {
      connection.query(
        "SELECT * FROM videos WHERE title LIKE ? OR description LIKE ?",
        [`%${search}%`, `%${search}%`],
        (queryError: MysqlError | null, results: any, _fields: any) => {
          connection.release();
          if (queryError) {
            return response
              .status(400)
              .json({ error: "Error searching for videos!" });
          }
          return response
            .status(200)
            .json({ message: "Videos retrieve successfully", videos: results });
        }
      );
    });
  }
}

export { VideoRepository };
